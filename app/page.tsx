import Hero from "../components/sections/Hero";
import WhatIDo from "../components/sections/WhatIDo";
import SelectedWork from "../components/sections/SelectedWork";
import ContactTeaser from "../components/sections/ContactTeaser";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <WhatIDo />
      <SelectedWork />
      <ContactTeaser />
    </div>
  );
}
