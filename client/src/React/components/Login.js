import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {getId} from "../../Redux/actions/getIdAction";
import {connect} from "react-redux"
import {bindActionCreators} from "redux";


class Login extends Component {
    state={
        email:"",
        password:"",
        role:"",
        err:"",
        id:"",
    };

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };

    Login=(user)=>{
        axios.post("http://localhost:3000/api/auth/login",{
            email:user.email,
            password:user.password
        })
            .then(res=>{
                this.setState({
                    id:res.data.data.id
                });
                localStorage.setItem("usertoken",res.data.access_token);
                return res.data.access_token
            })
            .then(res1=>{
                if(res1){
                    localStorage.setItem("userid",this.state.id);
                    this.props.get_id(this.state.id);
                    this.props.history.push("/")
                }
            })
            .catch(err=>{
                if(err){
                    alert("Bilgilerinizi Kontrol ediniz")
                }
                this.setState({
                    err:err.response.data.message
                })
            })
    };




    onSubmit=(e)=>{
        e.preventDefault();

        const user={
            email:this.state.email,
            password:this.state.password
        };

        this.Login(user)

    };


    render() {
        const {email,password}=this.state;
        return (
            <div id={"register"}>
                <img className="wave" src="images/—Pngtree—red wine water spray splash_3032537.png" alt=""/>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 first">
                            <div className="img">
                                <img src="images/mobile.svg" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-6 second">
                            <div className="login-container">
                                <form noValidate onSubmit={this.onSubmit}>
                                    <img className="avatar" src="images/avatar.svg" alt=""/>
                                    <h2>Giriş Yap</h2>
                                    <div className="input-div one">
                                        <div className="i">
                                            <i className="fas fa-user"/>
                                        </div>
                                        <div>
                                            <input value={email} onChange={this.onChange} name={"email"}
                                                   placeholder={"username"}
                                                   className="input" type="email"/>
                                        </div>
                                    </div>
                                    <div className="input-div two">
                                        <div className="i">
                                            <i className="fas fa-lock"/>
                                        </div>
                                        <div>
                                            <input value={password} onChange={this.onChange} name={"password"}
                                                   placeholder={"password"}
                                                   className="input" type="password"/>
                                        </div>
                                    </div>
                                    <Link to={"/forgot"}>Forgot Password?</Link>
                                    <input type="submit" className="btn" value="Giriş"/>
                                    <Link id={"kaydol"} style={{fontSize:"20px",marginRight:"145px"}} to={"/register"}>
                                       <span>Kaydol</span>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        id:state.idReducer
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_id:bindActionCreators(getId,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login) ;
