import React from "react";
import Home from "./Components/Home"
import { BrowserRouter as Router, Route} from "react-router-dom" 
import Form from "./Components/Form"


const App = () => {
  return (
    <div className="App">
      <h1>Lambda Eats</h1>
      <Route exact path="/" component={Home} /> {/*don't forget to use exact prop on path prop*/}
      <Route path="/form" component={Form}/>
    </div>
  );
};

export default App;
