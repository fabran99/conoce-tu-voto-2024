import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 mt-12"
      id="footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Conoce tu voto</h3>
            <p className="text-blue-200">
              Empoderando a los ciudadanos con información electoral clara y
              accesible.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#chat"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Pregunta sobre las propuestas
                </a>
              </li>
              <li>
                <a
                  href="#footer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Acerca de
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/fabran99/conoce-tu-voto-2024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-500 text-center">
          <p className="text-blue-200">© 2024 Conoce tu voto.</p>
          <p className="mt-2 text-blue-300">
            Desarrollado por
            <a
              href="https://github.com/fabran99"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-white transition-colors"
            >
              {" "}
              fabran99
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
