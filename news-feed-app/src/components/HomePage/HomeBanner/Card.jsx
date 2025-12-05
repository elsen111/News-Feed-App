import React from "react";
import { Link } from "react-router-dom";

const Card = ({ link, title, pubDate, category, image_url, source_name }) => {
  return (
    <div className="w-full">
      <Link
        to={link}
        target="_blank"
        className="block f-width f-height card-link relative after"
      >
        <img
          src={image_url}
          alt="news"
          loading="lazy"
          className="h-[80%]"
        />
      </Link>

      <div className="content absolute f-width">
        <div className="metadata flex flex-column light-gray pointer flex-start">
          <p className="category uppercased white fw-900 fs-12">{category}</p>
          <h6 className="news-title white fw-900">{title}</h6>

          <div className="fs-12 flex sp-between f-width">
            <span className="publication-date">{pubDate}</span>
            <span className="creater capitalized">
              {source_name || "Unknown"}
            </span>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Card;
