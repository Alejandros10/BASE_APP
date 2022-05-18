import Context from "./Context";
import { useContext } from "react";
const useAuthContext = () => {
 const user = useContext(Context);
 if (user === undefined) {
 throw new Error("useAuthContext can only be used inside AuthProvider");
 }
 return user;
};