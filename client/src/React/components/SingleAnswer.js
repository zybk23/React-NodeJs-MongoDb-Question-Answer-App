import React,{useState,useEffect} from 'react';
import axios from "axios";


const SingleAnswer = (props) => {
    const[answer,setAnswer]=useState({answer:""});

    const getSingleAnswer=()=>{
        axios.get(`http://localhost:3000/api/question/${localStorage.answerId}/answers/${props.match.params.id}`)
            .then(res=>{
                //console.log(res.data)
                setAnswer({
                    answer:res.data.data.content
                })
            })
    };

    const onChange=(e)=>{
        setAnswer({
            answer:e.target.value
        })
    };
    const updateAnswer=(e)=>{
        e.preventDefault();
        if(localStorage.userid){
            axios.put(`http://localhost:3000/api/question/${localStorage.answerId}/answers/${props.match.params.id}/edit`,{
                content:answer.answer
            }).then(res=>{
                props.history.push(`/answer/${localStorage.answerId}`)
            }).catch(err=>
                alert(`${err.response.data.message}`)
            )
        }
        else{
            alert("Kayıt Ol")
        }

    };
    const deleteAnswer=()=>{
        if(localStorage.userid){
            axios.delete(`http://localhost:3000/api/question/${localStorage.answerId}/answers/${props.match.params.id}/delete`)
                .then(res=>{
                console.log(res)
            }).then(res1=>{
                    props.history.push(`/answer/${localStorage.answerId}`)
                }).catch(err=>{
                    //console.log(err.response.data);
                    alert(`${err.response.data.message}`)
                })
        }
        else{
            alert("Kayıt Ol")
        }
    };

    useEffect(()=>{
        getSingleAnswer()
    },[]);
    return (
        <div className={"container"}>
            <div className={"card"}>
                <div className={"card-header"}>Question</div>
                <div className={"card-body"}>
                    <p>{answer.answer}</p>
                </div>
                <div className="card-body">
                    <form action="" className={"form-group"} onSubmit={updateAnswer}>
                        <label htmlFor="" className={"form-group-item"}>Content</label>
                        <textarea value={answer.answer} name={"content"} onChange={onChange}
                                  type="text" className={"form-control"}/>

                        <button className={"btn btn-danger mt-4"} type={"submit"}>Update</button>
                        <button onClick={deleteAnswer} className={"btn btn-danger mt-4 ml-5"} type={"button"}>Delete</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SingleAnswer;
