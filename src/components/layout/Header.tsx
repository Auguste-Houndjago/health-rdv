import React from 'react';

import Link from 'next/link';

import { Heart } from 'lucide-react';
import Nav from './navigation/Nav';
import { Button } from '../ui/button';


interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`bg-background border-b ${className}`}>
      <nav className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex justify-center items-center gap-2" aria-label="Aller à l'accueil">
              <span className="text-2xl font-bold text-primary">MedEasy </span> <Heart size={20} /> 
            </Link>
          </div>

          {/* Navigation Links */}
    

          {/* Actions */}
          <div className="flex items-center space-x-4">
                  <Nav className="text-card" />
            <Link href="/register">
              <Button variant="default" size="sm">
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;