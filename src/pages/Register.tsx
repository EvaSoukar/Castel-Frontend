import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { MdOutlineClose } from "react-icons/md";

const Register = () => {
  const { actions, errorMessage } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState<"guest" | "owner">("guest");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!firstName || !lastName || !email || !phone || !password || !repeatPassword) {
      setErr("Please fill in all required fields.");
      return;
    }

    if (password !== repeatPassword) {
      setErr("Passwords do not match");
      return;
    }
    const user = {
      firstName,
      lastName,
      email,
      phone,
      password,
      image: image || undefined,
      role,
    };

    await actions.register(user);
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
        <h2 className="h3">Sign up to Castel</h2>
        <form className="space-y-6 flex flex-col items-center overflow-y-auto max-h-[70vh]" onSubmit={handleSubmit}>
          <Input
            label="First name" 
            type="text" 
            name="firstName" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            required={true}
          />
          <Input
            label="Last name"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required={true}
          />
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
            label="Phone"
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required={true}
          />
          <Input 
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <Input
            label="Repeat Password"
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required={true}
          />
          <Input
            label="Image URL (optional)"
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <h6 className="h6 text-dark-brown pb-2">Choose your role:</h6>
            <label className="flex items-center space-x-1">
              <input
                className="radio-btn"
                type="radio"
                value="guest"
                checked={role === "guest"}
                onChange={() => setRole("guest")}
              />
              <span>Guest</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                className="radio-btn"
                type="radio"
                value="owner"
                checked={role === "owner"}
                onChange={() => setRole("owner")}
              />
              <span>Owner</span>
            </label>
          </div>
          {(err || errorMessage) && (
            <div className="text-error text-center text-sm max-w-4/5 px-6">{err || errorMessage}</div>
          )}
            <button className="primary-btn" type="submit">Register</button>
        </form>
        <p className="text-xs">Already have an account? <NavLink to="/login" className="text-action underline text-base">Login</NavLink></p>
      </div>
    </div>
  )
}
export default Register