import ListItem from "./ListItem";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ListItems({ candidaturas, token }) {

  const router = useRouter();
  const deleteEvent = async (id) => {
    if (confirm("Tem certeza que pretende eliminar essa candidatura???")) {
      const res = await fetch(`http://localhost:1337/candidaturas/${id}`, {
        method: "DELETE",
        headers :{
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) {
        if(res.status === 403 || res.status === 401){
          toast.error("Nao tens autorizacao para apagar esta cadidatura");
        }
        toast.error(data.message);
      } else {
        router.push("/roles/candidatura");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-style mb-30">
            <div className="table-wrapper table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <h6>Data</h6>
                    </th>
                    <th>
                      <h6>Universidade</h6>
                    </th>
                    <th>
                      <h6>Cursos</h6>
                    </th>
                    <th>
                      <h6>Estado</h6>
                    </th>
                    <th>
                      <h6></h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidaturas.map((candidatura) => {
                    return (
                      <ListItem
                        key={candidatura.id}
                        candidatura={candidatura}
                        handleDelete={deleteEvent}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
