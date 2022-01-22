import { useRouter } from "next/router";
import { Fragment } from "react";
import Layout from "@/components/Layout";
import ListItems from "@/components/ListItems";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import ExportCSV from "@/components/ExportCSV";
export default function Candidaturas({ token, candidaturas }) {
  return (
    <Fragment>
      <Layout title="Suas candidaturas">
        <ExportCSV candidaturas={candidaturas}/>
        <ListItems candidaturas={candidaturas} token={token}/>
      </Layout>
    </Fragment>
  );
}

export async function getServerSideProps({req}) {

  const {token} = parseCookies(req)

  if (!token) {
    return {
        redirect: {
            destination: '/account/login', 
            permanent: false
        }
    }
  }

  const data = await fetch(`${API_URL}/candidaturas`, {
    method: 'GET',
  });

  const candidaturas = await data.json();

  return {
    props: {
      token,
      candidaturas,
    },
  };
}

