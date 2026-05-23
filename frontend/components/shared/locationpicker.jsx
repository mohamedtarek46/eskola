"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2, Navigation } from "lucide-react";

/**
 * LocationPicker — free map picker using Leaflet + OpenStreetMap
 *
 * Props:
 *   value       { lat, lng, city, address, country } | null
 *   onChange    (locationData) => void
 */
export default function LocationPicker({ value, onChange }) {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const placeMarker = (L, map, lat, lng) => {
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng]).addTo(map);
    }
    map.panTo([lat, lng]);
  };

  const reverseGeocode = async (lat, lng) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        { headers: { "Accept-Language": "en" } },
      );
      const data = await res.json();
      const a = data.address ?? {};

      const city = a.city || a.town || a.village || a.county || a.state || "";
      const address =
        [a.road, a.house_number].filter(Boolean).join(" ") ||
        data.display_name?.split(",")[0] ||
        "";
      const country = a.country || "";

      markerRef.current
        ?.bindPopup(`${address || city}, ${country}`)
        .openPopup();
      onChange?.({ lat, lng, city, address, country });
    } catch {
      onChange?.({ lat, lng, city: "", address: "", country: "" });
    } finally {
      setLoading(false);
    }
  };
  // ── Bootstrap Leaflet once ─────────────────────────────────────
  useEffect(() => {
    // cancelled flag guards against React Strict Mode double-invoke:
    // cleanup sets this to true, so the async import won't touch the DOM
    let cancelled = false;

    // Inject Leaflet CSS once
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    import("leaflet").then((L) => {
      if (cancelled) return; // effect was cleaned up before promise resolved

      // Fix default icon paths broken by webpack
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const initialLat = value?.lat ?? 30.0444; // Cairo default
      const initialLng = value?.lng ?? 31.2357;

      const map = L.map(mapRef.current, { zoomControl: true }).setView(
        [initialLat, initialLng],
        value?.lat ? 14 : 5,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      if (value?.lat && value?.lng) {
        markerRef.current = L.marker([value.lat, value.lng])
          .addTo(map)
          .bindPopup(value.address || "Selected location")
          .openPopup();
      }

      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        placeMarker(L, map, lat, lng);
        await reverseGeocode(lat, lng);
      });

      leafletMap.current = map;
    });

    return () => {
      cancelled = true; // stop promise from touching unmounted DOM
      leafletMap.current?.remove();
      leafletMap.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Helpers ────────────────────────────────────────────────────

  // ── "Use my location" ──────────────────────────────────────────
  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        const L = (await import("leaflet")).default;
        placeMarker(L, leafletMap.current, lat, lng);
        leafletMap.current?.setView([lat, lng], 15);
        await reverseGeocode(lat, lng);
        setLocating(false);
      },
      () => setLocating(false),
    );
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-small font-medium text-text-primary flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-text-muted" />
          Pick on Map
        </span>

        <button
          type="button"
          onClick={handleLocate}
          disabled={locating}
          className="flex items-center gap-1.5 text-small text-primary font-medium px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {locating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Navigation className="w-3.5 h-3.5" />
          )}
          Use my location
        </button>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-border shadow-sm">
        <div ref={mapRef} className="w-full h-64" />

        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-[1000]">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow text-small text-text-primary">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              Detecting location…
            </div>
          </div>
        )}
      </div>

      {value?.city && (
        <p className="text-small text-text-muted flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          {[value.address, value.city, value.country]
            .filter(Boolean)
            .join(", ")}
        </p>
      )}

      <p className="text-[11px] text-text-muted">
        Click anywhere on the map to set the event location.
      </p>
    </div>
  );
}
