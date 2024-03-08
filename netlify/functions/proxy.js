import fetch from "node-fetch";

export const handler = async () => {
  const res = await fetch("https://catfact.ninja/fact").then((res) => (res.json()));
  console.log(res);

  return {
	statusCode: 200,
	body: "Hello, World!",
  };
  }

