import React, {Component} from 'react';
import axios from "axios"

class Register extends Component {
    state={
        name:"",
        email:"",
        role:"",
        password:""
    };
    onChange=(e)=>{
        this.setState({
         [e.target.name]:e.target.value
        })
    };
   register=(newUser,props)=>{
        return axios.post("http://localhost:3000/api/auth/register",{
            name:newUser.name,
            email:newUser.email,
            role:newUser.role,
            password:newUser.password
        })
            .then(res=>{
                //console.log(res)
                props.history.push("/login")
            })
            .catch(err=>{
                if (err){
                    alert("Lütfen bilgilerinizi kontrol ediniz")
                }
            })
    };
    onSubmit=(e)=>{
        e.preventDefault();
        const user={
            name:this.state.name,
            email:this.state.email,
            role:this.state.role,
            password:this.state.password
        } ;

        register(user,this.props)
    };

    render() {
        const {name,email,role,password}=this.state;
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
                                    <h2>Kayıt Ol</h2>
                                    <div className="input-div one">
                                        <div className="i">
                                            <i className="fas fa-user"/>
                                        </div>
                                        <div>

                                            <input value={name} onChange={this.onChange}
                                                   name={"name"}
                                                   placeholder={"Name"}
                                                   className="input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="input-div one">
                                        <div className="i">
                                            <i className="fas fa-user"/>
                                        </div>
                                        <div>

                                            <input value={email} onChange={this.onChange}
                                                   name={"email"}
                                                   placeholder={"E-mail"}
                                                   className="input" type="email"/>
                                        </div>
                                    </div>
                                    <div className="input-div two">
                                        <div className="i">
                                            <i className="fas fa-lock"/>
                                        </div>
                                        <div>
                                            <input value={role} onChange={this.onChange} name={"role"}
                                                   placeholder={"Role"} className="input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="input-div two">
                                        <div className="i">
                                            <i className="fas fa-lock"/>
                                        </div>
                                        <div>
                                            <input value={password} onChange={this.onChange} name={"password"}
                                                   placeholder={"Password"} className="input" type="password"/>
                                        </div>
                                    </div>

                                    <button type={"submit"} className={"btn"}>Kayıt</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
