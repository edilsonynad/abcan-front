import { parseCookies } from "@/helpers/index";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
export default function redirect() {
  const [papel, setPapel] = useState("");
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setPapel(user.papel);
    }
  }, [user]);

  if (papel === "Antena") {
    router.push("/roles/antena");
  } else if (papel === "Admin") {
    router.push("/roles/admin");
  } else if (papel === "Candidato") {
    router.push("/roles/candidato");
  }

  return <>Redirecting Users</>;
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

  return {
    props: {
      token,
    },
  };
}
