import Link from "next/link";

export default function NavNormal() {
  return (
    <li className="nav-item nav-item-has-children">
      <a
        href="#0"
        data-bs-toggle="collapse"
        data-bs-target="#ddmenu_1"
        aria-controls="ddmenu_1"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="text">Candiaturas</span>
      </a>
      <ul id="ddmenu_1" className="collapse show dropdown-nav">
        <li>
          <Link href="/roles/candidatura">
            <a href="index.html" className="">
              {" "}
              Suas candidaturas{" "}
            </a>
          </Link>
        </li> 
        <li>
          <Link href="/roles/candidatura/add">
            <a href="index.html" className="">
              {" "}
              Realizar candidatura{" "}
            </a>
          </Link>
        </li>
        <li>
        </li>
      </ul>
    </li>
  );
}
