import { useRouter } from "next/router";
import { Fragment } from "react";
import Layout from "@/components/Layout";
import ListItems from "@/components/ListItems";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import ExportCSV from "@/components/ExportCSV";
import Link from "next/link";
export default function Candidaturas({ token, candidaturas }) {
  return (
    <Fragment>
      <Layout title="Suas candidaturas" button="Criar candidatura" url="/roles/candidatura/add">
      {candidaturas.length > 0 ? <ListItems candidaturas={candidaturas} token={token}/> : "Sem candidaturas"}
      </Layout>
    </Fragment>
  );
}

export async function getServerSideProps({req}) {

  const {token} = parseCookies(req)

  const data = await fetch(`${API_URL}/candidaturas/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });

  const candidaturas = await data.json();

  return {
    props: {
      token,
      candidaturas,
    },
  };
}

