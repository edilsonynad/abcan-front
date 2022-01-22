import Layout from "@/components/Layout";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import { parseCookies } from "@/helpers/index";
import Redirect from "@/components/Redirect";
import { API_URL } from "@/config/index";
export default function index({ candidaturas, universidades, cursos }) {
  return (
    <div>
      <Layout title="Bem-vindo Admin">
        <Redirect />
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="icon-card mb-30">
              <div className="icon purple">
                <i className="lni lni-cart-full"></i>
              </div>
              <div className="content">
                <h6 className="mb-10">Candidaturas</h6>
                <h3 className="text-bold mb-10">{candidaturas.length}</h3>
                <p className="text-sm text-success">
                  <span className="text-gray"></span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="icon-card mb-30">
              <div className="icon success">
                <i className="lni lni-dollar"></i>
              </div>
              <div className="content">
                <h6 className="mb-10">Universidades</h6>
                <h3 className="text-bold mb-10">{universidades.length}</h3>
                <p className="text-sm text-success">
                  <span className="text-gray"></span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="icon-card mb-30">
              <div className="icon primary">
                <i className="lni lni-credit-cards"></i>
              </div>
              <div className="content">
                <h6 className="mb-10">Cursos</h6>
                <h3 className="text-bold mb-10">{cursos.length}</h3>
                <p className="text-sm text-danger">
                  <span className="text-gray"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="card-style mb-30">
              <div className="title d-flex flex-wrap justify-content-between">
                <div className="left">
                  <h6 className="text-medium mb-10">Yearly subscription</h6>
                  <h3 className="text-bold">$245,479</h3>
                </div>
                <div className="right">
                  <div className="select-style-1">
                    <div className="select-position select-sm">
                      <select className="light-bg">
                        <option value="">Yearly</option>
                        <option value="">Monthly</option>
                        <option value="">Weekly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart">
                <canvas id="Chart1"></canvas>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card-style mb-30">
              <div
                className="
                    title
                    d-flex
                    flex-wrap
                    align-items-center
                    justify-content-between
                  "
              >
                <div className="left">
                  <h6 className="text-medium mb-30">Sales/Revenue</h6>
                </div>
                <div className="right">
                  <div className="select-style-1">
                    <div className="select-position select-sm">
                      <select className="light-bg">
                        <option value="">Yearly</option>
                        <option value="">Monthly</option>
                        <option value="">Weekly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart">
                <canvas id="Chart2"></canvas>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
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

  const data = await fetch(`${API_URL}/candidaturas`);

  const candidaturas = await data.json();

  const dataUni = await fetch(`${API_URL}/universidades`);

  const universidades = await dataUni.json();

  const dataCurso = await fetch(`${API_URL}/cursos`);

  const cursos = await dataCurso.json();

  return {
    props: {
      token,
      candidaturas,
      universidades,
      cursos,
    },
  };
}
