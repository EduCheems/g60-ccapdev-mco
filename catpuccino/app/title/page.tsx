export default function TitlePage() {
  return (
    <main className="p-24 bg-slate-900 text-white">

      <div className="z-10 max-w-5xl w-full font-mono text-sm flex">
        <h1 className="text-4xl font-bold tracking-tight text-blue-400">
          This is the Title Page 🏷️
        </h1>
      </div>
      
      <p className="mt-6 text-lg text-slate-300">
        You successfully created a new route! 🚀
      </p>

      <a 
        href="/" 
        className="mt-10 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
      >
        Go back home
      </a>
    </main>
  );
}