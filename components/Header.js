export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">CompreFácil Auto</h1>
      <nav className="space-x-4">
        <a href="/" className="hover:underline">Início</a>
        <a href="/novo-anuncio" className="hover:underline">Anunciar</a>
      </nav>
    </header>
  );
}
