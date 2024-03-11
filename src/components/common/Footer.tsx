import React from 'react';
import tmdbLogo from '../../assets/tmdb.svg';
import malLogo from '../../assets/MyAnimeList.png';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container mx-auto p-4">
        <p className="text-center text-zinc-600">
          API provided by{" "}
          <a href="https://www.themoviedb.org/" className="underline">
            TMDB
          </a>
          {" "}and{" "}
          <a href="https://myanimelist.net/" className="underline">
            MAL
          </a>
        </p>
        <div className="flex justify-center">
          <a href="https://www.themoviedb.org/">
            <img src={tmdbLogo} alt="TMDB Logo" className="mt-1 h-4 w-auto" />
          </a>
          <a href="https://myanimelist.net/">
            <img src={malLogo} alt="MyAnimeList Logo" className="ml-4 h-5 mt-1 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;