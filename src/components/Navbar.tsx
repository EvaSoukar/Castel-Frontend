import { NavLink } from "react-router-dom";
import LogoSmall from "/Logo-small.svg";
import Logo from "/Logo.svg";
import { MdOutlineClose, MdOutlineMenu, MdSearch } from "react-icons/md";
import { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, actions } = useAuth(); 
  
  return (
    <nav className="flex justify-between items-center px-4 md:px-8 lg:px-12 h-16 text-dark-brown shadow-md">
      <NavLink className="md:hidden" to="/"><img className="max-h-12" src={LogoSmall} alt="Castel Logo" /></NavLink>
      <NavLink className="hidden md:block" to="/"><img className="max-h-16 pt-4" src={Logo} alt="Castel Logo" /></NavLink>
      <div className="flex gap-3.5 md:hidden">
        <NavLink to="/"><MdSearch className="w-6 h-5" /></NavLink>
        <button className="cursor-pointer" onClick={toggleMenu}><MdOutlineMenu className="w-6 h-5" /></button>
      </div>
      <div className="hidden md:flex gap-8 items-baseline-last">
        <NavLink className={({ isActive }) => `hover:text-primary hover:font-semibold ${isActive ? "text-primary font-semibold" : ""}`} to="/">Home</NavLink>
        <NavLink className={({ isActive }) => `hover:text-primary hover:font-semibold ${isActive ? "text-primary font-semibold" : ""}`} to="/castles">Castles</NavLink>
        {user && (user.role === "admin" || user.role === "owner") && (
          <NavLink className={({ isActive }) => `hover:text-primary hover:font-semibold ${isActive ? "text-primary font-semibold" : ""}`} to="/create-castle">Create castle</NavLink>
        )}
        {user ? (
          <div className="flex gap-4 items-center">
            <span className="text-sm">Hi, <span className="text-action underline capitalize">{user.firstName}</span></span>
            <button onClick={actions.logout} className="outline-btn px-2 py-0">Logout</button>
          </div>
        ) : (
          <NavLink className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-primary hover:font-semibold ${isActive ? "text-primary font-semibold" : ""}`} to="/login">
            <HiOutlineUserCircle className="w-6 h-5" />
            <span>Login / Sign Up</span>
          </NavLink>
        )}
      </div>
      {isOpen && (
        <div className="absolute bg-secondary text-secondary p-4 left-0 top-16 flex flex-col gap-4 w-full">
          <div className="flex justify-between text-dark-brown pb-4">
            <h4 className="text-3xl font-display font-bold">Menu</h4>
            <button className="cursor-pointer" onClick={toggleMenu}><MdOutlineClose className="w-6 h-5" /></button>
          </div>
          <NavLink onClick={toggleMenu} className={({ isActive }) => `bg-primary p-3 rounded-xl hover:text-action hover:font-semibold ${isActive ? "text-action font-semibold" : ""}`} to="/">Home</NavLink>
          <NavLink onClick={toggleMenu} className={({ isActive }) => `bg-primary p-3 rounded-xl hover:text-action hover:font-semibold ${isActive ? "text-action font-semibold" : ""}`} to="/castles">Castles</NavLink>
          {user && (user.role === "admin" || user.role === "owner") && (
            <NavLink onClick={toggleMenu} className={({ isActive }) => `bg-primary p-3 rounded-xl hover:text-action hover:font-semibold ${isActive ? "text-action font-semibold" : ""}`} to="/create-castle">Create castle</NavLink>
          )}
          {user ? (
            <div className="flex justify-between items-center">
              <span className="bg-primary p-3 rounded-xl">Hi, <span className="text-action underline capitalize">{user.firstName}</span></span>
              <button onClick={() => {actions.logout(); toggleMenu()}} className="outline-btn px-2 py-0">Logout</button>
            </div>
          ) : (
            <NavLink onClick={toggleMenu} className={({ isActive }) => `bg-primary p-3 rounded-xl hover:text-action hover:font-semibold ${isActive ? "text-action font-semibold" : ""}`} to="/login">Login / Sign Up</NavLink>
          )}
        </div>
      )}
    </nav>
  )
}
export default Navbar;