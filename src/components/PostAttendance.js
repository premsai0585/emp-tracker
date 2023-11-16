import axiosInstance from "../api/axiosInstance";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../assets/styles/postattendance.css'
import moment from "moment";

export default function PostAttendance(){
    const [attendaces, setAttendances] = useState({});
    const [reRender, setReRender] = useState(0);
    const [weekday, setWeekday] = useState(false);
    const postInAttendance = (empID)=>{
        axiosInstance.post('/post/in/atnd', {empID}).then((res)=>{
            if (res.data.success){
                let atndObj = {...attendaces};
                atndObj[empID].inTime = res.data.inTime;
                setAttendances(atndObj);
            } else {
                setReRender(reRender + 1);
            }
        }).catch((error)=>{
            setReRender(reRender + 1);
        });
    } 
    const postOutAttendance = (empID)=>{
        axiosInstance.post('/post/out/atnd', {empID}).then((res)=>{
            if (res.data.success){
                let atndObj = {...attendaces};
                atndObj[empID].endTime = res.data.endTime;
                setAttendances(atndObj);
            } else {
                setReRender(reRender + 1);
                alert("Nope")
            }
        }).catch((error)=>{
            setReRender(reRender + 1);
        });
    }
    useEffect(()=>{
        if (parseInt(moment().format('d')) !== 0 && parseInt(moment().format('d')) !== 6){
            setWeekday(true);
            var todaysAttendance = [];
            var employees = [];
            var atndObj = {};
            axiosInstance.get('/get/todays/atnd').then((res)=>{
                todaysAttendance = res.data.todaysAttendance;
                axiosInstance.get('/get/emps').then((res)=>{
                    employees = res.data.employees;
                    employees.forEach((employee) => {
                        atndObj[employee.empID] = {name: employee.empName,inTime: null, endTime: null};
                    })
                    todaysAttendance.forEach((atnd)=>{
                        atndObj[atnd.empID].inTime = atnd.inTime;
                        atndObj[atnd.empID].endTime = atnd.endTime;
                    })
                    setAttendances(atndObj);
                }).catch((error)=>{
                    alert("Could not fetch employees list. Please try again.")
                })
            }).catch((error)=>{
                alert("Could not fetch today's attendance. Please try again.")
            })
        }
    }, [reRender])
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            { weekday && 
            <div className="container flex-grow-1 d-flex align-items-stretch justify-content-center flex-column my-3">
                <h3 className="text-center my-3">Post Attendance!</h3>
                <div className="post-atnd-wrapper px-4 py-2">
                    {attendaces && Object.entries(attendaces).map(([empID, empObj], index)=>{ return(
                        <div key={index} className="row text-center post-atnd-row">
                            <div className="col-md-3 col-6">
                                {empID}
                            </div>
                            <div className="col-md-3 col-6">
                                {empObj.name}
                            </div>
                            {empObj.inTime && 
                                <div className="col-md-3 col-6"><span className="text-success">In:</span> {moment(empObj.inTime).format('HH:mm:ss')}</div>
                            }
                            {!empObj.inTime && 
                                <div className="col-md-3 col-6"><button className="btn btn-success" onClick={()=>{postInAttendance(empID)}}>Check In</button></div>
                            }
                            {empObj.endTime && 
                                <div className="col-md-3 col-6"><span className="text-danger">Out:</span> {moment(empObj.endTime).format('HH:mm:ss')}</div>
                            }
                            {empObj.inTime && !empObj.endTime && 
                                <div className="col-md-3 col-6"><button className="btn btn-danger" onClick={()=>{postOutAttendance(empID)}}>Check Out</button></div>
                            }
                            {!empObj.inTime && !empObj.endTime && 
                                <div className="col-md-3 col-6 text-warning">Has not come</div>
                            }
                        </div>
                    )
                    })}
                </div>
            </div>
             }
             { !weekday &&  
                <div className="container flex-grow-1 d-flex align-items-stretch justify-content-center flex-column my-3">
                <h3 className="text-center my-3">Not a working day!</h3>
                </div>
             }
        </div>
    )
}