import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UniList from "@/components/uni/UniList";
export default function ListItems({ universidades, token }) {
  const router = useRouter();
  const deleteEvent = async (id) => {
    if (confirm("Tem certeza que pretende eliminar essa candidatura???")) {
      const res = await fetch(`http://localhost:1337/universidades/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("Nao tens autorizacao para apagar esta univerisdade");
        }
        toast.error(data.message);
      } else {
        router.push("/admin/universidade");
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
                      <h6>#</h6>
                    </th>
                    <th>
                      <h6>Nome</h6>
                    </th>
                    <th>
                      <h6>Numero de cursos</h6>
                    </th>
                    <th>
                      <h6></h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {universidades.map((universidade) => {
                    return (
                      <UniList
                        key={universidade.id}
                        universidade={universidade}
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
