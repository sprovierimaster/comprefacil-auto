import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "../components/Header";
import Footer from "../components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NovoAnuncio() {
  const [form, setForm] = useState({
    type: "Carro",
    title: "",
    description: "",
    price: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit() {
    if (!form.title || !form.price || !form.contact) {
      alert("Por favor, preencha os campos obrigatórios: título, preço e contato.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("listings").insert([form]);

    if (error) {
      console.error("Erro ao inserir:", error);
      alert("Erro ao publicar anúncio. Verifique os dados ou tente novamente.");
    } else {
      alert("Anúncio publicado com sucesso!");
      setForm({ type: "Carro", title: "", description: "", price: "", contact: "" });
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-6 max-w-2xl mx-auto flex-1">
        <h2 className="text-2xl font-bold mb-4">Publicar Novo Anúncio</h2>
        <div className="grid gap-4">
          <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
            <option value="Carro">Carro</option>
            <option value="Moto">Moto</option>
          </select>
          <input name="title" placeholder="Marca e Modelo *" value={form.title} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="description" placeholder="Descrição" value={form.description} onChange={handleChange} className="border p-2 rounded" />
          <input name="price" placeholder="Preço *" value={form.price} onChange={handleChange} className="border p-2 rounded" />
          <input name="contact" placeholder="Contato *" value={form.contact} onChange={handleChange} className="border p-2 rounded" />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Publicando..." : "Publicar Anúncio"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
