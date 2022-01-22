import Layout from "@/components/Layout";
import { useContext,useState, useEffect } from "react";
import {useRouter} from  'next/router'
import AuthContext from "@/context/AuthContext";
import { parseCookies } from "@/helpers/index";
import Redirect from "@/components/Redirect";
export default function index() {

  return (
    <div>
      <Layout title="Bem-vindo Candidato">
        <Redirect />
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="icon-card mb-30">
              <div className="icon purple">
                <i className="lni lni-cart-full"></i>
              </div>
              <div className="content">
            
                <h6 className="mb-10">New Orders</h6>
                <h3 className="text-bold mb-10"></h3>
                <p className="text-sm text-success">
                  <i className="lni lni-arrow-up"></i> +2.00%
                  <span className="text-gray">(30 days)</span>
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
                <h6 className="mb-10">Total Income</h6>
                <h3 className="text-bold mb-10">$74,567</h3>
                <p className="text-sm text-success">
                  <i className="lni lni-arrow-up"></i> +5.45%
                  <span className="text-gray">Increased</span>
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
                <h6 className="mb-10">Total Expense</h6>
                <h3 className="text-bold mb-10">$24,567</h3>
                <p className="text-sm text-danger">
                  <i className="lni lni-arrow-down"></i> -2.00%
                  <span className="text-gray">Expense</span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="icon-card mb-30">
              <div className="icon orange">
                <i className="lni lni-user"></i>
              </div>
              <div className="content">
                <h6 className="mb-10">New User</h6>
                <h3 className="text-bold mb-10">34567</h3>
                <p className="text-sm text-danger">
                  <i className="lni lni-arrow-down"></i> -25.00%
                  <span className="text-gray"> Earning</span>
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
  
    return {
      props: {
        token,
      },
    };
  }