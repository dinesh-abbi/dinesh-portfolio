import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Stats />
    </div>
  );
}
