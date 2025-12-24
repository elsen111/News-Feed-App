import { useSelector } from "react-redux";

import Content from "../../_shared/Content";
import NewsContainer from "../../_shared/NewsContainer";
import { useState, useEffect } from "react";

export default function SavedsContent() {
  const [loading, setLoading] = useState(false);
  const savedPosts = useSelector((state) => state.savedPosts);

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <Content>
      {loading ? (
        <p> Loading...</p>
      ) : (
        <NewsContainer newsPosts={savedPosts} nextPageId={null} />
      )}
    </Content>
  );
}
