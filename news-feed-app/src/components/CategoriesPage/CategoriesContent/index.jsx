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
  const searchQuery = useSelector((state) => state.search);
  const { query, searchCount } = searchQuery;
  const categoryMenu = useSelector((state) => state.categoryMenu);
  const { categoriesParam, categoryFilterCount } = categoryMenu;

  const [newsPosts, setNewsPosts] = useState(contentNewsPosts);
  const [nextPageId, setNextPageId] = useState(nextPage);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searching, setSearching] = useState(false);
  const [categorySearching, setCategorySearching] = useState(false);
  const [filterParams, setFilterParams] = useState();
  const [queryParam, setQueryParam] = useState();
  const [categoryParam, setCategoryParam] = useState();

  useEffect(() => {    
    if (!filters.appliedToken) return;

    const params = normalizedFilterParams();
    setFilterParams(params);
    setQueryParam(null);
    setCategoryParam(null);

    let cancelled = false;

    const fetchFilteredNews = async () => {
      setIsFiltering(true);
      try {
        // const filterParams = normalizedFilterParams();
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        const fetchPromise = fetchData(`&size=8${params}`);

        // console.log(filterPayload);
        const [response] = await Promise.all([fetchPromise, delay]);

        const nextNewsPosts = response.results ?? [];
        const nextId = response.nextPage ?? null;
        setNewsPosts(nextNewsPosts);
        setNextPageId(nextId);
      } catch (error) {
        console.log("Failed to load news", error);
      } finally {
        if (!cancelled) setIsFiltering(false);
      }
    };

    fetchFilteredNews();
    console.log(nextPageId);

    return () => {
      cancelled = true;
    };
  }, [filters.appliedToken]);

  useEffect(() => {
    
    // console.log("filter Param: " + filterParams);
    
    if (!searchCount) return;

    const param = query.includes(" ")
          ? query.replaceAll(" ", "%20")
          : query;

    setQueryParam(param)
    setFilterParams(null);
    setCategoryParam(null)

    let cancelled = false;

    const fetchSearched = async () => {
      setSearching(true);

      try {
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        // let queryParam = query.includes(" ")
        //   ? query.replaceAll(" ", "%20")
        //   : query;

        const fecthPromise = fetchData(`&size=8&q=${param}`);
        const [response] = await Promise.all([fecthPromise, delay]);

        const nextNewsPosts = response.results ?? [];
        const nextId = response.nextPage ?? null;
        setNewsPosts(nextNewsPosts);
        setNextPageId(nextId);
      } catch (err) {
        console.log("failed to load news", err);
      } finally {
        if (!cancelled) setSearching(false);
        console.log(query.replaceAll(" ", "%20"));
      }
    };

    fetchSearched();

    return () => {
      cancelled = true;
    };
  }, [searchCount]);

  useEffect(() => {    
    if (!categoryFilterCount) return;

    const param = categoriesParam;
    setCategoryParam(param);
    setFilterParams(null);
    setQueryParam(null);

    let cancelled = false;

    const fetchSelectedCategories = async () => {
      setCategorySearching(true);
      try {
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        const fetchPromise = fetchData(`&size=8${param}`);

        const [response] = await Promise.all([fetchPromise, delay]);

        const nextNewsPosts = response.results ?? [];
        const nextId = response.nextPage ?? null;
        setNewsPosts(nextNewsPosts);
        setNextPageId(nextId);
      } catch (error) {
        console.log("Failed to load news", error);
      } finally {
        if (!cancelled) setCategorySearching(false);
      }
    };

    fetchSelectedCategories();
    console.log(nextPageId);

    return () => {
      cancelled = true;
    };
  }, [categoryFilterCount]);

  const normalizedFilterParams = () => {
    const categoryParam =
      filterPayload.category.toLowerCase() != "all categories"
        ? `&category=${filterPayload.category}`
        : "";
    const countryParam =
      filterPayload.country != null ? `&country=${filterPayload.country}` : "";
    const languageParam =
      filterPayload.language != null
        ? `&language=${filterPayload.language}`
        : "";

    return `${categoryParam}${countryParam}${languageParam}`;
  };

  return (
    <Content>
      {isFiltering || searching || categorySearching ? (
        "Loading"
      ) : (
        <NewsContainer
          newsPosts={newsPosts}
          nextPageId={nextPageId}
          filterParams={filterParams}
          searchQuery={queryParam}
          categoriesParam={categoryParam}
        />
      )}
    </Content>
  );
}
