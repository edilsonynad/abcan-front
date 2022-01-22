import { CSVLink } from "react-csv";
import { useState, useEffect } from "react";
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

  /*const data1 = [
        { firstName: "Warren", lastName: "Morrow", email: "sokyt@mailinator.com", age: "36" },
        { firstName: "Gwendolyn", lastName: "Galloway", email: "weciz@mailinator.com", age: "76" },
        { firstName: "Astra", lastName: "Wyatt", email: "quvyn@mailinator.com", age: "57" },
        { firstName: "Jasmine", lastName: "Wong", email: "toxazoc@mailinator.com", age: "42" },
        { firstName: "Brooke", lastName: "Mcconnell", email: "vyry@mailinator.com", age: "56" },
        { firstName: "Christen", lastName: "Haney", email: "pagevolal@mailinator.com", age: "23" },
        { firstName: "Tate", lastName: "Vega", email: "dycubo@mailinator.com", age: "87" },
        { firstName: "Amber", lastName: "Brady", email: "vyconixy@mailinator.com", age: "78" },
        { firstName: "Philip", lastName: "Whitfield", email: "velyfi@mailinator.com", age: "22" },
        { firstName: "Kitra", lastName: "Hammond", email: "fiwiloqu@mailinator.com", age: "35" },
        { firstName: "Charity", lastName: "Mathews", email: "fubigonero@mailinator.com", age: "63" }
      ];*/

  const csvReport = {
    data: data,
    headers: headers,
    filename: "Clue_Mediator_Report.csv",
  };
  return (
    <div classname="App">
      <CSVLink {...csvReport}>Exportar CSV</CSVLink>
    </div>
  );
}
