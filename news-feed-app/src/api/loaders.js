export const homeLoader = async () => {
    const response = await fetch("https://newsdata.io/api/1/latest?apikey=pub_e1cccdc48235436aabc537a2f0455c38&size=8");
    if(!response.ok) {
        throw new Error("News not found...");
    }
    const results = await response.json();
    return results.results;
}