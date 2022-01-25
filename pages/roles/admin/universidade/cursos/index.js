import Layout from "@/components/Layout";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function index({ cursos }) {
    const router = useRouter();
    const handleDelete = async (id) => {
      if (confirm("Tem certeza que pretende eliminar essa candidatura???")) {
        const res = await fetch(`http://localhost:1337/cursos/${id}`, {
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
    <Layout title="Cursos">
      <Link href={`cursos/add`}>
          <a href="#0" class="main-btn primary-btn btn-hover btn-sm">
            <i class="lni lni-plus mr-5"></i> Criar
          </a>
        </Link>
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
                      <h6>Univerisdade</h6>
                    </th>
                    <th>
                      <h6>Grau</h6>
                    </th>
                    <th>
                      <h6></h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cursos.map((curso) => {
                    return (
                      <tr>
                        <td>
                          <p class="text-sm">{curso.id}</p>
                        </td>
                        <td>
                          <p class="text-sm">{curso.Nome_curso}</p>
                        </td>
                        <td>
                          <p class="text-sm">{/*curso.universidade.Nome*/}</p>
                        </td>
                        <td>
                          <p class="text-sm">{curso.Grau}</p>
                        </td>
                        <td>
                          <div className="action">
                            <button className="text-success">
                              <Link
                                href={`/admin/universidade/curso/${curso.id}`}
                              >
                                <i className=" lni lni-eye"></i>
                              </Link>
                            </button>
                            <button
                              className="text-danger"
                              onClick={() => handleDelete(curso.id)}
                            >
                              <i className="lni lni-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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

  const data = await fetch(`${API_URL}/cursos`);

  const cursos = await data.json();

  return {
    props: {
      token,
      cursos,
    },
  };
}
