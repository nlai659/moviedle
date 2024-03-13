import { fetchSuggestedData } from "../../src/services/dataFetching";

export default async (req: Request) => {
    const searchTerm: string = new URL(req.url).searchParams.get("searchTerm") as string;
    const category: number = parseInt(new URL(req.url).searchParams.get("category") as string);

    const data = await fetchSuggestedData(category, searchTerm);
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json",
        },
    });
}

    