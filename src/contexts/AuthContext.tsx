// import { createContext, useEffect, useState, type PropsWithChildren } from "react";
// import axios from "../api/axios";

// type UserState = {
//   users: User[];
//   currentUser: User | null;
//   actions: {
//     createUser: (user: User) => void;
//     setUser: (user: User | null) => void;
//     logout: () => void;
//   }
// };

// type UserActions = UserState["actions"];

// const AuthContext = createContext<UserState | undefined>(undefined);
// const AuthProvider = ({ children }: PropsWithChildren) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   useEffect(() => {
    
//   }, []);

//   const getUser = () => {
//     const users = User[] = axios.get()
//   }
// }