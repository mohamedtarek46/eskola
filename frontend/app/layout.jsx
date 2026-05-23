import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientWrapper from "@/components/root/clientWrapper.jsx";
import ScrollToTop from "@/components/shared/scrollToTop.jsx";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        <Toaster />
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
