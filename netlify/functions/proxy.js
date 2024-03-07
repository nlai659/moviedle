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
        `${API_URL}anime/52991?fields=id,title,main_picture,alternative_titles,start_date,synopsis,genres,start_season,source,rating,pictures`,
        options
    ).then((res) => res.json());

	return {
		statusCode: 200,
		body: JSON.stringify(animeDetailsResponse),
	};
};
