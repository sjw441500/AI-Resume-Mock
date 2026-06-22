"use client";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export function LoadingOverlay({ message = "Processing..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}
