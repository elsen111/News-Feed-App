import { fetchData } from "./fetchData";

export const homePageLoader = async () => {
    try {
        const [bannerNewsData, contentNewsData] = await Promise.all([
            fetchData('&size=5'),
            fetchData('&size=8'),
        ]);
        
        return {
            bannerNewsPosts: bannerNewsData.results,
            contentNewsPosts: contentNewsData.results,
            nextPage: bannerNewsData.nextPage,
        }
    } catch (error) {
        throw new Response("Failed to load news", {status: 500});
    }
};

export const categoriesPageLoader = async () => {
    try {
        const contentNewsData = await fetchData('&size=8');
        
        return { contentNewsPosts: contentNewsData.results, nextPage: contentNewsData.nextPage };
    } catch (error) {
        throw new Response("Failed to load news", {status: 500});
        
    }
}