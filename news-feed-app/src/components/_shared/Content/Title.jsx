import {useLocation} from "react-router-dom";

const Title = () => {
  const {pathname} = useLocation();
  let title;
  console.log(pathname);

  switch (pathname) {
    case "/categories":
      title="breaking news"
      break;

    case "/categories":
      title="latest news"
      break;

    case "/suggested":
      title="You may want to read"
      break;

    case "/saved":
      title="reading list"
      break;
  
    default:
      title="another title"
      break;
  }

  return (
    <h3 className='text-primary-1 uppercase font-black text-center tracking-[2px] text-[26px] md:text-[35px]'>
      {title}
    </h3>
  )
}

export default Title