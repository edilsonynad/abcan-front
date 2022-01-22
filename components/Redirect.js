import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
export default function Redirect() {
  const [papel, setPapel] = useState("");
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setPapel(user.papel);
    }
  }, [user]);

  useEffect(() => {
    if (papel === "Antena") {
      router.replace("/antena");
    } else if (papel === "Admin") {
      router.replace("/admin");
    } else if (papel === "Normal") {
        router.replace("/normal");
      }  }, [papel]);
  return <></>;
}
