import React from 'react';
import CategorySelector from './CategorySelector';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between text-white py-4 px-6">
            <h1 className="text-2xl font-bold">Synopdle</h1>
            <CategorySelector />
        </header>
    );
};

export default Header;