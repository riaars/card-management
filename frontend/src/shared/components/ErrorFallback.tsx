interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <p className="text-lg text-red-400">{error.message}</p>
      <button
        className="btn bg-black text-white rounded mt-4 px-4 py-2 font-semibold"
        onClick={resetErrorBoundary}
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallback;
