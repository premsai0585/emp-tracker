import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axiosInstance from "../api/axiosInstance";
import '../assets/styles/employee.css';
import AttendanceRow from "./AttendanceRow";

export default function Employee() {
    const [empID, setEmpID] = useState(useParams().empID)
    const [sDate, setSDate] = useState('');
    const [eDate, setEDate] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const [daysPresent, setDaysPresent] = useState(0);
    const [workingHrs, setWorkingHrs] = useState(0);
    const [daysLate, setDaysLate] = useState(0);
    const [attendace, setAttendance] = useState([]);
    const [show, setShow] = useState(false);
    const updateAttendance = () => {
        let weekdays = 0;
        var atndObj = {};
        for (var i = 0; i <= moment(eDate).diff(sDate, 'days'); i++) {
            if (parseInt(moment(sDate).add(i, 'days').format('d')) !== 0 && parseInt(moment(sDate).add(i, 'days').format('d')) !== 6) {
                weekdays++;
                atndObj[moment(sDate).add(i, 'days').format('YYYY-MM-DD')] = { present: false };
            }
        }
        console.log(attendace)
        attendace.forEach((day) => {
            atndObj[day.date]['present'] = true;
            console.log(day.date)
        })
        console.log(atndObj)
        setDaysPresent(attendace.length);
        setTotalDays(weekdays);
        setShow(true);
    }
    const fetchAtnd = (e) => {
        if (sDate !== '' && eDate !== '') {
            axiosInstance.post('/get/emp/atnd', { empID, sDate, eDate }).then((res) => {
                let weekdays = 0;
                var atndObj = {};
                var late = 0;
                var mins = 0;
                for (var i = 0; i <= moment(eDate).diff(sDate, 'days'); i++) {
                    if (parseInt(moment(sDate).add(i, 'days').format('d')) !== 0 && parseInt(moment(sDate).add(i, 'days').format('d')) !== 6) {
                        weekdays++;
                        atndObj[moment(sDate).add(i, 'days').format('YYYY-MM-DD')] = { present: false };
                    }
                }
                res.data.report.forEach((day) => {
                    atndObj[day.date] = { present: true, ...day };
                    mins += moment(day.endTime).diff(moment(day.inTime), 'minutes');
                    if (moment(day.date + 'T03:30:00Z').isAfter(moment(day.inTime))) {
                        atndObj[day.date]['late'] = false;
                    } else {
                        atndObj[day.date]['late'] = true;
                        late++;
                    }
                })
                setWorkingHrs(((mins/60)/res.data.report.length).toFixed(2))
                setAttendance(Object.entries(atndObj));
                setDaysPresent(res.data.report.length);
                setTotalDays(weekdays);
                setDaysLate(late);
                setShow(true);
            }).catch((error) => {
                console.log(error)
                alert("Could not fetch attendace report, try again!")
            });
        } else {
            alert('Start and end dates cannot be empty!');
        }
    }
    useEffect(() => {
    }, [])
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container flex-grow-1 d-flex align-items-stretch flex-column my-3">
                <div className="row">
                    <div className="form-group col-md-5 my-2">
                        <label htmlFor="sdate" className="form-label">Start Date:</label>
                        <input type="date" className="form-control" max={moment().subtract(1, 'days').format('YYYY-MM-DD')} onChange={(e) => { setSDate(e.target.value) }} />
                    </div>
                    <div className="form-group col-md-5 my-2">
                        <label htmlFor="sdate" className="form-label">End Date:</label>
                        <input type="date" className="form-control" max={moment().subtract(1, 'days').format('YYYY-MM-DD')} min={sDate} onChange={(e) => { setEDate(e.target.value) }} />
                    </div>
                    <div className="col-md-2 d-flex flex-column justify-content-end align-items-center my-2">
                        <button className="btn btn-primary" onClick={fetchAtnd}>view</button>
                    </div>
                </div>
                <hr />
                {show && (
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-wrap justify-content-evenly">
                            <div className="card atnd-card my-2 mx-1">
                                <div className="card-body">
                                    <p className="card-title">Working Days:</p>
                                    <h2 className="card-body p-0">{totalDays}</h2>
                                </div>
                            </div>
                            <div className="card atnd-card my-2 mx-1">
                                <div className="card-body">
                                    <p className="card-title">Days Present:</p>
                                    <h2 className="card-body p-0">{daysPresent}</h2>
                                </div>
                            </div>
                            <div className="card atnd-card my-2 mx-1">
                                <div className="card-body">
                                    <p className="card-title">Days on leave:</p>
                                    <h2 className="card-body p-0">{totalDays - daysPresent}</h2>
                                </div>
                            </div>
                            <div className="card atnd-card my-2 mx-1">
                                <div className="card-body">
                                    <p className="card-title">Days Late:</p>
                                    <h2 className="card-body p-0">{daysLate}</h2>
                                </div>
                            </div>
                            <div className="card atnd-card my-2 mx-1">
                                <div className="card-body">
                                    <p className="card-title">Avg Working Hours:</p>
                                    <h2 className="card-body p-0">{workingHrs}</h2>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="p-4 atnd-list">
                            {
                                attendace.map((value, index)=>{
                                    return <AttendanceRow key={index} date={value[0]} atndObj={value[1]}/>
                                })
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}