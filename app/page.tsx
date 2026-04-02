import { AppBody, Footer } from "@/components";
import {
  Contact,
  Experience,
  Products,
  Start,
  Packages,
  Onboarding,
  Testimonials,
  VideoTestimonials,
} from "@/components/mainPageComponents";
import { WrapperPartners } from "@/components/mainPageComponents/partners/wrapper";

export default function Home() {
  return (
    <AppBody>
      <Start />
      <Products />
      <Onboarding />
      <Packages />
      <Testimonials />
      <VideoTestimonials />
      <Experience />
      <WrapperPartners />
      <Contact />
      <Footer />
    </AppBody>
  );
}
