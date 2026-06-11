import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Essence from "@/components/Essence";
import Ingredients from "@/components/Ingredients";
import ProductCollection from "@/components/ProductCollection";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="block w-full bg-background">
        <Hero />
        <ProductCollection />
        <Process />
        <Essence />
        <Ingredients />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
