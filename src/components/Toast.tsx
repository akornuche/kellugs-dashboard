"use client";

export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-[var(--ink)] text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300 z-50">
      {message}
    </div>
  );
}
