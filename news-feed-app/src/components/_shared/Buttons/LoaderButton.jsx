const LoaderButton = () => {
  return (
    <button
      onClick={() => console.log("button clicked")}
      className="h-9 w-[180px] text-[14px] sm:w-[200px] sm:h-11 bg-[#617a84] mt-2 text-center uppercase sm:text-[16px] font-normal text-amber-50 cursor-pointer tracking-[0.5px] rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_7px_10px_-2px_#000] active:translate-y-1 active:shadow-none"
    >
      load more
    </button>
  );
};

export default LoaderButton;