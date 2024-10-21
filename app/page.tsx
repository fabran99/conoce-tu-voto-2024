import HeroSection from "@/components/HeroSection";
import ChatSection from "@/components/chat/ChatSection";

const HomePage = () => {
  return (
    <main>
      <div className="absolute inset-0 bg-grid-blue-200/50 bg-grid-small-200/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] z-0" />
      <HeroSection />
      <ChatSection />
    </main>
  );
};

export default HomePage;
