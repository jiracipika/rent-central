export default function PlaceholderPage({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center max-w-md mx-auto">
        <span className="text-5xl">{icon}</span>
        <h1 className="mt-4 text-xl font-semibold text-gray-900 tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-gray-400">This feature is coming soon. Stay tuned!</p>
      </div>
    </div>
  );
}
