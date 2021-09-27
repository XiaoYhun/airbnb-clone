import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
const progressBar = new ProgressBar({
  size: 4,
  color: "#fe595e",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progressBar.start);
Router.events.on("routeChangeComplete", progressBar.finish);
Router.events.on("routeChangeError", progressBar.finish);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
