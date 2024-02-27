import { useState } from "react";

import SynopsisHint from "./hints/SynopsisHint";
import DateHint from "./hints/DateHint";
import GenreHint from "./hints/GenreHint";

import tempMovieData from "../assets/496243";
import tempCreditData from "../assets/credits";
import CreditHint from "./hints/CreditHint";

const HintArea = () => {
  const [noToDisplay, setNoToDisplay] = useState(3);

  const actor1 = tempCreditData.cast[0];
  const actor2 = tempCreditData.cast[1];
  const director = tempCreditData.crew.find((member) => member.job === "Director");

  // Array of hint components
  const hintComponents = [
    <SynopsisHint synopsis={tempMovieData.overview} />,
    <GenreHint genres={tempMovieData.genres} />,
    <DateHint date={tempMovieData.release_date} />,
    <CreditHint name={actor1.name} character={actor1.character} profile_path={actor1.profile_path} />,
    <CreditHint name={actor2.name} character={actor2.character} profile_path={actor2.profile_path} />,
    <CreditHint name={director.name} character={director.job} profile_path={director.profile_path} />
  ];

  // Slice the hintComponents array based on noToDisplay
  const displayedHints = hintComponents.slice(0, noToDisplay);

  return (
    <div>
      {displayedHints.map((hint, index) => (
        <div key={index}>{hint}</div>
      ))}
    </div>
  );
};

export default HintArea;
