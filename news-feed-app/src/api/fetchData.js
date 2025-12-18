import { BASE_API_LINK } from "./api.config";

export const fetchData = async(urlParams) => {
    try {
        const response = await fetch(`${BASE_API_LINK}${urlParams}`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Something went wrong");
    }
}