import Hero from "@/components/sections/Hero";
import ScrollyCanvas from "@/components/sections/ScrollyCanvas";
import WhatIDo from "@/components/sections/WhatIDo";
import SelectedWork from "@/components/sections/SelectedWork";
import ContactTeaser from "@/components/sections/ContactTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollyCanvas />
      <WhatIDo />
      <SelectedWork />
      <ContactTeaser />
    </>
  );
}
