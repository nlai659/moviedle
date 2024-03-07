import fetch from "node-fetch";
const API_CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-MAL-CLIENT-ID": `${API_CLIENT_ID}`,
    },
};

export const handler = async () => {
    const animeDetailsResponse = await fetch(
        `${API_URL}anime/52991?fields=id,title,main_picture,alternative_titles,start_date,synopsis,genres,start_season,source,rating,pictures`,
        options
    );

    const responseData = await animeDetailsResponse.json();

    const headers = {
        ...animeDetailsResponse.headers,
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin, replace * with specific origins if needed
        "Access-Control-Allow-Methods": "GET,OPTIONS", // Allow GET and OPTIONS methods
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow headers Content-Type and Authorization
    };

    return {
        statusCode: animeDetailsResponse.status,
        headers: headers,
        body: JSON.stringify(responseData),
    };
};
