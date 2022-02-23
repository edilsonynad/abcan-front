import Sidebar from "./Sidebar";
import HeaderDashboard from "./HeaderDashboard";
import { Head } from "next/document";
import Link from "next/link";
export default function Layout({ title, children, button, url }) {
  return (
    <>
      <Sidebar />
      <main className="main-wrapper">
        <HeaderDashboard />
        <section className="section">
          <div className="container-fluid">
            <div className="title-wrapper pt-30">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="title d-flex align-items-center flex-wrap mb-30">
                    <h2 className="mr-40">{title}</h2>

                    {button && (
                      <Link href={url}>
                        <a
                          href="#0"
                          className="main-btn primary-btn btn-hover btn-sm"
                        >
                          <i className="lni lni-plus mr-5"></i> {button}
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </section>
      </main>
    </>
  );
}

Layout.defaultProps = {
  title: "Dashboard",
};
