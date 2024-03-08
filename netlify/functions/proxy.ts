import fetch from "node-fetch";
const API_CLIENT_ID = process.env.VITE_MAL_CLIENT_ID;

const options: any = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "X-MAL-CLIENT-ID": API_CLIENT_ID,
  },
};

export const handler = async (event) => {
  const url = event.queryStringParameters.url;

  try {
    const response = await fetch(
      url,
      options
    );
      console.log(url)
      console.log(response);

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
