import { Fragment } from "react";
import Link from "next/link";
import NavAdmin from "./NavAdmin";
import NavAntena from "./NavAntena";
import { useEffect, useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import NavNormal from "./NavNormal";
export default function sidebar() {
const {user} = useContext(AuthContext)

  
const [role, setRole] = useState({
  Admin: false,
  Antena: false,
  Normal: false
})
useEffect(() => {
if(user){
  if(user.papel === "Admin"){
    setRole({...role, Admin: true})
  }else  if(user.papel === "Antena"){
    setRole({...role, Antena: true})
  }else  if(user.papel === "Candidato"){
    setRole({...role, Normal: true})
  }
}
}, [user])

  return (
    <Fragment>
      <aside className="sidebar-nav-wrapper">
        <div className="navbar-logo">
          <h2>
            <Link href="/account/redirect">AB CRM</Link>
          </h2>
        </div>
        {role.Admin ? <nav className="sidebar-nav">
          <ul>
            <NavAdmin />
          </ul>
        </nav> : ''}
        {role.Antena ? <nav className="sidebar-nav">
          <ul>
            <NavAntena />
          </ul>
        </nav> : ''}
        {role.Normal ? <nav className="sidebar-nav">
          <ul>
          <NavNormal />
          </ul>
        </nav> : ''}
      </aside>
      <div className="overlay"></div>
    </Fragment>
  );
}
