import fetch from "node-fetch";
const API_CLIENT_ID = process.env.VITE_MAL_CLIENT_ID;

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "X-MAL-CLIENT-ID": API_CLIENT_ID,
  },
};

export const handler = async () => {
  try {
    const response = await fetch(
      `https://api.myanimelist.net/v2/anime/52991?fields=id,title,main_picture,alternative_titles,start_date,synopsis,genres,start_season,source,rating,pictures`,
      options
    );
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify(await response.json()),
    };
  } catch (error) {
    return {
	  headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	  },
	  statusCode: 500,
	  body: JSON.stringify({ message: error.message }),
	};
  }
};

module.exports = { handler };
