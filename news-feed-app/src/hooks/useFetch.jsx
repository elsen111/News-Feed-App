// export const useFetch = (
//   size,
//   filterOptions = false,
//   sortingOption = false,
//   fetchType
// ) => {
//   let query;
//   let newsList;

//   // To store the search data (inputs) of the user to display relative news in the suggested page
//   let inpValues;
//   let filterValues;

//   let link = `https://newsdata.io/api/1/latest?apikey=pub_e1cccdc48235436aabc537a2f0455c38&size=${size}`;
//   const loader = document.querySelector(".loader");
//   const searchInp = document.querySelector(".search-box");

//   if (localStorage.getItem("inpValues")) {
//     inpValues = JSON.parse(localStorage.getItem("inpValues"));
//   } else {
//     localStorage.setItem("inpValues", []);
//     inpValues = [];
//   }

//   if (localStorage.getItem("filterValues")) {
//     filterValues = JSON.parse(localStorage.getItem("filterValues"));
//   } else {
//     filterValues = [];
//   }

//   if (fetchType === "search") {
//     query = encodeURIComponent(searchInp.value.trim());

//     if (page.id !== undefined) {
//       link = link.concat(`&page=${page.id}`);
//     }

//     link = link.concat(`&q=${query}`);

//     // To add query values to the localStorage
//     inpValues.unshift([`&q=${query}`]);
//     localStorage.setItem("inpValues", JSON.stringify(inpValues));
//     inpValues = [];
//   } else if (filterOptions.length !== 0 && fetchType === "filter") {
//     searchInp.value = "";

//     // if (page.id !== undefined) {
//     //   link = link.concat(`&page=${page.id}`);
//     // }

//     for (const option of filterOptions) {
//       link = link.concat(option);

//       // To add filter values to the localStorage
//       filterValues.unshift(filterOptions);
//     }

//     localStorage.setItem("filterValues", JSON.stringify(filterValues));

//     filterValues = [];
//   } else {

//     // if (page.id !== undefined) {
//     //   link = link.concat(`&page=${page.id}`);
//     // }
//   }

//   console.log("Link: " + link);


//   fetch(link)
//     .then((response) => response.json())
//     .then((data) => {
//       newsList = data.results;

//     //   if (data.nextPage !== null) {
//     //     page.changedPageId(data.nextPage);
//     //   } else {
//     //     page.changedPageId(undefined);
//     //   }
//     console.log(data.results);

//       if (size === 5) {
//         for (const i in newsList) {
//           displayedNews.add(newsList[i].article_id); // mark as displayed
//         }

//         sessionStorage.setItem(`bannerNewsCards`, JSON.stringify(newsList));
//       } else {

//         if (sortingOption === true) {
//           newsList = newsList.sort(
//             (news1, news2) => news2.source_priority - news1.source_priority
//           );
//         }

//         for (const news of newsList) {
//           // Skip duplicate news
//         //   if (displayedNews.has(news.article_id)) {
//         //     continue;
//         //   } else {
//         //     displayedNews.add(news.article_id); // mark as displayed
//         //   }

//         //   sessionStorage.setItem(
//         //     `news_list${counter}`,
//         //     JSON.stringify(newsList)
//         //   );
//         //   counter++;
//         }
//       }
//     })
//     .catch((err) => {
//       const bannerNewsList = JSON.parse(
//         sessionStorage.getItem(`bannerNewsCards`)
//       );
//     //   const list = JSON.parse(sessionStorage.getItem(`news_list${counter}`));

//       console.log(err);
//     });

//     console.log(newsList);
//   return newsList;
// };
