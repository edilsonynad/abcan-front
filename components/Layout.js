import Sidebar from "./Sidebar";
import HeaderDashboard from "./HeaderDashboard";
import { Head } from "next/document";

export default function Layout({title, children, papel }) {
  return (
    <>
      <Sidebar papel={papel}/>
      <main className="main-wrapper">
        <HeaderDashboard />
        <section className="section">
          <div className="container-fluid">
            <div className="title-wrapper pt-30">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="title mb-30">
                    <h2>{title}</h2>
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
  title: 'Dashboard',
}