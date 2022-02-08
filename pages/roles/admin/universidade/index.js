import Layout from "@/components/Layout";
import UniLists from "@/components/uni/UniLists";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function index({ universidades }) {
  return (
    <div>
      <Layout title="Universidades" button="Criar univerisdade" url="universidade/add">
       
        {universidades ?  <UniLists universidades={universidades} /> : ""}
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  if (!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const data = await fetch(`${API_URL}/universidades`);

  const universidades = await data.json();

  return {
    props: {
      token,
      universidades,
    },
  };
}
