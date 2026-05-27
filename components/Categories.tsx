export default function Categories() {
  const categories = [
    { name: 'Masculino' },
    { name: 'Feminino' },
    { name: 'Tênis' },
    { name: 'Acessórios' },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-light uppercase tracking-widest mb-16 text-center text-white">Categorias</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <a key={idx} href="#" className="group relative aspect-[3/4] overflow-hidden bg-[#0B0B0B] border border-white/12 flex items-center justify-center">
            <span className="text-white text-lg uppercase tracking-widest bg-black/50 px-6 py-2">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
