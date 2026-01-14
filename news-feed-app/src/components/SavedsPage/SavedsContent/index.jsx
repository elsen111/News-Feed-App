import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Content from "../../_shared/Content";
import NewsContainer from "../../_shared/NewsContainer";
import SkeletonUI from "../../_shared/Skeleton";

export default function SavedsContent() {
  const [loading, setLoading] = useState(true);
  const savedPosts = useSelector((state) => state.savedPosts.posts);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <Content>
      {loading ? (
        <SkeletonUI />
      ) : (
        <NewsContainer newsPosts={savedPosts} nextPageId={null} />
      )}
    </Content>
  );
}