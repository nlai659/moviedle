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
        <div>
            <p> Crew Member: <span className={hidden ? 'invisible' : ''}> {name} </span> </p>
        </div>
    )
};

export default CreditHint;
