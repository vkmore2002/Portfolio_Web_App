import { lazy, Suspense } from "react";
import Hero from "../components/Hero";

const GridSection = lazy(() => import("../components/GridSection"));

const Home = () => {
  return (
    <main className="bg-black">
      <div style={{ height: "200vh" }} className="relative">
        <Hero />
      </div>
      <Suspense fallback={<div className="bg-black h-screen" />}>
        <GridSection />
      </Suspense>
    </main>
  );
};

export default Home;
