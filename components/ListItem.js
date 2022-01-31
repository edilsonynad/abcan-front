import Link from "next/link";

export default function ListItem({ candidatura, handleDelete }) {

  return (
    <tr>
      <td className="min-width">
        <p>{candidatura.created_at.slice(0, 10)}</p>
      </td>
      <td className="min-width">
        <p>{candidatura.universidade.Nome}</p>
      </td>
      <td className="min-width">
        <p>
          {candidatura.cursos.map((curso) => {
            return `${curso.Nome_curso} | `;
          })}
        </p>
      </td>
      <td className="min-width">
        <span className="status-btn active-btn">{candidatura.Estado}</span>
      </td>
      <td>
        <div className="action">
         {/* <button className="text-sucess">
            <Link href={`/candidatura/edit/${candidatura.id}`}>
              <i className=" lni lni-pencil"></i>
            </Link>
        </button> */}
          <button className="text-success">
            <Link href={`/roles/candidatura/${candidatura.id}`}>
              <i className=" lni lni-eye"></i>
            </Link>
          </button>
          <button
            className="text-danger"
            onClick={() => handleDelete(candidatura.id)}
          >
            <i className="lni lni-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
