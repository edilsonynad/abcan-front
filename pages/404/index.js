import Link from "next/link";

export default function NotFound() {
  return (
    <section className="signin-section">
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-lg-3"></div>

          <div className="col-lg-6">
            <div className="signin-wrapper">
                <h1 className="">404 </h1>
                {"  "}
                <p className="">Esta pagina nao existe</p>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </section>
  );
}
