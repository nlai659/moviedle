import { fetchData } from "../../src/services/dataFetching";

export default async (req: Request) => {
    const isDaily: boolean = new URL(req.url).searchParams.get("isDaily") === "true";
    const category: number = parseInt(new URL(req.url).searchParams.get("category") as string);

    const data = await fetchData(category, isDaily);
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json",
        },
    });
}

    