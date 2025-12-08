const Subscription = () => {
  return (
    <div className="flex justify-center sm:justify-end items-center order-2 xl:order-3 w-[90%] sm:w-[50%] xl:w-auto h-[30px]">
      <input
        type="email"
        name="search-box"
        className=" border border-[#ccc] w-[216px] h-full placeholder:text-primary-1 bg-white rounded-l-md py-[5px] px-2.5 transition-all duration-300 text-[16px] text-primary-1 focus:shadow-[0_4px_15px_-5px_#000]"
        placeholder="Your Email"
      />
      <button className="bg-[#da4747] py-[7px] px-2.5 rounded-r-md h-full text-white flex justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-[0_4px_15px_-5px_#000] hover:bg-white hover:text-[#da4747] active:text-white">
        Subscribe
      </button>
    </div>
  );
};

export default Subscription;
