import fetch from "node-fetch";
const API_CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "X-MAL-CLIENT-ID": "d4175515382d8e544f36590a1bf3ebf5",
  },
};

export const handler = async () => {
  const animeDetailsResponse = await fetch(
    `https://api.myanimelist.net/v2/anime/52991?fields=id,title,main_picture,alternative_titles,start_date,synopsis,genres,start_season,source,rating,pictures`,
    options
  ).then((res) => res.json());

  console.log(animeDetailsResponse);

  try {
    const response = await fetch(
      `https://api.myanimelist.net/v2/anime/52991?fields=id,title,main_picture,alternative_titles,start_date,synopsis,genres,start_season,source,rating,pictures`,
      options
    );
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
      body: JSON.stringify(response),
    });
  } catch (error) {
    console.log(error);
  }
};
