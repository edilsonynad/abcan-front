import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function edit({ candidaturaData }) {

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
  useEffect(
    async () => {
      const resContato = await fetch(
        `http://localhost:1337/contatoes/${candidaturaData.candidato.contato}`
      );
      const contato = await resContato.json();

      const resEndereco = await fetch(
        `http://localhost:1337/enderecos/${candidaturaData.candidato.endereco}`
      );
      const endereco = await resEndereco.json();

      setContato(contato);
      setEndereco(endereco);
    },
    { candidaturaData, endereco,contato }
  );

  /**
   * Universidades e Cursos
   */
  const router = useRouter();
  const [universidade, setUniversidade] = useState([
    
  ]);
  const [uniId, setUniId] = useState(candidaturaData.universidade.id);

  const [cursos, setCursos] = useState([]);
  const [cursoId, setCursoId] = useState(candidaturaData.curso[0].id);

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
    Nome: candidaturaData.candidato.Nome,
    Passaporte: candidaturaData.candidato.Passaporte,
    NIF: candidaturaData.candidato.NIF,
    Data_nascimento: candidaturaData.candidato.Data_nascimento,
    contato: "",
    endereco: "",
  });



  /**
   * Anexos
   */

  const [anexo, setAnexo] = useState({
    Passaporte: {},
    Nif: {},
    certificado: {},
  });

  useEffect(async () => {
    const dataUniversidade = await fetch(`http://localhost:1337/universidades`);
    const universidade = await dataUniversidade.json();
    setUniversidade(universidade);
  }, []);

  useEffect(async () => {
    if (uniId) {
      const dataCursos = await fetch(
        `http://localhost:1337/universidades/${uniId}`
      );
      const universidadesCursos = await dataCursos.json();
      setCursos(universidadesCursos.cursos);
    }
  }, [uniId]);

  const submitCandidatoInfo = async () => {
    //Submit Endereco
    const resEndereco = await fetch(`http://localhost:1337/enderecos`, {
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
    const resContato = await fetch(`http://localhost:1337/contatoes`, {
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
    const res = await fetch(`http://localhost:1337/candidatoes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(candidato),
    });

    if (!res.ok) {
      toast.error("Problemas com o cadastro do candidato");
      s;
      return;
    }
    const cand = await res.json();
    setCandidatoId(cand.id);
  }, [candidato, candidaturaData]);

  /**Setting Candidatura State */
  useEffect(async () => {
    if (candidatoId != undefined) {
      setCandidatura({
        candidato: { id: candidatoId },
        universidade: { id: uniId },
        //anexo: {id: anexoId},
        Estado: "Recebido",
        cursos: [{ id: cursoId }],
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
      const res = await fetch(`http://localhost:1337/candidaturas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidatura),
      });

      if (!res.ok) {
        toast.error("Problemas com o cadastro da candidatura");
        return;
      }
      const data = await res.json();
      router.push(`/candidatura/${data.id}`);
    }
  }, [candidatura]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitCandidatoInfo();
  };
  /**Colecting data */
  const handlePersonalData = (e) => {
    console.log(e.target)
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
                    value={candidato.Nome}
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
                    value={contato.Telefone}
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
                    value={endereco.Ilha}
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
                    value={endereco.Cidade}
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
                    value={endereco.Concelho}
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
                <h6 className="mb-25">Selecione a universidade e o curso</h6>
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
                      <option value="" disabled>
                        Selecione uma universidade
                      </option>
                      {universidade.map(({ id, Nome }) => {
                        return ( 
                          <option key={id} value={id} > 
                            {Nome}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="select-style-2">
                  <label>Curso</label>
                  <div className="select-position">
                    <select
                      name="cursos"
                      id="cursos"
                      value={cursoId}
                      onChange={(e) => {
                        setCursoId(e.target.value);
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

          <div className="row">
            <div className="col-lg-12">
              <div className="card-style mb-30">
                <h6 className="mb-25">Documentos necessarios</h6>

                <div className="input-style-1">
                  <label>Passporte</label>
                  <input
                    type="file"
                    name="Passaporte"
                    id="Passaporte"
                    onChange={handleAnexoData}
                  />
                </div>

                <div className="input-style-1">
                  <label>NIF</label>
                  <input
                    type="file"
                    name="Nif"
                    id="Nif"
                    onChange={handleAnexoData}
                  />
                </div>

                <div className="input-style-1">
                  <label>Certificado Apostilado</label>
                  <input
                    type="file"
                    name="certificado"
                    id="certificado"
                    onChange={handleAnexoData}
                  />
                </div>

                <input
                  type="submit"
                  value="Candidatar"
                  className="main-btn primary-btn rounded-md btn-hover"
                />
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const data = await fetch(`http://localhost:1337/candidaturas/${id}`);

  const candidaturaData = await data.json();

  return {
    props: {
      candidaturaData,
    },
  };
}
