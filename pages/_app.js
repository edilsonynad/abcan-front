import "@/styles/css/bootstrap.min.css";
import "@/styles/css/lineicons.css";
import "@/styles/css/materialdesignicons.min.css";
import "@/styles/css/fullcalendar.css";
import "@/styles/css/fullcalendar.css";
import "@/styles/css/main.css";
import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;