import MainLayout from "../components/layouts/MainLayout";
import Hero from "../components/content/home/Hero";
import Papers from "../components/content/home/Papers";
import Services from "../components/content/home/Services";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Services />
      <Papers />
    </MainLayout>
  );
};

export default Home;
