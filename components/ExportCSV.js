import { CSVLink } from "react-csv";
export default function ExportCSV({ candidaturas }) {
  const data = [];

  candidaturas.map((cand) => {
    data.push({
      estado: cand.Estado,
      data_candidatura: cand.published_at.slice(0, 10),
      utilizador: cand.user.username,
      utilizador_email: cand.user.email,
      utilizador_papel: cand.user.papel,
      nome_candidato: cand.candidato.Nome,
      passaporte: cand.candidato.Passaporte,
      nif: cand.candidato.NIF,
      data_nascimento: cand.candidato.Data_nascimento,
      universidade: cand.universidade.Nome,
      escolha1: cand.cursos[0].Nome_curso,
      escolha2: cand.cursos[1].Nome_curso,
      escolha3: cand.cursos[2].Nome_curso,
    });
  });

  const headers = [
    { label: "Estado", key: "estado" },
    { label: "Data Candidatura", key: "data_candidatura" },
    { label: "Utilizador", key: "utilizador" },
    { label: "Email do utilizador", key: "utilizador_email" },
    { label: "Papel do utilizador", key: "utilizador_papel" },
    { label: "Candidato", key: "nome_candidato" },
    { label: "Passaporte", key: "passaporte" },
    { label: "NIF", key: "nif" },
    { label: "Data Nascimento", key: "data_nascimento" },
    { label: "Universidade", key: "universidade" },
    { label: "Opção 1", key: "escolha1" },
    { label: "Opção 2", key: "escolha2" },
    { label: "Opção 3", key: "escolha3" },
  ];

  const csvReport = {
    data: data,
    headers: headers,
    filename: "Relatorio.csv",
  };
  return (
    <div className="App">
      <CSVLink {...csvReport}>Exportar CSV</CSVLink>    
    </div>
  );
}
