import ResturantCard,{withPromotedLabel} from "./RestaurantCard";
import resList from "../utils/mockData";
import {useEffect, useState,useContext} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
const Body=()=>{
    const[listOfResturants,setListOfResturants]=useState([]);
    const[searchText,setsearchText]=useState("");
    const[filteredRestraunt,setfilteredResturant]=useState([]);
    const ResturantCardPromoted=withPromotedLabel(ResturantCard);
    useEffect(()=>{fetchData()},[]);
    const fetchData=async()=>{
        const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json=await data.json();
        console.log(json);
        setListOfResturants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        setfilteredResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };
    const onlineStatus=useOnlineStatus();
    if(onlineStatus==false)return(
        <h1>LOOK LIKE YOU'RE OFFLINE!! PLEASE CHECK YOUR INTERNET CONNECTION</h1>
    );
    const{loggedInUser,setUserName}=useContext(UserContext);
    return listOfResturants.length==0?
    (
        <Shimmer/>
    ):(
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4" >
                <input 
                type="text"
                className="border border-solid border-black"
                value={searchText}
                onChange={(e)=>{
                    setsearchText(e.target.value);
                }}
                />
                <button className=" bg-gray-300 px-2 py-1 m-4 rounded-md"
                onClick={()=>{
                    const filteredRestraunt=listOfResturants.filter(
                    (res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase())
                    );
                    setfilteredResturant(filteredRestraunt);
                }}
                >
                 search
                </button>
                </div>
                <div  className="search m-4 p-4 flex items-center">
                <button className="filter-btn bg-gray-300 px-2 py-1 m-4 "
                onClick={()=>{
                    const filteredList=listOfResturants.filter(
                        (res)=>res.info.avgRating>4
                    );
                    setListOfResturants(filteredList);
                }

                }>
                    Top Rated Restaurant
                </button>
                </div>
                <div  className="search m-4 p-4 flex items-center">
                    <label>userName : </label>
                    <input 
                    className="border border-black p-2"
                    value={loggedInUser}
                onChange={(e)=>setUserName(e.target.value)}
                />
                </div>
            </div>
            <div className="flex flex-wrap">
                {filteredRestraunt.map((restaurant)=>(
                    <Link
                     key={restaurant.info.id}
                     to={"/restaurants/" + restaurant.info.id}
                     >
                        {restaurant.info.veg !== undefined && restaurant.info.veg ? (
                        <ResturantCardPromoted resData ={restaurant}/>
                    ):(
                    < ResturantCard resData ={restaurant}/>
                    )}
                    </Link>

                ))}
            </div>
        </div>                         
    );
};
export default Body;