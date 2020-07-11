import React,{useEffect,useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


const Answer = (props) => {
    localStorage.setItem("answerId",props.match.params.id);

    const [contentState,setContent]=useState({content:""});
    const[titleState,setTitle]=useState({title:""});
    const [answerState,setAnswer]=useState({answer:""});
    const[allAnswerState,setAllAnswer]=useState({allAnswer:[]});


    const onChange=(e)=>{
        setAnswer({
            answer:e.target.value
        })
    };

    const getSingleQuestion=()=>{
        axios.get(`http://localhost:3000/api/question/${props.match.params.id}`)
            .then(res=>{
                setContent({
                    content:res.data.data.content
                });
                setTitle({
                    title:res.data.data.title
                })
            }).then(res1=>{
                getAllAnswers()
        })
            .catch(err=>{console.log(err.response)})
    };

    const addAnswers=(e)=>{
        e.preventDefault();
        if(localStorage.userid){
            axios.post(`http://localhost:3000/api/question/${props.match.params.id}/answers`,{
                content:answerState.answer
            }).then(res=>{
                window.location.reload()
            })
        }
        else{
            alert("Cevap vermek için kayıt ol")
        }

    };
    //console.log(window.location.reload())

    const getAllAnswers=()=>{
        axios.get(`http://localhost:3000/api/question/${props.match.params.id}/answers/take`)
            .then(res=>{
                //console.log(res.data.data)
                setAllAnswer({
                    allAnswer:res.data.data
                });
            }).then(res1=>{

        })
    };



    useEffect(()=>{
        getSingleQuestion()
    },[]);

    //${answerId.id[index]._id}

    return (
        <div className={"container"}>
            <div className={"card"}>
                <div className={"card-header"}>Question</div>
                <div className={"card-body"}>
                    <h3>{titleState.title}</h3>
                    <p>{contentState.content}</p>
                </div>
                <div className="card-body">
                    <form action="" className={"form-group"} onSubmit={addAnswers}>
                        <label htmlFor="" className={"form-group-item"}>Content</label>
                        <textarea  name={"content"} onChange={onChange}
                                  type="text" className={"form-control"}/>

                        <button className={"btn btn-danger mt-4"} type={"submit"}>Answer</button>
                    </form>
                </div>
                <div className="card-header">Answers</div>
                {
                    allAnswerState.allAnswer.map((answer,index)=>{
                        return (
                            <Link style={{color:"#212529",textDecoration:"none"}}  key={index}  to={`/singleanswer/${allAnswerState.allAnswer[index]._id}`}>
                                <div className="card-body">
                                    <p>{answer.content}</p>
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    )
};

export default Answer;
