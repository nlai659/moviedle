import React from 'react';

type CreditHintProps = {
    name: string;
    character: string;
    profile_path: string;
    hidden?: boolean;
}

const CreditHint: React.FC<CreditHintProps> = ({
  name,
  character,
  profile_path,
  hidden,
}: CreditHintProps) => {
    return (
        <div className="bg-gray-700 rounded-lg shadow-md p-2 m-1">
            <p className="text-white font-bold ml-1">Cast:</p>
            <div className="flex flex-row items-center">
                <img
                    className={`h-20 w-20 rounded-full object-cover ${hidden ? "hidden" : ""}`}
                    src={`https://image.tmdb.org/t/p/w200${profile_path}`}
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
