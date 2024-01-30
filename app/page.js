import Image from "next/image";
import Header from "./layout/header";
import Hero from "./components/hero";
import Feature from "./components/feature";
export default function Home() {
  return (
    <>
      <Header />
      <main >
        <Hero/>
        <Feature />
      </main>
    </>

  );
}
