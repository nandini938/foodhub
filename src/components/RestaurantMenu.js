import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { IMAGE_ID } from "../utils/constant";
import useRestaurantMenu from "../utils/useResturantMenu";
import ResturantCard from "./RestaurantCard";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(null);
    if (resInfo == null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } =
        resInfo?.cards[2]?.card?.card?.info || {};

    const itemCards =
        resInfo?.cards[4]?.groupedCard?.cardGroupMap.REGULAR?.cards[1]?.card?.card || [];
        console.log("Categories1:", resInfo?.cards[4]?.groupedCard?.cardGroupMap.REGULAR) ;
        const Categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap.REGULAR?.cards.filter(
            (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];
        
console.log("Categories:",Categories) ;
console.log("Number of Categories:", Categories.length);
    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            {Categories.map((category,index)=>(
                <RestaurantCategory 
                key={category?.card?.card.title} 
                data={category?.card?.card}
                showItems={index === showIndex}  
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)} 
                />
             ))
            }
        </div>
    );
};

export default RestaurantMenu;
