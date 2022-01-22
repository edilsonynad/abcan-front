import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <section className="signin-section">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-lg-3"></div>

          <div className="col-lg-6">
            <div className="signin-wrapper">
              <div className="form-wrapper">
                <h6 className="mb-15">Login</h6>
                <p className="text-sm mb-25">
                
                </p>
                <form onSubmit={handleLogin}>
                  <div className="row">
                    <div className="col-12">
                      <div className="input-style-1">
                        <label>Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input-style-1">
                        <label>Password</label>
                        <input
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>



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
                         Entrar
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
                  <p className="text-sm text-medium text-dark text-center">
                    Não tem uma conta ainda <Link href="/account/register">Registrar-se</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </section>
  );
}
