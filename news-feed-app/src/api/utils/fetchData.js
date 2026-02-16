import { BASE_API_LINK } from "../config/api.config";
import { httpError } from "../errors/httpErrors";

export const fetchData = async(urlParams) => {
    try {
        const response = await fetch(`${BASE_API_LINK}${urlParams}`);
    console.log(`${BASE_API_LINK}${urlParams}`);
        if (!response.ok) {
            throw httpError(response.status);
        }
        const data = await response.json();

        if(data.status === 'error') {
            throw new Error(data.message || "API returned an error!");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Something went wrong");
    }
}