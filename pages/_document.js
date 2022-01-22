import Document, { Html, Head, Main, NextScript } from "next/document";
import { FaGalacticSenate } from "react-icons/fa";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />

        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
        <script src="/assets/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/Chart.min.js"></script>
        <script src="/assets/js/dynamic-pie-chart.js"></script>
        <script src="/assets/js/moment.min.js"></script>
        <script src="/assets/js/fullcalendar.js"></script>
        <script src="/assets/js/jvectormap.min.js"></script>
        <script src="/assets/js/world-merc.js"></script>
        <script src="/assets/js/polyfill.js"></script>
        <script src="/assets/js/main.js"></script>
      </Html>
    );
  }
}

export default MyDocument;
