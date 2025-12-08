const Card = ({
  link,
  title,
  pubDate,
  category,
  image_url,
  source_name,
  onTextHoverStart = () => {},
  onTextHoverEnd = () => {},
  allowClickRef,
}) => {
  const handleCardClick = (event) => {
    if (allowClickRef && !allowClickRef.current && event.detail !== 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full w-full overflow-hidden rounded-[28px] bg-slate-900"
      onClick={handleCardClick}
    >
      <img
        src={image_url}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
      <div
        className="px-4 absolute inset-x-0 bottom-0 flex flex-col gap-2 sm:px-7 pb-2 pt-12 text-white"
        onPointerEnter={onTextHoverStart}
        onPointerLeave={onTextHoverEnd}
      >
        <span className="text-xs font-semibold py-1 px-2 tracking-[2px] text-fuchsia-200 bg-[#147d83] uppercase sm:py-2 sm:px-3 rounded-xl w-fit">
          {category}
        </span>
        <h3 className="text-lg font-bold leading-snug md:text-[1.35rem] truncate">
          {title}
        </h3>
        <div className="flex flex-wrap items-center justify-between text-xs text-[#c7c3c3] tracking-[1.5px]">
          <span>{pubDate}</span>
          <span className="capitalize">{`by ${source_name}` || "Unknown"}</span>
        </div>
      </div>
      <span className="absolute inset-5 rounded-3xl border border-white/20 opacity-0 transition duration-300 group-hover:opacity-100" />
    </a>
  );
};

export default Card;