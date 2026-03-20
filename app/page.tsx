import { AppBody } from "@/components";
import {
  Contact,
  Experience,
  Products,
  Start,
  Packages,
} from "@/components/mainPageComponents";
import { WrapperPartners } from "@/components/mainPageComponents/partners/wrapper";

export default function Home() {
  return (
    <AppBody>
      <Start />
      <Products />
      <Packages />
      <Experience />
      <WrapperPartners />
      <Contact />
    </AppBody>
  );
}
