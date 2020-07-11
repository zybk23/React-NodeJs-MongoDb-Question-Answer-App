import React, {Component} from 'react';
import axios from "axios";



class Admin extends Component {
    state={
        users:[],
        id:""
    };

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };

    getAllUsers=()=>{
        axios.get("http://localhost:3000/api/user")
            .then(res=>{
                const data=res.data.data;
                this.setState({
                    users:data
                })
            })
    };
    Bloked=()=>{
        axios.get(`http://localhost:3000/api/admin/block/${this.state.id}`)
            .then(res=>{
                //console.log(res)
            })
            .catch(err=>console.log(err))
    };
    Delete=()=>{
        axios.delete(`http://localhost:3000/api/admin/delete/${this.state.id}`)
            .then(res=>{
            //    console.log(res)
            })
            .catch(err=>console.log(err))
    };
    render() {
        return (
            <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <div className={"card"}>
                                <div style={{width:"100%"}} className={"card-header d-flex justify-content-between"}>
                                    <p>
                                        All Users
                                    </p>
                                    <button onClick={this.getAllUsers} className={"btn btn-primary"}>Get All users</button>
                                </div>
                                <div className={"card-body"}>
                                    <table className={"table"}>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>İd</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map((user,id)=>{
                                                return (
                                                    <tr style={{fontSize:"12px"}} key={id}>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role}</td>
                                                        <td>{user._id}</td>

                                                    </tr>
                                                )

                                            })
                                        }

                                        </tbody>

                                    </table>

                                </div>
                            </div>

                        </div>
                        <div className={"col-md-6"}>
                            <div className={"card"}>
                                <div className={"card-header d-flex justify-content-between"}>
                                    <p>Which user do you want to block</p>
                                    <button onClick={this.Bloked} className={"btn btn-danger"}>Block</button>
                                    <button onClick={this.Delete} className={"btn btn-danger"}>Delete</button>
                                </div>
                                <div className={"card-body"}>
                                    <p>Please enter id that you want to blocked</p>
                                    <input type="text" className={"form-control"} name={"id"}
                                           value={this.state.id} onChange={this.onChange}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
            </div>
        );
    }
}

export default Admin;
