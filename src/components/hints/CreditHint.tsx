import React, { useState } from 'react';
import profileIcon from '../../assets/profile-icon.webp';

type CreditHintProps = {
    name: string;
    character: string;
    img_path: string;
    hidden?: boolean;
}

const CreditHint: React.FC<CreditHintProps> = ({
    name,
    character,
    img_path,
    hidden,
}: CreditHintProps) => {
    const [imgSrc, setImgSrc] = useState(img_path);

    const handleImgError = () => {
        setImgSrc(profileIcon);
    };

    return (
        <div className="bg-gray-700 rounded-lg shadow-md p-2 m-1">
            <p className="text-white font-bold ml-1">Cast:</p>
            <div className="flex flex-row items-center">
                <img
                    className={`h-20 w-20 rounded-full object-cover ${hidden ? "hidden" : ""}`}
                    src={imgSrc}
                    onError={handleImgError}
                    alt={name}
                />
                <div className={`ml-2 ${hidden ? "hidden" : ""}`}>
                    <p className="text-white font-semibold">{name}</p>
                    <p className="text-white">{character}</p>
                </div>
            </div>
        </div>
    )
};

export default CreditHint;
