import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Pricing } from './components/sections/Pricing';
import { Process } from './components/sections/Process';
import { Advantages } from './components/sections/Advantages';
import { Gallery } from './components/sections/Gallery';
import { Testimonials } from './components/sections/Testimonials';
import { Location } from './components/sections/Location';
import { Booking } from './components/sections/Booking';
import { Faq } from './components/sections/Faq';

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-surface"
      >
        Lompat ke konten
      </a>

      <Navbar />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <Pricing />
        <Process />
        <Advantages />
        <Gallery />
        <Testimonials />
        <Location />
        <Booking />
        <Faq />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
