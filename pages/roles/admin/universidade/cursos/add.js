import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
export default function add() {
  const router = useRouter();
  const [curso, setCurso] = useState({
    Nome_curso: "",
    Grau: "",
    universidade: {
      id: "",
    },
  });

  const [uni, setUni] = useState([]);

  useEffect(async () => {
    const res = await fetch(`http://localhost:1337/universidades`);
    const uniSet = await res.json();
    setUni(uniSet);
  }, [uni]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:1337/cursos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curso),
    });
    if (!res.ok) {
      toast.error("Problemas com o cadastro do candidato");
      return;
    } else {
      router.push(`/universidade/cursos`);
    }
  };

  return (
    <Layout title="Adicione um curso">
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
                    setCurso({ ...curso, Nome_curso: e.target.value });
                  }}
                />
              </div>
              <div className="select-style-2">
                <label>Grau</label>
                <div className="select-position">
                  <select
                    name="grau"
                    id="grau"
                    onChange={(e) => {
                      setCurso({ ...curso, Grau: e.target.value });
                    }}
                  >
                    <option value="" disabled selected>
                      Selecione um grau
                    </option>

                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Mestrado">Mestrado</option>
                  </select>
                </div>
              </div>
              <div className="select-style-2">
                <label>Univeridade</label>
                <div className="select-position">
                  <select
                    name="universidade"
                    id="universidade"
                    onChange={(e) => {
                      setCurso({
                        ...curso,
                        universidade: { id: e.target.value },
                      });
                    }}
                  >
                    {uni.map(({ id, Nome }) => {
                      return (
                        <option key={id} value={id}>
                          {Nome}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <input
                type="submit"
                value="Criar curso"
                className="main-btn primary-btn rounded-md btn-hover"
              />
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
