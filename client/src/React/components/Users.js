import React, {Component} from 'react';
import axios from "axios";




class Users extends Component {
    state={
        users:[]
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
    getSingleUser=()=>{
        axios.get("http://localhost:3000/api/user/5ebbaee2deee8120c830da09")
            .then(res=>{
            })
    };

    componentDidMount() {
        this.getAllUsers()
    }


    render() {
        return (
            <div className={"container"}>
                <button onClick={this.getAllUsers} className={"btn btn-primary"}>All Users</button>
                <button onClick={this.getSingleUser} className={"btn btn-primary"}>single Users</button>
                <table className={"table"}>
                    <thead>
                    {
                        this.state.users.map((user,id)=>{
                            return (
                                <tr key={id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                                )

                        })
                    }

                    </thead>

                </table>

            </div>
        );
    }
}

export default Users;
