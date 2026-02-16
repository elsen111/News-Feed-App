import { useSelector } from "react-redux";

import Content from "../../_shared/Content";
import NewsContainer from "../../_shared/NewsContainer";
import { useEffect, useState, useRef } from "react";
import { fetchData } from "../../../api/utils/fetchData";

import SkeletonUI from "../../_shared/Skeleton";

export default function SuggestionContent() {
  const [newsPosts, setNewsPosts] = useState([]);
  const [nextPageId, setNextPageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [randParam, setRandParam] = useState("");
  const [error, setError] = useState("");

  const suggestionParams = useSelector((state) => state.suggestionParams);
  const searchQuery = useSelector((state) => state.search);
  const { query, searchCount } = searchQuery;

  const hasFetchedRef = useRef(false);
  const initialParamsRef = useRef(suggestionParams);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    let cancelled = false;

    const fetchSuggestedPosts = async () => {
      setError("");

      try {
        const params = initialParamsRef.current;
        let response;

        if (!params || !params.length) {
          response = await fetchData(`&size=8`);
        } else {
          const param = params[Math.floor(Math.random() * params.length)];
          setRandParam(param);
          response = await fetchData(`&size=8${param}`);

          if (!response.results) {
            response = await fetchData(`&size=8`);
          }
        }

        if (!cancelled) {
          const posts = response.results ?? [];
          const nextPage = response.nextPage ?? null;

          console.log('actual posts');
          console.log(posts);

          setNewsPosts(posts);
          setNextPageId(nextPage);
          hasFetchedRef.current = true;
        }
      } catch (err) {
        console.log("Failed to load news ", err);
        if (!cancelled) {
          setError(`Failed to load news. ${err}`);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSuggestedPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!searchCount) return;

    let cancelled = false;

    const fetchSearched = async () => {
      setLoading(true);

      try {
        const delay = new Promise((resolve) => setTimeout(resolve, 2000));
        let queryParam = query.includes(" ")
          ? query.replaceAll(" ", "%20")
          : query;

        const fecthPromise = fetchData(`&size=8&q=${queryParam}`);
        const [response] = await Promise.all([fecthPromise, delay]);

        if (!cancelled) {
          const nextNewsPosts = response.results ?? [];
          const nextId = response.nextPage ?? null;
          setNewsPosts(nextNewsPosts);
          setNextPageId(nextId);
        }
      } catch (err) {
        console.log("Failed to  load news", err);
      } finally {
        if (!cancelled) setLoading(false);
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
      {loading ? (
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