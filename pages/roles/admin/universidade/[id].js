import Layout from "@/components/Layout";
import { parseCookies } from "@/helpers/index";
export default function CandidaturaPage({ universidade }) {
  return (
    <Layout title={`${universidade.Nome}`}>
      <div className="invoice-wrapper card-style mb-30">
        <div className="row">
          <div className="col-8">
            <div className="invoice-card ">
              <div className="invoice-header">
                <div className="invoice-date">
                  <span>Cursos </span>
                  <table class="invoice-table table">
                    <thead>
                      <tr>
                        <th class="service">
                          <h6 class="text-sm text-medium">#</h6>
                        </th>
                        <th class="service">
                          <h6 class="text-sm text-medium">Curso</h6>
                        </th>
                        <th class="desc">
                          <h6 class="text-sm text-medium">Grau</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {universidade.cursos.map((curso) => {
                        return (
                          <tr>
                            <td>
                              <p class="text-sm">{curso.id}</p>
                            </td>
                            <td>
                              <p class="text-sm">{curso.Nome_curso}</p>
                            </td>
                            <td>
                              <p class="text-sm">{curso.Grau}</p>
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
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, params: { id } }) {
  const data = await fetch(`http://localhost:1337/universidades/${id}`);

  const { token } = parseCookies(req);


  const universidade = await data.json();

  return {
    props: {
      universidade,
    },
  };
}
