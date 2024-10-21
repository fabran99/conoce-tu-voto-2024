import HeroSection from "@/components/HeroSection";
import ChatSection from "@/components/chat/ChatSection";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col">
      <div className="absolute inset-0 bg-grid-blue-200/50 bg-grid-small-200/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <HeroSection />
      <ChatSection />
      <Footer />
    </main>
  );
};

export default HomePage;
