import { fetchData } from "./fetchData";

export const homePageLoader = async () => {
  try {
    const [bannerNewsData, contentNewsData] = await Promise.all([
      fetchData("&size=5"),
      fetchData("&size=8"),
    ]);

    return {
      bannerNewsPosts: bannerNewsData.results,
      contentNewsPosts: contentNewsData.results,
      nextPage: contentNewsData.nextPage,
      error: null,
    };
  } catch (error) {
    return {
      bannerNewsPosts: [],
      contentNewsPosts: [],
      nextPage: null,
      error: `Failed to load news!!`,
    };
  }
};

export const categoriesPageLoader = async () => {
  try {
    const contentNewsData = await fetchData("&size=8");

    return {
      contentNewsPosts: contentNewsData.results,
      nextPage: contentNewsData.nextPage,
    };
  } catch (error) {
    return {
      bannerNewsPosts: [],
      contentNewsPosts: [],
      nextPage: null,
      error: `Failed to load news!!`,
    };
  }
};
