import React from "react";
import react from "react";
class UserClass extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            count:0,
            userInfo:{
                name:"dummy",
                location:"default",
                avatar_url:"https://www.bing.com/images/search?view=detailV2&ccid=Uf1aFUW1&id=BE7D4EF0FDC1BCB31A32A856428DC41662B65DA3&thid=OIP.Uf1aFUW1Y1mqy7SGnBo6BwHaGV&mediaurl=https%3a%2f%2fthumbs.dreamstime.com%2fz%2fpage-not-found-error-hand-drawn-vector-layout-template-broken-robot-your-website-projects-76842565.jpg&exph=1370&expw=1600&q=image+not+fount+image&simid=608024377664213695&FORM=IRPRST&ck=332F0AD4F1CE2B5DF1E840C715590FAF&selectedIndex=3&itb=0",
            }
        }
    }
    async componentDidMount()
    {
        const data= await fetch("https://api.github.com/users/nandini938");
        const json= await data.json();
        this.setState({
            userInfo:json,
        });
    }
    render(){
        const{name,location,avatar_url}=this.state.userInfo;
        const{contact}=this.props;
        const{count,count2}=this.state;
        return(
            <div className="user-card">
                 <h1>count:{count}</h1>
                 <button
                 onClick={()=>{
                    this.setState({
                       count:this.state.count+1,
                    });
                }}
                >
                    button increases
                </button>
                <img src={avatar_url}/>
                <h2>Name:{name}</h2>
                <h3>Location:{location}</h3>
                <h4>Contact:{contact}</h4>
            </div>
        );
    }
}
export default UserClass;