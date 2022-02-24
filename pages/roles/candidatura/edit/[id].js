import FileUpload from "@/components/FileUpload";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";

export default function edit({ candidaturaData, token }) {
  const router = useRouter();
  /**
   * Inserindo dados da API em estados
   */

  const [candidato, setCandidato] = useState({
    id: candidaturaData.candidato.id,
    Nome: candidaturaData.candidato.Nome,
    Passaporte: candidaturaData.candidato.Passaporte,
    NIF: candidaturaData.candidato.NIF,
    Data_nascimento: candidaturaData.candidato.Data_nascimento,
    contato: candidaturaData.candidato.contato,
    endereco: candidaturaData.candidato.endereco,
  });

  const [endereco, setEndereco] = useState({
    id: "",
    Ilha: "",
    Cidade: "",
    Concelho: "",
    Zona: "",
  });

  const [contato, setContato] = useState({
    id: "",
    Telefone: "",
    Email: "",
  });

  const [universidade, setUniversidade] = useState([]);
  const [uniId, setUniId] = useState(candidaturaData.universidade.id);

  const [cursos, setCursos] = useState([]);
  const [cursoId, setCursoId] = useState({
    escolha1: candidaturaData.cursos[0].id,
    escolha2: candidaturaData.cursos[1].id,
    escolha3: candidaturaData.cursos[2].id,
  });

  const [enderecoId, setEnderecoId] = useState(endereco.id);
  const [contatoId, setContatoId] = useState(contato.id);
  const [candidatoId, setCandidatoId] = useState(candidato.id);
  const [anexoId, setAnexoId] = useState(null);
  const [updateCandidatura, setUpdateCandidatura] = useState(false);
  const [finalizar, setFinalizar] = useState(false);

  const [candidatura, setCandidatura] = useState({
    universidade: { id: uniId },
    Estado: "Recebido",
    cursos: [
      { id: cursoId.escolha1 },
      { id: cursoId.escolha2 },
      { id: cursoId.escolha3 },
    ],
  });

  useEffect(
    async () => {
      const contatoEmpty = Object.values(contato).some(
        (element) => element === ""
      );
      const enderecoEmpty = Object.values(endereco).some(
        (element) => element === ""
      );
      if(contatoEmpty && enderecoEmpty){
        const resContato = await fetch(
          `${API_URL}/contatoes/${candidato.contato}`
        );
        const contatoAPI = await resContato.json();
  
        const resEndereco = await fetch(
          `${API_URL}/enderecos/${candidato.endereco}`
        );
  
        const enderecoAPI = await resEndereco.json();
  
        setContato({
          id: contatoAPI.id,
          Telefone: contatoAPI.Telefone,
          Email: contatoAPI.Email,
        });
  
        setEndereco({
          id: enderecoAPI.id,
          Ilha: enderecoAPI.Ilha,
          Cidade: enderecoAPI.Cidade,
          Concelho: enderecoAPI.Concelho,
          Zona: enderecoAPI.Zona,
        });
      }else{
        return
      }
    },
   [endereco, contato ] 
  );

  useEffect(async () => {
    const dataUniversidade = await fetch(`${API_URL}/universidades`);
    const universidade = await dataUniversidade.json();
    setUniversidade(universidade);
  }, []);

  useEffect(async () => {
    if (uniId) {
      const dataCursos = await fetch(`${API_URL}/universidades/${uniId}`);
      const universidadesCursos = await dataCursos.json();
      setCursos(universidadesCursos.cursos);
    }
  }, [uniId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Update Endereco
    const resEndereco = await fetch(
      `${API_URL}/enderecos/${endereco.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(endereco),
      }
    );

    if (!resEndereco.ok) {
      toast.error("Problemas com o cadastro do endereco");
      return;
    }

    /**Update Caontato */
    const resContato = await fetch(
      `${API_URL}/contatoes/${contato.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contato),
      }
    );

    if (!resContato.ok) {
      toast.error("Problemas com o cadastro do contato");
      return;
    }

    /**Update candidatos */
     const res = await fetch(
      `${API_URL}/candidatoes/${candidato.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidato),
      }
    );

    if (!res.ok) {
      toast.error("Problemas com o cadastro do candidato");
      s;
      return;
    }

    setUpdateCandidatura(true);
  };

  useEffect(async () => {
    if (updateCandidatura) {
      setCandidatura({
        universidade: { id: uniId },
        Estado: "Recebido",
        cursos: [
          { id: cursoId.escolha1 },
          { id: cursoId.escolha2 },
          { id: cursoId.escolha3 },
        ],
      });
      setUpdateCandidatura(false);
      setFinalizar(true);
    }
  }, [updateCandidatura, candidatura, finalizar]);

  useEffect(async () => {
    if (finalizar) {
      const res = await fetch(`${API_URL}/candidaturas/${candidaturaData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(candidatura),
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("Nao tens permissao para editar esta candidatura");
          return;
        }
        toast.error("Problemas com o cadastro da candidatura");
        return;
      }
      router.push(`/roles/candidatura/${candidaturaData.id}`);
      setFinalizar(false)
    }
  }, [candidatura, finalizar, candidaturaData]);

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

  const handleAnexoData = (e) => {
    const { name, value } = e.target;
    setAnexo({ ...anexo, [name]: value });
  };

  const handleAnexoId = (id) => {
    setAnexoId(id);
  };



  return (
    <div>
      <Layout title="Edite a sua candidatura">
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
                    value={candidato.Nome}
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
                    value={candidato.Data_nascimento}
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
                    value={candidato.Passaporte}
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
                    value={candidato.NIF}
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
                    value={contato.Email}
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
                    value={contato.Telefone}
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
                    value={endereco.Ilha}
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
                    value={endereco.Cidade}
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
                    value={endereco.Concelho}
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
                    value={endereco.Zona}
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
                      value={uniId}
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
                      value={cursoId.escolha1}
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
                      value={cursoId.escolha2}
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
                      value={cursoId.escolha3}
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
          {<FileUpload handleAnexoId={handleAnexoId}>
          
            </FileUpload>}
            <input
              type="submit"
              value="Editar candidatar"
              className="main-btn primary-btn rounded-md btn-hover"
            />
        </form>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req, params: { id } }) {
  const { token } = parseCookies(req);

  const data = await fetch(`http://localhost:1337/candidaturas/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const candidaturaData = await data.json();

  return {
    props: {
      candidaturaData,
      token,
    },
  };
}
