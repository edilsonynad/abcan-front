import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import {API_URL} from '@/config/index'
export default function add() {
  const router = useRouter();
  const [uni, setUni] = useState({
    Nome: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/universidades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uni),
    });
    if (!res.ok) {
      toast.error("Problemas com o cadastro do candidato");
      return;
    } else {
      router.push(`/admin/universidade`);
    }
  };

  return (
    <Layout title="Adicionar universidade">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-style mb-30">
              <div className="input-style-1">
                <label>Nome Universidade</label>
                <input
                  type="text"
                  name="Nome"
                  id="Nome"
                  placeholder="Nome completo"
                  onChange={(e) => {
                    setUni({ Nome: e.target.value });
                  }}
                />
              </div>
              <input
                type="submit"
                value="Criar universidade"
                className="main-btn primary-btn rounded-md btn-hover"
              />
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
