import { useLoaderData } from "react-router-dom";
import Content from "../../_shared/Content";
import NewsContainer from "../../_shared/NewsContainer";

export default function HomeContent() {
  const { contentNewsPosts } = useLoaderData();
  return (
    <Content>
        <NewsContainer newsPosts={ contentNewsPosts } />
    </Content>
  )
}
