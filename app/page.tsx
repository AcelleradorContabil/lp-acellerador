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
        <div className="below-fold"><Products /></div>
        <div className="below-fold"><Onboarding /></div>
        <div className="below-fold"><Packages /></div>
        <div className="below-fold"><VideoTestimonials /></div>
        <div className="below-fold"><Experience /></div>
        <div className="below-fold"><WrapperPartners /></div>
        <div className="below-fold"><Contact /></div>
        <div className="below-fold"><Footer /></div>
        </AppBody>
    );
}