import React, { useState } from "react";

import SynopsisHint from "./hints/SynopsisHint";
import DateHint from "./hints/DateHint";
import GenreHint from "./hints/GenreHint";
import CreditHint from "./hints/CreditHint";

type HintAreaProps = {
  movieData: any;
  creditData: any;
  numHints: number;
};

const HintArea = ({ movieData, creditData, numHints }: HintAreaProps) => {
  const actor1 = creditData.cast[0];
  const actor2 = creditData.cast[1];
  const director = creditData.crew.find((member) => member.job === "Director");

  // Array of hint components
  const hintComponents = [
    <SynopsisHint synopsis={movieData.overview} />,
    <GenreHint genres={movieData.genres} />,
    <DateHint date={movieData.release_date} />,
    <CreditHint name={actor1.name} character={actor1.character} profile_path={actor1.profile_path} />,
    <CreditHint name={actor2.name} character={actor2.character} profile_path={actor2.profile_path} />,
    <CreditHint name={director.name} character={director.job} profile_path={director.profile_path} />
  ];

  return (
    <div>
      {hintComponents.map((hint, index) => (
        <div key={index}>{index >= numHints ? React.cloneElement(hint, { hidden: true }) : hint}</div>
      ))}
    </div>
  );
};

export default HintArea;
