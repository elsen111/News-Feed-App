import { useLocation } from "react-router-dom";
import { fetchData } from "../../../api/fetchData";
import NewsCard from "../NewsCard";
import LoaderButton from "../Buttons/LoaderButton";
import LinkButton from "../Buttons/LinkButton";
import { useState } from "react";

// let newsList = [
//   {
//     article_id: "aaab",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydaniu-nowosci-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic1.jpg",
//     source_name: "Khazar News",
//   },
//   {
//     article_id: "a2ab",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic2.jpg",
//     source_name: "Khazar News",
//   },
//   {
//     article_id: "a3ab",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic3.jpg",
//     source_name: "Khazar News",
//   },
//   {
//     article_id: "a4ab",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic4.jpg",
//     source_name: "Khazar News",
//   },
//   {
//     article_id: "a67a1",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic1.jpg",
//     source_name: "Khazar News",
//   },

//   {
//     article_id: "wb",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydaniu-nowosci-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic7.jpg",
//     source_name: "Khazar News",
//   },
//   {
//     article_id: "abb",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic3.jpg",
//     source_name: "Khazar News",
//   },
//   {
//     article_id: "a3bb",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic2.jpg",
//     source_name: "Khazar News",
//   },
//   {
//     article_id: "bb",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic1.jpg",
//     source_name: "Khazar News",
//   },
//   {
//     article_id: "b1",
//     link: "https://www.polityka.pl/tygodnikpolityka/kultura/2324629,1,architektura-w-najlepszym-wydawnicze-niaiu.read",
//     title:
//       "Bakan Göktaş: Kadın milletvekili oranı yüzde 19,8'e yükseldi / Haber eklendi",
//     pubDate: "2025-12-04",
//     category: "politics",
//     image_url: "../../../../public/images/dummy_pics/pic4.jpg",
//     source_name: "Khazar News",
//   },
// ];

export default function NewsContainer({ newsPosts, nextPageId }) {
  const { pathname } = useLocation();
  const [newsList, setNewsList] = useState(newsPosts);
  const [nextNewsPage, setNextNewsPage] = useState(nextPageId);
  const [loading, setLoading] = useState(false);

  const showLoaderButton = (newsList.length != 0) && nextNewsPage;

  const handleLoadMore = async() => {
    if(loading || !nextNewsPage) return;
    
    setLoading(true);

    try {
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const fetchPromise = fetchData(`&page=${nextNewsPage}`);
      const [response] = await Promise.all([fetchPromise, delay]);

      const nextNewsPosts = response.results ?? [];
      const nextId = response.nextPage ?? null;
      setNewsList((prevNewsList) => [...prevNewsList, ...nextNewsPosts]);
      setNextNewsPage(nextId);
    } catch (error) {
      console.log('Failed to load more news', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center gap-5 sm:gap-[35px]">
      { newsList.length == 0 && <p className="text-[16px]"> No news here </p>}
      <section className="grid grid-cols-1 gap-y-[30px] gap-x-5 sm:gap-y-[50px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {newsList.map((news) => (
          <NewsCard key={news.article_id} {...news} />
        ))}
      </section>
      
      { showLoaderButton && <LoaderButton onLoadNews={handleLoadMore} loading={loading} />}
      {pathname === '/' && <LinkButton />}
    </section>
  );
}
