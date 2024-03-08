import fetch from "node-fetch";

export const handler = async () => {
  const res = await fetch("https://catfact.ninja/fact").then((res) => ({
	headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
	statusCode: 200,
	body: JSON.stringify(res),
  }));
  return res;
}

