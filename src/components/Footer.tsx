import React from 'react';
import tmdbLogo from '../assets/tmdb.svg';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container mx-auto p-4">
        <p className="text-center text-gray-600">
          API provided by{" "}
          <a href="https://www.themoviedb.org/" className="underline">
            TMDB
          </a>
        </p>
        <div className="flex justify-center">
          <a href="https://www.themoviedb.org/">
            <img src={tmdbLogo} alt="TMDB Logo" className="mt-1 h-4 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;