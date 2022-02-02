import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";

import Link from "next/link";
import AuthContext from "@/context/AuthContext";

export default function register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");



  const { register, error } = useContext(AuthContext);

  useEffect(()=>{
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    register({username, email, password});
  };

  return (
    <section className="signon-section">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-lg-3">
            
          </div>

          <div className="col-lg-6">
            <div className="signup-wrapper">
              <div className="form-wrapper">
                <h6 className="mb-15">Registrar</h6>
                <p className="text-sm mb-25">
                 
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="input-style-1">
                        <label>Nome</label>
                        <input
                          type="text"
                          placeholder="Nome"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input-style-1">
                        <label>Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input-style-1">
                        <label>Palavra-passe</label>
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    {/*<div className="col-12">
                      <div className="input-style-1">
                        <label>Confirmar Password</label>
                        <input type="password" placeholder="Password" />
                      </div>
                    </div>*/}

                    <div className="col-12">
                      <div
                        className="
                            button-group
                            d-flex
                            justify-content-center
                            flex-wrap
                          "
                      >
                        <button
                          className="
                              main-btn
                              primary-btn
                              btn-hover
                              w-100
                              text-center
                            "
                        >
                          Registrar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="singup-option pt-40">
                  <div
                    className="
                        button-group
                        pt-40
                        pb-40
                        d-flex
                        justify-content-center
                        flex-wrap
                      "
                  >
                  </div>
                </div>
                <p className="text-sm text-medium text-dark text-center">
                    Já tem uma conta? <Link href="/account/login">Entrar</Link>
                  </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            
            </div>
        </div>
      </div>
    </section>
  );
}
