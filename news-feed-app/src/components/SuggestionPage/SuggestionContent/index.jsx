import { useSelector, useDispatch } from "react-redux";

import Content from "../../_shared/Content";
import NewsContainer from "../../_shared/NewsContainer";
import { useEffect, useState } from "react";
import { fetchData } from "../../../api/fetchData";

import SkeletonUI from "../../_shared/Skeleton";

export default function SuggestionContent() {
  const [newsPosts, setNewsPosts] = useState([]);
  const [nextPageId, setNextPageId] = useState(null);
  const [searching, setSearching] = useState(false);
  const [randParam, setRandParam] = useState("");
  const [error, setError] = useState("");

  const suggestionParams = useSelector((state) => state.suggestionParams);
  const searchQuery = useSelector((state) => state.search);
  const { query, searchCount } = searchQuery;

  useEffect(() => {
    let cancelled = false;

    const fetchSuggestedPosts = async () => {
      setError("");
      try {
        // console.log("Suggestion params: " + suggestionParams);
        if (!suggestionParams.length) return;

        const param =
          suggestionParams[Math.floor(Math.random() * suggestionParams.length)];

        setRandParam(param);
        // console.log("Randomly selected param: " + param);
        // console.log("Link endpoint: " + `&size=8${param}`);

        let response = await fetchData(`&size=8${param}`);

        if(!response.results) {
          response = await fetchData(`&size=8`);
        }

        const posts = response.results ?? [];
        const nextPage = response.nextPage ?? null;

        console.log('actual posts');
        console.log(posts);

        setNewsPosts(posts);
        setNextPageId(nextPage);
      } catch (err) {
        console.log("Failed to load news ", err);
        if(cancelled) return;
        setError(`Failed to  load news. ${error}`);
      }
    };

    fetchSuggestedPosts();

    return () => {
      cancelled = true;
    };
  }, [suggestionParams]);

  useEffect(() => {
    if (!searchCount) return;

    let cancelled = false;

    const fetchSearched = async () => {
      setSearching(true);

      try {
        const delay = new Promise((resolve) => setTimeout(resolve, 2000));
        let queryParam = query.includes(" ")
          ? query.replaceAll(" ", "%20")
          : query;

        const fecthPromise = fetchData(`&size=8&q=${queryParam}`);
        const [response] = await Promise.all([fecthPromise, delay]);

        const nextNewsPosts = response.results ?? [];
        const nextId = response.nextPage ?? null;
        setNewsPosts(nextNewsPosts);
        setNextPageId(nextId);
      } catch (err) {
        console.log("Failed to  load news", err);
      } finally {
        if (!cancelled) setSearching(false);
        console.log(query.replaceAll(" ", "%20"));
      }

      console.log(nextPageId);
    };

    fetchSearched();

    return () => {
      cancelled = true;
    };
  }, [searchCount]);

  return (
    <Content>
      {searching ? (
        <SkeletonUI />
      ) : (
        <NewsContainer
          newsPosts={newsPosts}
          nextPageId={nextPageId}
          suggestionParam={randParam}
          searchQuery={query}
          error={error}
        />
      )}
    </Content>
  );
}
