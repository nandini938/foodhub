
import UserContext from '../utils/UserContext';
import UserClass from './UserClass';
import UserContext from '../utils/UserContext';
const About=()=>{
    return (
        <div>
            <div>
             loggedInUser:
             <UserContext.Consumer>
                {({loggedInUser})=>(
                <h1>{loggedInUser}</h1>
            )}
             </UserContext.Consumer>
            </div>
            <h1>About</h1>
            <UserClass name={"Nandini Dixit"} location={"Kanpur"} contact={"nandinidixit830@gmail.com"}/>
        </div>
    );
};
export default About;