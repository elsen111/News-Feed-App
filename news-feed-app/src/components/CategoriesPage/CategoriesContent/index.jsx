import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

import { fetchData } from "../../../api/fetchData";
import { addParams } from "../../../redux/features/suggestionSlices";

import Content from "../../_shared/Content";
import NewsContainer from "../../_shared/NewsContainer";
import SkeletonUI from "../../_shared/Skeleton";

export default function CategoriesContent() {
  const { contentNewsPosts, nextPage, error } = useLoaderData();
  const filters = useSelector((state) => state.filters);
  const { appliedToken, ...filterPayload } = filters;
  const searchQuery = useSelector((state) => state.search);
  const { query, searchCount } = searchQuery;
  const categoryMenu = useSelector((state) => state.categoryMenu);
  const { categoriesParam, categoryFilterCount } = categoryMenu;
  const dispatch = useDispatch();

  const [newsPosts, setNewsPosts] = useState(contentNewsPosts);
  const [nextPageId, setNextPageId] = useState(nextPage);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searching, setSearching] = useState(false);
  const [categorySearching, setCategorySearching] = useState(false);
  const [filterParams, setFilterParams] = useState();
  const [queryParam, setQueryParam] = useState();
  const [categoryParam, setCategoryParam] = useState();
  const [err, setErr] = useState(error);

  useEffect(() => {
    if (!filters.appliedToken) return;

    const params = normalizedFilterParams();
    setFilterParams(params);
    setQueryParam(null);
    setCategoryParam(null);

    let cancelled = false;

    const fetchFilteredNews = async () => {
      setIsFiltering(true);
      setErr("");
      try {
        // const filterParams = normalizedFilterParams();
        const delay = new Promise((resolve) => setTimeout(resolve, 2000));
        const fetchPromise = fetchData(`&size=8${params}`);

        // console.log(filterPayload);
        const [response] = await Promise.all([fetchPromise, delay]);

        let nextNewsPosts = response.results ?? [];
        const nextId = response.nextPage ?? null;

        console.log(filters.sort);

        if (filters.sort === "sort by source priority") {
          console.log('Sorting according to source priority: ');
          console.log('Before: ');
          console.log(nextNewsPosts);

          nextNewsPosts = [...nextNewsPosts].sort((prev, next) => {
            const pp = prev.source_priority ?? Number.MAX_SAFE_INTEGER;
            const np = next.source_priority ?? Number.MAX_SAFE_INTEGER;

            return pp - np;
          });

          console.log('After: ');
          console.log(nextNewsPosts);
        }

        setNewsPosts(nextNewsPosts);
        setNextPageId(nextId);
      } catch (error) {
        console.log("Failed to load news", error);
      } finally {
        if (!cancelled) setIsFiltering(false);
        dispatch(addParams(params));
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

    const param = query.includes(" ") ? query.replaceAll(" ", "%20") : query;

    setQueryParam(param);
    setFilterParams(null);
    setCategoryParam(null);

    let cancelled = false;

    const fetchSearched = async () => {
      setSearching(true);
      setErr("");

      try {
        const delay = new Promise((resolve) => setTimeout(resolve, 2000));
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
        if (cancelled) return;
        setErr(`Failed to  load news ${err}`);
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
      setErr("");
      try {
        const delay = new Promise((resolve) => setTimeout(resolve, 2000));
        const fetchPromise = fetchData(`&size=8${param}`);

        const [response] = await Promise.all([fetchPromise, delay]);

        const nextNewsPosts = response.results ?? [];
        const nextId = response.nextPage ?? null;
        setNewsPosts(nextNewsPosts);
        setNextPageId(nextId);
      } catch (error) {
        if (cancelled) return;
        // console.log("Failed to load news", error);
        setErr(`Failed to  load news ${error}`);
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
        <SkeletonUI />
      ) : (
        <NewsContainer
          newsPosts={newsPosts}
          nextPageId={nextPageId}
          filterParams={filterParams}
          filterSortOption={filters.sort}
          searchQuery={queryParam}
          categoriesParam={categoryParam}
          error={err}
        />
      )}
    </Content>
  );
}
