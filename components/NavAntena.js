import Link from "next/link";

export default function NavAntena() {
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
        <span className="text">Candiaturas Antena</span>
      </a>
      <ul id="ddmenu_1" className="collapse show dropdown-nav">
        <li>
          <Link href="/roles/candidatura">
            <a href="index.html" className="">
              {" "}
              Ver candidatura{" "}
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
      </ul>
    </li>
  );
}
