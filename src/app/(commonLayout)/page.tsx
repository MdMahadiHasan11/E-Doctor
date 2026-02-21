import { Hero } from "@/components/modules/Home/hero";
import Specialities from "@/components/modules/Home/specialties";
import Steps from "@/components/modules/Home/steps";
import Testimonials from "@/components/modules/Home/testimonials";
import TopRatedDoctors from "@/components/modules/Home/top-rated-doctors";
// import CTASection from "@/components/modules/Home/cta-section";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Specialities />
        <TopRatedDoctors />
        <Steps />
        <Testimonials />
        {/* <CTASection /> */}
      </main>
    </>
  );
}
