export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center text-center p-8 bg-gray-50 text-gray-800">
      <h1 className="text-6xl font-bold m-0">404</h1>
      <h2 className="text-2xl mt-4 mb-2">Oops! Page Not Found</h2>
      <p className="text-lg mb-6 max-w-lg">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
    </div>
  );
}
