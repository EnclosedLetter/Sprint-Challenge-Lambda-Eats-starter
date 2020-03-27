import React from "react";
import Home from "./Components/Home"
import { BrowserRouter as Router, Route} from "react-router-dom" 


const App = () => {
  return (
    <div className="App">
      <h1>Lambda Eats</h1>
      <Route exact path="/" component={Home} /> {/*don't forget to use exact prop on path prop*/}
    </div>
  );
};

export default App;
