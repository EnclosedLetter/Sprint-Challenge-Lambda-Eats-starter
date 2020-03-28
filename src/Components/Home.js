import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>What toppings do you want?</h1>
            <h2>Choose from the freshest ingredients!</h2>
            <img className="pizzaPic" src="Assets\Pizza.jpg"  alt="img of a pizza" /> {/*why isn't this displaying?*/}
            <h3>CLICK HERE TO ORDER YOUR LAMBDA PIZZA!</h3>
            <Link className="formLink" to={"/form"}> {/*add where are we going to once the /form link is triggered. To our Route which has our set path="./form" and the compononet prop component={Form} which will choose what the website will display. */}
                <div className="startOrder">START PIZZA ORDER</div>
            </Link>
        </div>
    )
}

export default Home;