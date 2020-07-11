import React, {Component} from 'react';
import axios from "axios"



class GetSingle extends Component {
    state= {
        ids: [],
        title:"",
        content:"",
        id:""
    };

    getSingleQuestion=()=>{
        axios.get(`http://localhost:3000/api/question/${this.props.match.params.id}`)
            .then(res=>{
                console.log(res.data.data._id);
                this.setState({
                    content:res.data.data.content,
                    title:res.data.data.title,
                    id:res.data.data._id
                });


            }).then(res1=>{

        })
            .catch(err=>{console.log(err.response)})
    };

    updateQuestion=(e)=>{
        e.preventDefault();

        axios.put(`http://localhost:3000/api/question/${this.state.id}/edit`,{
            title:this.state.title,
            content:this.state.content
        }).then(res=>{})
            .then(res1=>{
                this.setState({
                    title:"",
                    content:""
                });
                this.props.history.push(`/profile/${localStorage.userid}`)
            })
            .catch(err=>console.log(err.response))

    };

    deleteQuestion=(e)=>{
        e.preventDefault();

        axios.delete(`http://localhost:3000/api/question/${this.state.id}/delete`)
            .then(res=>{

            })
            .then(res1=>{
                this.props.history.push(`/profile/${localStorage.userid}`)
            })
            .catch(err=>console.log(err))
    };

    onChange=(e)=>{
        this.setState({
        [e.target.name]:e.target.value
        })
    };

    componentDidMount() {
        this.getSingleQuestion()
    }

    render() {
        const {title,content}=this.state;
        return (
            <div className={"container"}>
                <div className={"card"}>
                    <div className={"card-header"}>Question</div>
                    <div className={"card-body"}>
                        <h3>{this.state.title}</h3>
                        <p>{this.state.content}</p>
                    </div>
                    <div className="card-body">
                        <form action="" className={"form-group"} onSubmit={this.updateQuestion}>
                            <label htmlFor="" className={"form title"}>Title</label>
                            <input type="text" className={"form-control"}
                                   value={title}  name={"title"} onChange={this.onChange}
                            />
                            <label htmlFor="" className={"form-group-item"}>Content</label>
                            <textarea value={content} name={"content"} onChange={this.onChange}
                                      type="text" className={"form-control"}/>

                            <button className={"btn btn-danger mt-4"} type={"submit"}>Update</button>
                            <button onClick={this.deleteQuestion} className={"btn btn-danger mt-4 ml-5"} type={"button"}>Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default GetSingle;
