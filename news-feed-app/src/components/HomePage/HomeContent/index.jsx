import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchData } from "../../../api/utils/fetchData";
import { useEffect, useState } from "react";

import Content from "../../_shared/Content";
import NewsContainer from "../../_shared/NewsContainer";
import SkeletonUI from "../../_shared/Skeleton";

export default function HomeContent() {
  const { contentNewsPosts, nextPage, error } = useLoaderData();
  const searchQuery = useSelector((state) => state.search);
  const { query, searchCount } = searchQuery;

  const [newsPosts, setNewsPosts] = useState(contentNewsPosts);
  const [nextPageId, setNextPageId] = useState(nextPage);
  const [searching, setSearching] = useState(false);
  const [err, setErr] = useState(error);

  useEffect(() => {
    if (!searchCount) return;

    let cancelled = false;

    const fetchSearched = async () => {
      setErr("");
      setSearching(true);

      try {
        const delay = new Promise((resolve) => setTimeout(resolve, 2000));
        let queryParam = query.includes(" ") ? query.replaceAll(" ", "%20") : query;

        const fecthPromise = fetchData(`&size=8&q=${queryParam}`);
        const [response] = await Promise.all([fecthPromise, delay]);

        const nextNewsPosts = response.results ?? [];
        const nextId = response.nextPage ?? null;
        setNewsPosts(nextNewsPosts);
        setNextPageId(nextId);
      } catch (err) {
        if(cancelled) return;
        setErr(`Failed to  load news ${err}`);
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
          searchQuery={query}
          error={err}
        />
      )}
    </Content>
  );
}
