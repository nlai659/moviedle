import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container mx-auto p-4">
                <p className="text-center text-gray-600">
                    API provided by <a href="https://www.themoviedb.org/" className="underline">TMDB</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;