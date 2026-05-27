export default function Brands() {
  const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Vans', 'Converse'];

  return (
    <section className="py-24 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-light uppercase tracking-widest mb-16 text-center text-white">Marcas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
          {brands.map((brand, idx) => (
            <div key={idx} className="text-center text-2xl font-light uppercase tracking-widest text-white/42">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
