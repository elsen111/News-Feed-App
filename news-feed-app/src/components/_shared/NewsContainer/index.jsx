import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { fetchData } from "../../../api/fetchData";

import NewsCard from "../NewsCard";
import LoaderButton from "../Buttons/LoaderButton";
import LinkButton from "../Buttons/LinkButton";

export default function NewsContainer({
  newsPosts,
  nextPageId,
  filterParams = null,
  searchQuery = null,
  categoriesParam = null,
  suggestionParam = null,
  error,
}) {
  const { pathname } = useLocation();
  const [newsList, setNewsList] = useState(newsPosts);
  const [nextNewsPage, setNextNewsPage] = useState(nextPageId);
  const [loading, setLoading] = useState(false);
  const [showLoaderButton, setShowLoaderButton] = useState(false);
  const [renderedSavedPosts, setRenderedSavedPosts] = useState([]);

  const filters = useSelector((state) => state.filters);
  const { appliedToken } = filters;

  const SAVED_PAGE_CHUNK = 12;

  useEffect(() => {
    setNewsList(newsPosts);
    setNextNewsPage(nextPageId);

    if (pathname === "/saved") {
      setRenderedSavedPosts((newsPosts ?? []).slice(0, SAVED_PAGE_CHUNK));
    } else {
      setRenderedSavedPosts(newsPosts);
    }
  }, [newsPosts, nextPageId, pathname]);

  useEffect(() => {
    if (pathname === "/saved") {
      setShowLoaderButton((newsPosts ?? []).length > renderedSavedPosts.length);
    } else {
      setShowLoaderButton(newsList.length != 0 && nextNewsPage);
    }
  }, [newsList, nextNewsPage, renderedSavedPosts, newsPosts, pathname]);

  if (error) {
    return <p className="text-red-500 text-base text-center text-[18px] px-5"> Failed to load news. Something went wrong! </p>;
  }

  const handleLoadMore = async () => {
    if (pathname === "/saved") {
      const totalSavedPosts = newsPosts ?? [];
      const renderedPostsCount = renderedSavedPosts.length;
      if (renderedPostsCount >= totalSavedPosts.length) return;

      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const morePosts = totalSavedPosts.slice(
          renderedPostsCount,
          renderedPostsCount + SAVED_PAGE_CHUNK
        );
        setRenderedSavedPosts((prev) => [...prev, ...morePosts]);
      } catch (error) {
        console.log("Failed to load more saved posts", error);
      } finally {
        setLoading(false);
      }

      return;
    }

    if (loading || !nextNewsPage) return;

    setLoading(true);

    try {
      let fetchPromise;
      const delay = new Promise((resolve) => setTimeout(resolve, 1000));

      if (filterParams) {
        const params = appliedToken
          ? `&page=${nextNewsPage}${filterParams}`
          : filterParams;
        fetchPromise = fetchData(`&size=8${params}`);
      } else if (searchQuery) {
        const params = `&page=${nextNewsPage}&q=${searchQuery}`;
        fetchPromise = fetchData(`&size=8${params}`);
      } else if (categoriesParam) {
        const params = `&page=${nextNewsPage}${categoriesParam}`;
        fetchPromise = fetchData(`&size=8${params}`);
      } else if (suggestionParam) {
        const params = `&page=${nextNewsPage}${suggestionParam}`;
        fetchPromise = fetchData(`&size=8${params}`);
      } else {
        fetchPromise = fetchData(`&size=8&page=${nextNewsPage}`);
      }

      const [response] = await Promise.all([fetchPromise, delay]);

      const nextNewsPosts = response.results ?? [];
      const nextId = response.nextPage ?? null;
      setNewsList((prevNewsList) => [...prevNewsList, ...nextNewsPosts]);
      setNextNewsPage(nextId);
    } catch (error) {
      console.log("Failed to load more news", error);
    } finally {
      setLoading(false);
    }
  };

  const displayedNews = pathname === "/saved" ? renderedSavedPosts : newsList;

  console.log(error);

  return (
    <section className="flex flex-col justify-center items-center gap-5 sm:gap-[35px]">
      {displayedNews.length == 0 && (
        <p className="text-gray-500 text-base text-center text-[18px]"> 
        {pathname === "/saved" ? "No saved posts." : "No news found."}  
        </p>
      )}
      <section className="grid grid-cols-1 gap-y-[30px] gap-x-5 sm:gap-y-[50px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedNews.map((news) => (
          <NewsCard key={news.article_id} {...news} />
        ))}
      </section>

      {showLoaderButton && (
        <LoaderButton onLoadNews={handleLoadMore} loading={loading} />
      )}
      {pathname === "/" && <LinkButton />}
    </section>
  );
}
