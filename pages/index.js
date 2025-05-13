import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "../components/Header";
import Footer from "../components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [listings, setListings] = useState([]);

  async function fetchListings() {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setListings(data);
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-6 max-w-4xl mx-auto flex-1">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Encontre o veículo ideal</h2>
          <p className="text-gray-600">Carros e motos anunciados por pessoas reais.</p>
          <a href="/novo-anuncio">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Anunciar Agora
            </button>
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {listings.map((item, idx) => (
            <div key={idx} className="border rounded p-4 shadow-sm">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.type} • {item.price}</p>
              <p className="text-sm mt-2">{item.description}</p>
              <p className="text-sm text-blue-600 mt-1">Contato: {item.contact}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
