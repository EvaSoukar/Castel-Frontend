import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { MdOutlineClose } from "react-icons/md";

const Login = () => {
  const { actions, errorMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await actions.login(email, password);
    if(!email && !password) return;
    if (!errorMessage) {
      navigate("/");
    }
  }

  const handleClose = () => {
    navigate(-1);
  }

  return (
    <div onClick={handleClose} className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="relative py-16 min-w-6/12 w-full max-w-11/12 md:max-w-3/5 bg-secondary space-y-4 flex flex-col justify-center items-center shadow-md rounded-lg">
        <button onClick={handleClose} className="absolute top-3 right-3 cursor-pointer"><MdOutlineClose className="w-6 h-6" /></button>
        <h2 className="h3">Welcome back</h2>
        <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
          <Input
            label="Email" 
            type="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/} 
            errorMessage="Please enter a valid email address" 
          />
          <Input 
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          {errorMessage && (
            <div className="text-error text-sm max-w-4/5 px-6">{errorMessage}</div>
          )}
            <button className="primary-btn" type="submit">Login</button>
        </form>
        <p className="text-xs">Don't have an account? <NavLink to="/register" className="text-action underline text-base">SIGN UP</NavLink></p>
      </div>
    </div>
  )
}
export default Login