import React from "react";
// import Carousel from "./Carousel";
import { useState } from "react";
import Title from "../../components/_shared/Content/Title";

export default function Category() {
const [newsList, setNewsList] = useState([]);

    // useEffect(() => {
    //   fetch("https://newsdata.io/api/1/latest?apikey=pub_e1cccdc48235436aabc537a2f0455c38&size=6")
    //   .then(response => response.json())
    //   .then(data => setNewsList(data.results))
    //   console.log(newsList);
    // }, [newsList]);
  return (
    <div>
      {/* <div style={{ height: "600px", position: "relative" }}>
        <Carousel
    baseWidth={300}
    autoplay={true}
    autoplayDelay={3000}
    pauseOnHover={true}
    loop={true}
    round={false}
  />
      </div> */}

      Category

      <Title />

    </div>
  );
}
