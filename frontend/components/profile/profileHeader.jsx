export default function ProfileHeader({ user }) {
  if (!user) return null;
  return (
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 rounded-full bg-border" />

      <div>
        <h1 className="text-h3 text-text-primary">
          {user.firstName} {user.lastName}
        </h1>

        <p className="text-text-secondary">{user.email}</p>

        <p className="text-small text-text-muted">
          Member since {new Date(user.createdAt).toDateString()}
        </p>
        <p className="text-small text-text-muted">
          Role: {user.role}
        </p>
      </div>
    </div>
  );
}
