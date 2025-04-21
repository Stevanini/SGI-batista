import { Banner, Contact, Footer, Gallery, Header, Information, Mission, Offers, Reflections, Welcome } from './_components';

export default function Page() {
  return (
    <main>
      <Header />
      <Banner />
      <Information />
      <Welcome />
      <Offers />
      <Mission />
      <Reflections />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
