import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Accueil', 'Projets', 'Compétences', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md cursor-pointer"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/50 backdrop-blur-lg">
            {['Accueil', 'Projets', 'Compétences', 'Contact'].map((item) => (
              <a
                key={item}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;