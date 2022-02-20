import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { parseCookies } from "@/helpers/index";
import {API_URL} from '@/config/index'

export default function CandidaturaPage({ candidatura }) {
  const [endereco, setEndereco] = useState({});
  const [contato, setContato] = useState({});
  const { id, published_at } = candidatura;

  const { Nome, Passaporte, Data_nascimento, NIF } = candidatura.candidato;
  3;

  useEffect(async () => {
    const dataContato = await fetch(
      `${API_URL}/contatoes/${candidatura.candidato.contato}`
    );
    const contato = await dataContato.json();
    setContato(contato);

    const dataEndereco = await fetch(
      `${API_URL}/enderecos/${candidatura.candidato.endereco}`
    );
    const endereco = await dataEndereco.json();
    setEndereco(endereco);
  }, []);

  const { Ilha, Cidade, Concelho, Zona } = endereco;
  const { Telefone, Email } = contato;

  return (
    <Layout title={`Candidatura #${id}`}>
      <div className="invoice-wrapper card-style mb-30">
        <div className="row">
          <div className="col-12">
            <div className="invoice-card ">
              <div className="invoice-header">
                <div className="invoice-for">
                  <h2 className="mb-10">Nome: {Nome}</h2>
                </div>

                <div className="invoice-date">
                  <p>
                    <span>Data de candidatura: </span>
                    {published_at.slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h6 className="mb-25">Dados Pessoais</h6>
        <div className="row">
          <div className="col-lg-4">
            <p>Data nascimeto: {Data_nascimento}</p>
          </div>
          <div className="col-lg-4">NIf: {NIF}</div>
          <div className="col-lg-4">Passaporte: {Passaporte}</div>
        </div>
        <br />
        <h6 className="mb-25">Endereco</h6>
        <div className="row">
          <div className="col-lg-3">
            <p>Ilha: {Ilha}</p>
          </div>
          <div className="col-lg-3">Concelho: {Concelho}</div>
          <div className="col-lg-3">Cidade: {Cidade}</div>
          <div className="col-lg-3">Zona: {Zona}</div>
        </div>

        <br />
        <h6 className="mb-25">Contatos</h6>
        <div className="row">
          <div className="col-lg-4">
            <p>Telefone: {Telefone}</p>
          </div>
          <div className="col-lg-4">Email: {Email}</div>
        </div>

        <br />
        <h6 className="mb-25">Universidade e cursos</h6>
        <div className="row">
          <div className="col-lg-6">
            <p>Universidade: {candidatura.universidade.Nome}</p>
          </div>
          <div className="col-lg-6">
            Cursos
            <br />{" "}
            {candidatura.cursos.map((curso) => {
              return (
                <p key={curso.id}>
                  {curso.index} {curso.Nome_curso}
                </p>
              );
            })}
          </div>
        </div>

        <br />
        <h6 className="mb-25">Anexos</h6>
        <div className="row">
          {candidatura.anexo ? <div className="col-lg-12">
            <i className="lni lni-download"></i> <a href={`${API_URL}${candidatura.anexo.Passaporte.url}`}>Passaporte</a>
            <br />{" "}
            <i className="lni lni-download"></i> <a href={`${API_URL}${candidatura.anexo.Nif.url}`}>Nif</a>
            <br />{" "}
            <i className="lni lni-download"></i> <a href={`${API_URL}${candidatura.anexo.certificado.url}`}>Certificado</a>
          </div>: <p>Sem anexos para apresentar</p>}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, params: { id } }) {
  const { token } = parseCookies(req);
  const data = await fetch(`${API_URL}/candidaturas/${id}`,{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });




  const candidatura = await data.json();

  return {
    props: {
      candidatura,
    },
  };
}