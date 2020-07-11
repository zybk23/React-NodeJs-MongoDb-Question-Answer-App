import React, {Component} from 'react';
import axios from "axios"
import {Link} from "react-router-dom"




class Profile extends Component {
    state={
        image:"",
        title:"",
        content:"",
        post:[],
        questions:[],
        ids:[],
        name:""
    };
    onFileChange=(e)=>{
        this.setState({
            image:e.target.files[0]
        })
    };
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    onSubmitProfile=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('profile_image', this.state.image);

        axios.post("http://localhost:3000/api/auth/upload",formData,{
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            const data=res.data.data;
            this.setState({
                post:data
            })
        })
    };
    getAllQuestions=()=>{
        axios.get(`http://localhost:3000/api/question`)
            .then(res=>{
                //console.log(res.data.data)
                this.setState({
                    ids:res.data.data
                });
                this.setState({
                    questions:res.data.data
                })
            })
            .catch(err=>{
                console.log(err)
            })
    };

    onSubmitQuestion=(e)=>{
        e.preventDefault();

        axios.post("http://localhost:3000/api/question/ask",{
            title:this.state.title,
            content:this.state.content
        }).then(res=>{
            window.location.reload();
        })

            .catch(err=>console.log(err.response))
    };



    componentDidMount() {
        this.getAllQuestions()
    }

    render() {
        const{title,content}=this.state;
        const userId=this.props.match.params.userid;
        const userQuestion=this.state.questions.filter(question=>
        {
            return question.user._id ===userId
        });
        return (
            <div  className={"container mt-5"}>
                <div className={"row"}>
                    <div className={"col-md-8"}>

                        <form action="" className={"form-group"} onSubmit={this.onSubmitQuestion}>
                            <label htmlFor="" className={"form title"}>Title</label>
                            <input type="text" className={"form-control"}
                                    value={title}  name={"title"} onChange={this.onChange}
                            />
                            <label htmlFor="" className={"form-group-item"}>Content</label>
                            <textarea value={content} name={"content"} onChange={this.onChange}
                                type="text" className={"form-control"}/>

                            <button className={"btn btn-success mt-4"} type={"submit"}>ASK</button>

                        </form>
                        <div>
                        </div>
                        <div className={"card"}>
                            <div className="card-header">Your Questions</div>
                            {
                                userQuestion.map((question,id)=>{
                                    return (
                                        <Link style={{textDecoration:"none"}} to={`/get/${userQuestion[id]._id}`}  key={id} className="card-body">
                                            <h3 style={{color:"#362FD9"}}> {question.title}</h3>
                                            <p style={{color:"#242536"}}>{question.content}</p>
                                            <div>
                                                <i  className="far fa-thumbs-up"/>10
                                            </div>
                                        </Link>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className={"col-md-4"}>
                        <label htmlFor="" style={{marginLeft:"180px"}}>Your Profile</label>
                        <div className={"row"}>
                            <div  className="col-md-8">
                                <div style={{marginLeft:"40px"}}>
                                    {this.state.post.name}
                                </div>

                            </div>
                            <div className="col-md-4">
                                <form action="" className={"form-group"} onSubmit={this.onSubmitProfile}>
                                    <div className="row">
                                        <div style={{border:"1px solid black",marginLeft:"-20px"}} className="col-md-6">
                                        </div>
                                        <div className="col-md-6">
                                            <input type="file" name={"file"}  onChange={this.onFileChange}/>
                                            <button type={"submit"} className={"btn btn-danger"}>yükle</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>

                <div >
                </div>

            </div>
        );
    }
}



export default Profile ;
