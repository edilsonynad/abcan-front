import Link from "next/link";

export default function UniList({ universidade, handleDelete }) {
  console.log(universidade);

  return (
    <tr>
      <td className="min-width">
        <p>{universidade.id}</p>
      </td>
      <td className="min-width">
        <p>{universidade.Nome}</p>
      </td>
      <td className="min-width">
        <p>{universidade.cursos.length}</p>
      </td>
      <td>
        <div className="action">
          {/*<button className="text-sucess">
            <Link href={`/candidatura/edit/${universidade.id}`}>
              <i className=" lni lni-pencil"></i>
            </Link>
            </button>*/}
          <button className="text-success">
            <Link href={`/admin/universidade/${universidade.id}`}>
              <i className=" lni lni-eye"></i>
            </Link>
          </button>
          <button
            className="text-danger"
            onClick={() => handleDelete(universidade.id)}
          >
            <i className="lni lni-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
