import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";

export default async function HomePage() {

  const status = {
    totalEvents: 750,
    totalAttendees: 3000,
    totalOrgs: 250
  }

  return (
    <div>

      <Hero />
      <WhyChoose />
      <Statistics status={status} />
      <Testimonials />
    </div>
  );
}

