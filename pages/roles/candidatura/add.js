import FileUpload from "@/components/FileUpload";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import {API_URL} from '@/config/index'

export default function add({ token }) {
  /**
   * Universidades e Cursos
   */
  const router = useRouter();
  const [universidade, setUniversidade] = useState([]);
  const [uniId, setUniId] = useState();

  const [cursos, setCursos] = useState([]);
  const [cursoId, setCursoId] = useState({
    escolha1: null,
    escolha2: null,
    escolha3: null,
  });

  const [enderecoId, setEnderecoId] = useState();
  const [contatoId, setContatoId] = useState();
  const [candidatoId, setCandidatoId] = useState();

  /**Candidatura
   */

  const [candidatura, setCandidatura] = useState({
    candidato: {},
    universidade: {},
    anexo: {},
    Estado: "",
    cursos: [],
  });

  /**
   * Dados pessoais
   */
  const [candidato, setCandidato] = useState({
    Nome: "",
    Passaporte: "",
    NIF: "",
    Data_nascimento: "",
    contato: "",
    endereco: "",
  });

  const [endereco, setEndereco] = useState({
    Ilha: "",
    Cidade: "",
    Concelho: "",
    Zona: "",
  });

  const [contato, setContato] = useState({
    Telefone: "",
    Email: "",
  });

  /**
   * Anexos
   */

  const [anexoId, setAnexoId] = useState(null);

  useEffect(async () => {
    const dataUniversidade = await fetch(`${API_URL}/universidades`);
    const universidade = await dataUniversidade.json();
    setUniversidade(universidade);
  }, []);

  useEffect(async () => {
    if (uniId) {
      const dataCursos = await fetch(
        `${API_URL}/universidades/${uniId}`
      );
      const universidadesCursos = await dataCursos.json();
      setCursos(universidadesCursos.cursos);
    }
  }, [uniId]);

  const submitCandidatoInfo = async () => {
    //Submit Endereco
    const resEndereco = await fetch(`${API_URL}/enderecos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endereco),
    });

    if (!resEndereco.ok) {
      toast.error("Problemas com o cadastro do endereco");
      return;
    }
    const ende = await resEndereco.json();
    setEnderecoId(ende.id);
    //Submit Contato
    const resContato = await fetch(`${API_URL}/contatoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contato),
    });

    if (!resContato.ok) {
      toast.error("Problemas com o cadastro do contato");
      return;
    }
    const cont = await resContato.json();

    setContatoId(cont.id);
  };

  useEffect(async () => {
    if (contatoId != undefined && enderecoId != undefined) {
      setCandidato({ ...candidato, endereco: enderecoId, contato: contatoId });
    }
  }, [contatoId, enderecoId]);

  useEffect(async () => {
    const hasEmpityFields = Object.values(candidato).some(
      (element) => element === ""
    );

    if (hasEmpityFields) {
      return;
    }
    const res = await fetch(`${API_URL}/candidatoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(candidato),
    });

    if (!res.ok) {
      toast.error("Problemas com o cadastro do candidato");
      return;
    }
    const cand = await res.json();
    setCandidatoId(cand.id);
  }, [candidato]);

  /**Setting Candidatura State */
  useEffect(async () => {
    if (candidatoId != undefined) {
      setCandidatura({
        candidato: { id: candidatoId },
        universidade: { id: uniId },
        anexo: { id: anexoId },
        Estado: "Recebido",
        cursos: [
          { id: cursoId.escolha1 },
          { id: cursoId.escolha2 },
          { id: cursoId.escolha3 },
        ],
      });
    }
  }, [candidatoId, uniId, cursoId]);

  useEffect(async () => {
    const hasEmpityFields = Object.values(candidatura).some(
      (element) => element === ""
    );
    if (hasEmpityFields) {
      return;
    } else {
      const res = await fetch(`${API_URL}/candidaturas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(candidatura),
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("Nao tens permissao");
          return;
        }
        toast.error("Problemas com o cadastro da candidatura");
        return;
      }
      const data = await res.json();
      router.push(`/roles/candidatura/${data.id}`);
    }
  }, [candidatura]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitCandidatoInfo();
  };
  /**Colecting data */
  const handlePersonalData = (e) => {
    const { name, value } = e.target;
    setCandidato({ ...candidato, [name]: value });
  };

  const handleContatoData = (e) => {
    const { name, value } = e.target;
    setContato({ ...contato, [name]: value });
  };

  const handleEnderecoData = (e) => {
    const { name, value } = e.target;
    setEndereco({ ...endereco, [name]: value });
  };

  /*const handleAnexoData = (e) => {
    const { name, value } = e.target;
    setAnexo({ ...anexo, [name]: value });
  };*/

  const handleAnexoId = (id) => {
    setAnexoId(id);
  };

  return (
    <div>
      <Layout title="Realize a sua candidatura">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-style mb-30">
                <h6 className="mb-25">Dados Pessoais</h6>

                <div className="input-style-1">
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    name="Nome"
                    id="Nome"
                    placeholder="Nome completo"
                    onChange={handlePersonalData}
                  />
                </div>

                <div className="input-style-1">
                  <label>Data nascimento</label>
                  <input
                    type="date"
                    name="Data_nascimento"
                    id="Data_nascimento"
                    onChange={handlePersonalData}
                  />
                </div>

                <div className="input-style-1">
                  <label>Numero Passaporte</label>
                  <input
                    type="text"
                    name="Passaporte"
                    id="Passaporte"
                    placeholder="Passaporte"
                    onChange={handlePersonalData}
                  />
                </div>

                <div className="input-style-1">
                  <label>Numero NIF</label>
                  <input
                    type="text"
                    name="NIF"
                    id="NIF"
                    placeholder="NIF"
                    onChange={handlePersonalData}
                  />
                </div>

                <h6 className="mb-25">Contato</h6>

                <div className="input-style-1">
                  <label>Email</label>
                  <input
                    type="email"
                    name="Email"
                    id="email"
                    placeholder="Email"
                    onChange={handleContatoData}
                  />
                </div>

                <div className="input-style-1">
                  <label>Numero telefone</label>
                  <input
                    type="text"
                    name="Telefone"
                    id="telefone"
                    placeholder="Numero telefone"
                    onChange={handleContatoData}
                  />
                </div>

                <h6 className="mb-25">Endereço</h6>

                <div className="input-style-1">
                  <label>Ilha</label>
                  <input
                    type="text"
                    name="Ilha"
                    id="Ilha"
                    placeholder="Ilha"
                    onChange={handleEnderecoData}
                  />
                </div>

                <div className="input-style-1">
                  <label>Cidade</label>
                  <input
                    type="text"
                    name="Cidade"
                    id="Cidade"
                    placeholder="Cidade"
                    onChange={handleEnderecoData}
                  />
                </div>

                <div className="input-style-1">
                  <label>Concelho</label>
                  <input
                    type="text"
                    name="Concelho"
                    id="Concelho"
                    placeholder="Concelho"
                    onChange={handleEnderecoData}
                  />
                </div>

                <div className="input-style-1">
                  <label>Zona</label>
                  <input
                    type="text"
                    name="Zona"
                    id="Zona"
                    placeholder="Zona"
                    onChange={handleEnderecoData}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card-style mb-30">
                <h6 className="mb-25">Selecione a universidade</h6>
                <div className="select-style-2">
                  <label>Univeridade</label>
                  <div className="select-position">
                    <select
                      name="universidade"
                      id="universidade"
                      onChange={(e) => {
                        setUniId(e.target.value);
                      }}
                    >
                      <option value="" disabled selected>
                        Selecione uma universidade
                      </option>
                      {universidade.map(({ id, Nome }) => {
                        return (
                          <option key={id} value={id}>
                            {Nome}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <h6 className="mb-25">Selecione os cursos</h6>
                <div className="select-style-2">
                  <label>Primeira opcao</label>
                  <div className="select-position">
                    <select
                      name="cursos"
                      id="cursos"
                      onChange={(e) => {
                        setCursoId({ ...cursoId, escolha1: e.target.value });
                      }}
                    >
                      <option value="" disabled selected>
                        Selecione um curso
                      </option>
                      {cursos.map((curso) => {
                        return (
                          <option key={curso.id} value={curso.id}>
                            {curso.Nome_curso}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="select-style-2">
                  <label>Segunda opcao</label>
                  <div className="select-position">
                    <select
                      name="cursos"
                      id="cursos"
                      onChange={(e) => {
                        setCursoId({ ...cursoId, escolha2: e.target.value });
                      }}
                    >
                      <option value="" disabled selected>
                        Selecione um curso
                      </option>
                      {cursos.map((curso) => {
                        return (
                          <option key={curso.id} value={curso.id}>
                            {curso.Nome_curso}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="select-style-2">
                  <label>Terceira opcao</label>
                  <div className="select-position">
                    <select
                      name="cursos"
                      id="cursos"
                      onChange={(e) => {
                        setCursoId({ ...cursoId, escolha3: e.target.value });
                      }}
                    >
                      <option value="" disabled selected>
                        Selecione um curso
                      </option>
                      {cursos.map((curso) => {
                        return (
                          <option key={curso.id} value={curso.id}>
                            {curso.Nome_curso}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FileUpload handleAnexoId={handleAnexoId}>
            <input
              type="submit"
              value="Candidatar"
              className="main-btn primary-btn rounded-md btn-hover"
            />
          </FileUpload>
        </form>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

 
  return {
    props: {
      token,
    },
  };
}
