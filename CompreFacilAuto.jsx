
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const supabase = createClient(
  "https://tnxlldakvbfffyjilfcu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRueGxsZGFrdmJmZmZ5amlsZmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjcwNTksImV4cCI6MjA2Mjc0MzA1OX0.oXv2S4RR-nPbCcn9-paxZOI5vOTrMqgNoTKtNXEoqwg"
);

export default function CompreFacilAuto() {
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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">CompreFácil Auto</h1>
      <div className="grid gap-4 mb-6">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Carro">Carro</option>
          <option value="Moto">Moto</option>
        </select>
        <Input
          name="title"
          placeholder="Marca e Modelo (ex: Honda Civic 2020)"
          value={form.title}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Descrição do veículo"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          name="price"
          placeholder="Preço (ex: R$ 45.000)"
          value={form.price}
          onChange={handleChange}
        />
        <Input
          name="contact"
          placeholder="Contato (WhatsApp ou e-mail)"
          value={form.contact}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Publicar Anúncio</Button>
      </div>

      <div className="grid gap-4">
        {listings.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{item.type} | {item.price}</p>
              <p className="mb-2">{item.description}</p>
              <p className="text-sm text-blue-600">Contato: {item.contact}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
