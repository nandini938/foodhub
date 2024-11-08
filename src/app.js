import React,{lazy,Suspense, useEffect, useState}from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import ResturantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import appStore from "./utils/appStore";
const Grocery=lazy(()=>import("./components/Grocery"));
import UserContext from "./utils/UserContext";
const AppLayout=()=>{
    const [userName,setUserName]=useState("Nandini Dixit");
    useEffect(()=>{
    const data={
    name:"Nandini Dixit",
    };
     setUserName(data.name);
},[]);
    return(
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser: userName,setUserName}}>
        <div className="app">
        <Header/>
        <Outlet/>
        </div>
        </UserContext.Provider>
        </Provider> 
    );
};
const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout />,
        children:[
            {
                path:"/",
                element:<Body />,
            },
            {

                path:"/About",
                element: <About />,
            },
            {
                path:"/Contact",
                element: <Contact />,
            },
            {
                path:"/restaurants/:resId",
                element: <ResturantMenu />,
            },
            {
                path:"/Grocery",
                element:<Suspense fallback={<h1>Loading...</h1>} ><Grocery /></Suspense>,
            },
            {

                path:"/Cart",
                element: <Cart />,
            },
        ],
        errorElement: <Error />,
    },
]);
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router ={appRouter} />);
