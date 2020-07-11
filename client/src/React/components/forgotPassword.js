import React, {Component} from 'react';
import axios from "axios";


class ForgotPassword extends Component {
    state={
      email:"",
        error:""
    };
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };

    onSubmit=(e)=>{
        e.preventDefault();

        axios.post("http://localhost:3000/api/auth/forgotPassword",{
            email:this.state.email
        }).then(res=>console.log(res))
            .catch(err=>{//console.log(err.response.data.message)
                this.setState({
                    error:err.response.data.message
                })
            })
    };
    render() {
        const {email}=this.state;
        return (
            <div className={"container col-md-4"}>
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className={"h3 mb-3 font-weight-normal"}>forgot password</h1>
                    <div className={"form-group"}>
                        <label htmlFor="email">Email Adress</label>
                        <input type="email"
                               className={"form-control"}
                               name={"email"}
                               placeholder={"Enter email"}
                               value={email}
                               onChange={this.onChange}
                        />
                    </div>

                    <button type={"submit"} className={"btn btn-lg btn-primary btn-block"}>
                        Forgot
                    </button>
                    {
                        this.state.error ? <div className={"alert alert-danger mt-4"}>{this.state.error}</div> : null
                    }

                </form>
            </div>
        );
    }
}

export default ForgotPassword;
