import { useRouter } from "next/router";
import { Fragment } from "react";
import Layout from "@/components/Layout";
import ListItems from "@/components/ListItems";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
export default function Candidaturas({ token, candidaturas }) {
  return (
    <Fragment>
      <Layout title="Candidaturas realizadas">
        <ListItems candidaturas={candidaturas} token={token}/>
      </Layout>
    </Fragment>
  );
}

export async function getServerSideProps({req}) {

  const {token} = parseCookies(req)



  const data = await fetch(`${API_URL}/candidaturas`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const candidaturas = await data.json();

  return {
    props: {
      token,
      candidaturas,
    },
  };
}

