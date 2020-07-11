import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom"
import img from "../img/flowers.png"


class Nav extends Component {
    state={
        admin:"",
        exist:"a"
    };

    logout=(props)=>{
        return axios.get("http://localhost:3000/api/auth/logout")
            .then(res=>{
                localStorage.removeItem("usertoken");
                localStorage.removeItem("userid");
                localStorage.removeItem("answerId");
                props.history.push("/")
            })

    };

    render() {
        const loginRegLink=(
            <ul style={{fontSize:"22px",marginRight:"30px"}} >
                <li >
                    <Link to={"/login"} className={"signUp-btn"}><span>Giriş Yap</span></Link>
                </li>

            </ul>
        );
        const userLink=(
            <ul style={{marginLeft:"600px",}} >
                <li >
                    <Link style={{color:"#42455A"}} to={`/profile/${localStorage.userid}`}>Profile</Link>
                </li>
                <li >
                    <Link style={{color:"#42455A"}} onClick={()=>{this.logout(this.props)}} to={"/logout"} >
                        Logout</Link>
                </li>
            </ul>
        );

        return (
            <div style={{backgroundColor:"#ADC6C4"}} >
                <div className={"menu"} >
                    <ul className={"mr-auto"}>
                        <li className={"logo"}><img src={img} alt=""/></li>
                        <li className={"active"} >
                            <Link style={{color:"#42455A"}} to={"/"} >Anasayfa</Link>
                        </li>

                    </ul>
                    {localStorage.usertoken ?   userLink :loginRegLink}
                </div>

            </div>


        );
    }
}


export default withRouter(Nav) ;
