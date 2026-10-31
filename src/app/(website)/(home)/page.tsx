import {
  Architecture,
  Author,
  Contact,
  Features,
  Hero,
  HowItWorks,
  Preview,
  TechStack,
} from "@/components/home";

export default function HomePage() {
  return (
    <main
      className="space-y-5 px-5 font-(family-name:--font-instrument)
        sm:space-y-8 sm:px-8 lg:space-y-24 lg:px-10"
    >
      <Hero />
      <TechStack />
      <Features />
      <Preview />
      <HowItWorks />
      <Architecture />
      <Author />
      <Contact />
    </main>
  );
}
