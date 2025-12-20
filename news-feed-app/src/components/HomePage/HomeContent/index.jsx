import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchData } from "../../../api/fetchData";

import Content from "../../_shared/Content";
import NewsContainer from "../../_shared/NewsContainer";
import { useEffect, useState } from "react";

export default function HomeContent() {
  const { contentNewsPosts, nextPage } = useLoaderData();
  const searchQuery = useSelector((state) => state.search);
  const { query, searchCount } = searchQuery;

  const [newsPosts, setNewsPosts] = useState(contentNewsPosts);
  const [nextPageId, setNextPageId] = useState(nextPage);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!searchCount) return;

    let cancelled = false;

    const fetchSearched = async () => {
      setSearching(true);

      try {
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        let queryParam = query.includes(" ") ? query.replaceAll(" ", "%20") : query;

        const fecthPromise = fetchData(`&size=8&q=${queryParam}`);
        const [response] = await Promise.all([fecthPromise, delay]);

        const nextNewsPosts = response.results ?? [];
        const nextId = response.nextPage ?? null;
        setNewsPosts(nextNewsPosts);
        setNextPageId(nextId);
      } catch (err) {
        console.log("failed to  load news", err);
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
        "Loading"
      ) : (
        <NewsContainer
          newsPosts={newsPosts}
          nextPageId={nextPageId}
          searchQuery={query}
        />
      )}
    </Content>
  );
}
