import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchData } from "../../../api/fetchData";

import Content from "../../_shared/Content";
import NewsContainer from "../../_shared/NewsContainer";

export default function CategoriesContent() {
  const { contentNewsPosts, nextPage } = useLoaderData();
  const filters = useSelector((state) => state.filters);
  const { appliedToken, ...filterPayload } = filters;

  const [newsPosts, setNewsPosts] = useState(contentNewsPosts);
  const [nextPageId, setNextPageId] = useState(nextPage);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (!filters.appliedToken) return;

    let cancelled = false;

    const fetchFilteredNews = async () => {
      setIsFiltering(true);
      try {
        const filterParams = normalizedFilterParams();
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        const fetchPromise = fetchData(`&size=8${filterParams}`);
        // console.log(filterPayload);
        const [response] = await Promise.all([fetchPromise, delay]);

        const nextNewsPosts = response.results ?? [];
        const nextId = response.nextPage ?? null;
        setNewsPosts(nextNewsPosts);
        setNextPageId(nextId);
      } catch (error) {
        console.log("Failed to load news", error);
      } finally {
        if(!cancelled) setIsFiltering(false);
      }
    };

    fetchFilteredNews();
    console.log(nextPageId);

    return () => {
      cancelled = true;
    }
  }, [filters.appliedToken]);

  const normalizedFilterParams = () => {
    const categoryParam = (filterPayload.category.toLowerCase() != 'all categories') ? `&category=${filterPayload.category}` : '';  
    const countryParam = (filterPayload.country != null) ? `&country=${filterPayload.country}` : '';  
    const languageParam = (filterPayload.language != null) ? `&language=${filterPayload.language}` : '';  

    return `${categoryParam}${countryParam}${languageParam}`;
  }

  return (
    <Content>
      {isFiltering ? 'Loading' : 
      <NewsContainer newsPosts={newsPosts} nextPageId={nextPageId} filterParams={normalizedFilterParams()} />
      }
    </Content>
  );
}
