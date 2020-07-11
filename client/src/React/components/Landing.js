import React, {useState,useEffect} from 'react';
import axios from "axios"
import {Link} from "react-router-dom"




const Landing =(props)=>{

   const [idsState,idsSetState]=useState({
       ids:[],
   });
   const [questionsState,questionsSetState]=useState({
       questions:[],
   });
   const [idState,idSetState]=useState({
       questionId:"",
   });


    const getAllQuestions=()=>{
        axios.get(`http://localhost:3000/api/question`)
            .then(res=>{
                idsSetState({
                    ids:res.data.data
                });
                questionsSetState({
                    questions:res.data.data
                })
            })
            .catch(err=>{
                console.log(err)
            })
    };



    const likeQuestion=()=>{
        axios.get(`http://localhost:3000/api/question/${idState.questionId}/like`)
            .then(res=>{
                //console.log(res.data.data.likes.length);
                this.setState({
                    count:res.data.data.likes.length
                })
            })
    };

    useEffect(()=>{
        getAllQuestions();
    },[]);


        return (
            <div style={{
                backgroundColor: "",
                backgroundImage: `url(${require("../img/question.png")})`,
                backgroundPosition: 'center top',
                backgroundSize: "600px 300px" ,
                backgroundRepeat: 'no-repeat' ,
            }}  id={"home"} className={""}>
                <div style={{paddingTop:"300px"}}>



                    {
                        questionsState.questions.map((question,id)=>{
                            return (
                                <div key={id} className={"banner"}>
                                    <div className={"row"}>
                                        <div className={"col-md-2"}>

                                        </div>
                                        <div  className="col-md-10">
                                            <div className="app-text">
                                                <h1>{question.title}</h1>
                                                <p>{question.content}</p>
                                                <div id={"land-row"} className={"row"}>
                                                    <div className="col-md-3">
                                                        <div >
                                                            <i  className="far fa-thumbs-up"/>10
                                                        </div>
                                                    </div>
                                                    <div style={{color:"#362FD9"}} className="col-md-3">
                                                        <Link style={{textDecoration:"none"}} to={`/answer/${idsState.ids[id]._id}`}>
                                                            <i style={{fontSize:"20px",}} className="far fa-comment"/>    cevapla
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
            </div>
        );
};



export default Landing ;
