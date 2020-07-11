import React from 'react';
import './App.css';
import { Route} from "react-router-dom"

import Navbar from "./React/Navi/Nav";
import Landing from "./React/components/Landing";
import Login from "./React/components/Login";
import Register from "./React/components/Register";
import Profile from "./React/components/Profile";
import ForgotPassword from "./React/components/forgotPassword";
import GetSingle from "./React/components/GetSingle";
import Answer from "./React/components/Answer";
import SingleAnswer from "./React/components/SingleAnswer";



function App() {
    return (

            <div style={{fontFamily:"monospace" ,backgroundColor:"#E5E4E5",height:"10vh"}}>
                <Navbar/>
                <div  >
                    <Route exact path={"/"} component={Landing}/>
                    <Route path={"/register"} exact component={Register}/>
                    <Route path={"/login"} exact component={Login}/>
                    <Route path={"/profile/:userid"} exact component={Profile}/>
                    <Route path={"/forgot"} exact component={ForgotPassword}/>
                    <Route path={"/get/:id"} exact component={GetSingle}/>
                    <Route path={"/answer/:id"} exact component={Answer}/>
                    <Route path={"/singleanswer/:id"} exact component={SingleAnswer}/>
                </div>

            </div>

    );
}

export default App;
