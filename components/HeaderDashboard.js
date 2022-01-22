import AuthContext from "@/context/AuthContext";
import { Fragment } from "react";
import { useContext } from "react";

export default function HeaderDashboard() {

  const {logout, user} = useContext(AuthContext)
  return (
    <Fragment>
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-6">
              <div className="header-left d-flex align-items-center">
                <div className="menu-toggle-btn mr-20">
                  <button
                    id="menu-toggle"
                    className="main-btn primary-btn btn-hover"
                  >
                    <i className="lni lni-chevron-left me-2"></i> Menu
                  </button>
                </div>
            
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-6">
              <div className="header-right">
                <div className="profile-box ml-15">
                  <button
                    className="dropdown-toggle bg-transparent border-0"
                    type="button"
                    id="profile"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="profile-info">
                      <div className="info">
                        <h6>{user && user.username}</h6>
                      </div>
                    </div>
                    <i className="lni lni-chevron-down"></i>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profile"
                  >
                    <li>
                      <a href="#" onClick={() => logout()}>
                        {" "}
                        <i className="lni lni-exit"></i> Sair{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
}
