import { useFetch } from "../hooks/useFetch"
import { fetchData } from "./fetchData";
const  API_LINK = "https://newsdata.io/api/1/latest?apikey=pub_e1cccdc48235436aabc537a2f0455c38";

export const homePageLoader = async () => {
    try {
        const [bannerNewsData, contentNewsData] = await Promise.all([
            fetchData(`${API_LINK}&size=5`),
            fetchData(`${API_LINK}&size=8`)
        ]);

        return {
            bannerNewsPosts: bannerNewsData.results,
            contentNewsPosts: contentNewsData.results
        }
    } catch (error) {
        throw new Response("Failed to load news", {status: 500});
    }
};