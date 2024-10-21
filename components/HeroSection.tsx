import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
export default function HeroSection() {
  return (
    <main className="relative flex-grow container mx-auto px-4 py-16 overflow-hidden">
      <section className="text-center mb-6">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full bg-blue-300 opacity-20 rounded-lg transform -rotate-2"></div>
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-500 opacity-20 rounded-lg transform rotate-2"></div>
          <h1 className="text-7xl md:text-8xl font-extrabold text-blue-600 mb-6 drop-shadow-lg">
            Conoce tu voto
          </h1>
        </div>
        <p className="text-2xl md:text-3xl text-blue-800 mb-12 max-w-4xl mx-auto leading-relaxed">
          Descubre y compara las propuestas de los candidatos presidenciales.
          Toma decisiones informadas para construir el futuro de tu país.
        </p>
        <a href="#chat">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-full text-xl shadow-xl transition-all hover:scale-105">
            Explorar propuestas
            <ChevronRight className="ml-2 h-6 w-6" />
          </Button>
        </a>
      </section>
    </main>
  );
}
