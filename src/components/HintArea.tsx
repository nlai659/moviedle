import React from "react";

import SynopsisHint from "./hints/SynopsisHint";
import DateHint from "./hints/DateHint";
import GenreHint from "./hints/GenreHint";
import CreditHint from "./hints/CreditHint";
import { MediaData } from "../types/MediaData";

type HintAreaProps = {
  mediaData: MediaData;
  numHints: number;
};

const HintArea = ({ mediaData, numHints }: HintAreaProps) => {

  // Array of hint components
  const hintComponents = [
    <SynopsisHint synopsis={mediaData.synopsis} />,
    <GenreHint genres={mediaData.genres} />,
    <DateHint date={mediaData.date} />,
    <CreditHint name={mediaData.castList[0].name} character={mediaData.castList[0].role} img_path={mediaData.castList[0].img_path} />,
    <CreditHint name={mediaData.castList[1].name} character={mediaData.castList[1].role} img_path={mediaData.castList[1].img_path} />,
    <CreditHint name={mediaData.castList[2].name} character={mediaData.castList[2].role} img_path={mediaData.castList[2].img_path} />,
  ];

  return (
    <div>
      {hintComponents.map((hint, index) => (
        <div key={index}>{index > numHints ? React.cloneElement(hint, { hidden: true }) : hint}</div>
      ))}
    </div>
  );
};

export default HintArea;
