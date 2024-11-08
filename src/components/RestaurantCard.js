import { CDN_URL } from "../utils/constant";
const ResturantCard =(props)=>
{
    const{resData}=props;
    const{
        cloudinaryImageId,
        name,
        avgRating,
        costForTwo,
        deliveryTime,
        cuisines,
        sla,
    }=resData?.info;
    return(
        <div className="m-4 p-4 w-[200px] bg-gray-300 hover:bg-gray-400" >
            <img
            className="rounded-sm"
            alt="res-logo"
            src={CDN_URL+cloudinaryImageId}
            />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{avgRating}stars</h4>
            <h4>{costForTwo}</h4>
            <h5>{cuisines.join(", ")}</h5>
            <h4>{sla?.slaString}</h4>
        </div>
    );
};
export const withPromotedLabel=(ResturantCard)=>{
    return(props)=>{
       return(
           <div>
            <label className="absolute bg-green-300 text-white m-2 p-2 rounded-lg">Veg</label>
            <ResturantCard {...props} />
           </div>
       );
    };
};
export default ResturantCard;