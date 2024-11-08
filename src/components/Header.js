import { LOGO_URL } from "../utils/constant";
import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import Cart from "./Cart";
const Header=()=>{
    const[btnNameReact,setBtnNameReact]=useState("login");
    const onlineStatus = useOnlineStatus();
    const {loggedInUser}= useContext(UserContext);
    console.log({loggedInUser});
    const cartItems=useSelector((store)=>store.cart.items);
    return (
        <div className="flex justify-between bg-blue-200 shadow-2xl sm:bg-yellow-200 lg:bg-purple-200">

            <div className="logo-container">
                <img className="w-[100px] p-1"
                src={LOGO_URL}
                />
                </div>
                <div className="flex items-center">
                <div className="nav-items">
                    <ul className="flex p-4 m-4 ">
                        <li className="px-4">
                            online status:{onlineStatus? "✅":"❌"}
                        </li>
                        <li className="px-4"><Link to="/">Home</Link></li>
                        <li className="px-4"><Link to="/About">About Us</Link></li>
                        <li className="px-4"><Link to="/Contact">Contact Us</Link></li>
                        <li className="px-4"><Link to="/Grocery">Grocery</Link></li>
                        <li className="px-4"><Link to="/Cart">🛒({cartItems.length}items)</Link></li>
                        <button
                        className="login"
                        onClick={()=>{
                            btnNameReact=="login"
                            ?setBtnNameReact("logout")
                            :setBtnNameReact("login");
                        }}
                        >{btnNameReact}</button>
                        <li className="px-4 font-bold">{loggedInUser}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Header;