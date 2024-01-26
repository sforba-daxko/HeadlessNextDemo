import Image from "next/image";
import Header from "./layout/header";
import Hero from "./components/hero";
export default function Home() {
  return (
    <>
      <Header />
      <main >
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </main>
    </>

  );
}
