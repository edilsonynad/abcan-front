import Link from "next/link";

export default function NavAdmin() {
  return (
    <>
    <li className="nav-item nav-item-has-children">
      <a
        href="#0"
        data-bs-toggle="collapse"
        data-bs-target="#ddmenu_1"
        aria-controls="ddmenu_1"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="text">Candiaturas Admin</span>
      </a>
      <ul id="ddmenu_1" className="collapse  dropdown-nav">
        <li>
          <Link href="roles/admin/candidatura">
            <a href="index.html" className="">
              {" "}
              Ver candidatura{" "}
            </a>
          </Link>
        </li>
        <li>
          <Link href="roles/admin/candidatura/add">
            <a href="index.html" className="">
              {" "}
              Realizar candidatura{" "}
            </a>
          </Link>
        </li>
      </ul>
    </li>
    <li className="nav-item nav-item-has-children">
      <a
        href="#0"
        data-bs-toggle="collapse"
        data-bs-target="#ddmenu_2"
        aria-controls="ddmenu_1"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="text">Universidade e Curso</span>
      </a>
      <ul id="ddmenu_2" className="collapse dropdown-nav">
        <li>
          <Link href="roles/admin/universidade">
            <a href="index.html" className="">
              {" "}
              Univerisades{" "}
            </a>
          </Link>
        </li>
        <li>
          <Link href="roles/admin/universidade/cursos">
            <a href="index.html" className="">
              {" "}
              Cursos{" "}
            </a>
          </Link>
        </li>
      </ul>
    </li>
    </>
  );
}
