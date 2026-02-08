// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
        background: "#f8f9fa",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: "0", fontWeight: "bold" }}>404</h1>

      <h2 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>
        Oops! Page Not Found
      </h2>

      <p
        style={{ fontSize: "1.3rem", maxWidth: "500px", marginBottom: "2rem" }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        style={{
          background: "#0070f3",
          color: "white",
          padding: "1rem 2rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
      >
        ← Go Back to Home
      </Link>
    </div>
  );
}

// Optional: Metadata (SEO + title)
export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist.",
};
