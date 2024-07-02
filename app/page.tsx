import Info from "@/components/Info";
import Main from "@/components/Main";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Review from "@/components/Review";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <main>
        <div id="home">
          <Main />
        </div>
        <div id="info">
          <Info />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="menu">
          <Menu />
        </div>
        <div id="review">
          <Review />
        </div>
      </main>
      <Footer />
    </div>
  );
}
