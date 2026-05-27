export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-4">Ajuda</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#">Contato</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Entregas</a></li>
              <li><a href="#">Devoluções</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-4">Sobre</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#">Nossa História</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Sustentabilidade</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Termos de Uso</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-4">Redes Sociais</h3>
            <div className="flex gap-4 text-2xl">
              <a href="#">📷</a>
              <a href="#">📘</a>
              <a href="#">🐦</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 KEEF MULTIMARCAS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
