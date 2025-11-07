import { NavLink } from "react-router-dom"
import Logo from "/Logo.svg";
import { MdOutlineLocationOn, MdOutlineMail, MdOutlinePhoneInTalk } from "react-icons/md";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="w-full h-32 px-3 mt-16 md:px-8 lg:px-16 flex justify-between items-center border-t-2 border-grey/20">
      <div className="flex flex-col items-center">
        <NavLink className="" to="/"><img className="max-h-10 max-w-32" src={Logo} alt="Castel Logo" /></NavLink>
        <ul className="flex gap-3">
          <li><FiFacebook /></li>
          <li><FiInstagram /></li>
          <li><FaXTwitter /></li>
          <li><SlSocialLinkedin /></li>
        </ul>
      </div>
        <div>
          <h6 className="h6">Contact us</h6>
          <ul>
            <li className="flex items-center gap-2">
              <MdOutlinePhoneInTalk />
              000 000 000 00
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineMail />
              castel@email.com
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineLocationOn />
              Stockholm, Sweden
            </li>
          </ul>
        </div>
    </footer>
  )
}
export default Footer