import Logo from "../Logo";
import FooterNav from "./FooterNav";
import Subscription from "./Subscription";
import Socials from "./Socials";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className='border-t border-(--border) relative top-[60px]'>
        <div className='flex flex-col gap-[30px] w-[95%] min-w-auto xl:w-[93%] xl:min-w-[1140px] mx-auto py-[35px] sm:py-[50px] text-(--text-primary)'>
            <div className="flex flex-col gap-y-5 justify-between items-center flex-wrap sm:flex-row">
                <Logo parentComponent="Footer" />
                <FooterNav />
                <Subscription />
            </div>
            <Socials />
            <Copyright />
        </div>
    </footer>
  )
}
