export default function Instagram() {
  const posts = [
    "/placeholder-product.png",
    "/placeholder-product.png",
    "/placeholder-product.png",
    "/placeholder-product.png",
    "/placeholder-product.png",
    "/placeholder-product.png",
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-light uppercase tracking-widest mb-4 text-center">@keefmultimarcas</h2>
      <p className="text-center text-gray-500 mb-16">Siga-nos no Instagram</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {posts.map((src, idx) => (
          <a key={idx} href="#" className="aspect-square overflow-hidden group bg-[#0B0B0B] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/40 text-xs font-medium tracking-widest uppercase">
                Post
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
