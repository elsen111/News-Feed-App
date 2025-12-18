const LoaderButton = ({ onLoadNews, loading }) => {
  return (
    <button
      onClick={onLoadNews}
      className="flex items-center justify-center h-9 w-[180px] text-[14px] sm:w-[200px] sm:h-11 bg-[#617a84] mt-2 text-center uppercase sm:text-[16px] font-normal text-amber-50 cursor-pointer tracking-[0.5px] rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_7px_10px_-2px_#000] active:translate-y-1 active:shadow-none"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="flex w-5 h-5 animate-spin rounded-full border-4 border-t-[#a3bcca] border-r-[#a8d4e4] border-b-[#a0d4e3] border-l-[#b0cfdb] bg-transparent"></span>
          loading
        </span>
      ) : (
        <span> load more </span>
      )}
    </button>
  );
};

export default LoaderButton;
