import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({
    type: "Carro",
    title: "",
    description: "",
    price: "",
    contact: "",
  });

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

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit() {
    if (!form.title || !form.price || !form.contact) return;
    const { error } = await supabase.from("listings").insert([form]);
    if (!error) {
      fetchListings();
      setForm({ type: "Carro", title: "", description: "", price: "", contact: "" });
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>CompreFácil Auto</h1>
      <div style={{ display: 'grid', gap: 10, marginBottom: 30 }}>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Carro">Carro</option>
          <option value="Moto">Moto</option>
        </select>
        <input
          name="title"
          placeholder="Marca e Modelo"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Preço"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="contact"
          placeholder="Contato"
          value={form.contact}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Publicar Anúncio</button>
      </div>
      <div style={{ display: 'grid', gap: 20 }}>
        {listings.map((item, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 5 }}>
            <h2>{item.title}</h2>
            <p><strong>{item.type}</strong> | {item.price}</p>
            <p>{item.description}</p>
            <p>Contato: {item.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
