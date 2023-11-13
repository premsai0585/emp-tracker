import axios from "axios";
import '../assets/styles/dashboard.css';
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import moment from "moment";

export default function Dashboard() {
    const [total, setTotal] = useState(0);
    const [onTime, setOnTime] = useState(0);
    const [late, setLate] = useState(0);
    const [absent, setAbsent] = useState(0);
    const [weekday, setWeekday] = useState(false);
    const getAttnd = () => {
        axiosInstance.get('/get/all/atnd').then((res) => {
            console.log(res.data)
        })
    }
    useEffect(() => {
        if (parseInt(moment().format('d')) != 0 && parseInt(moment().format('d')) != 6) {
            setWeekday(true);
            axiosInstance.get('get/emps/count').then((res) => {
                var totalCount = res.data.count;
                setTotal(totalCount);
                axiosInstance.get('/get/todays/atnd').then((res) => {
                    var lateCount = 0;
                    var onTimeCount = 0;
                    res.data.todaysAttendance.forEach(day => {
                        console.log(moment(day.date + 'T03:30:00Z').format('HH-mm-ss'))
                        console.log(moment(day.inTime).format('HH-mm-ss'))
                        if (moment(day.date + 'T03:30:00Z').isAfter(moment(day.inTime))) {
                            onTimeCount++;
                        } else {
                            lateCount++;
                        }
                    });
                    setLate(lateCount);
                    setOnTime(onTimeCount);
                    setAbsent(totalCount - (lateCount + onTimeCount));
                }).catch((error) => {

                });
            }).catch((error) => {

            });
        }
    }, [])
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container-fluid px-5 flex-grow-1 d-flex align-items-center">
                {weekday &&
                    <div className="row flex-grow-1">
                        <div className="col-lg-4 col-md-3 d-flex align-items-center my-3 justify-content-center my-4">
                            <h2 className="">
                                {moment().format('DD MMMM YYYY')}
                            </h2>
                        </div>
                        <div className="col-lg-2 col-md-3 my-3">
                            <div className="card dash-card">
                                <div className="card-body">
                                    <p className="card-title">
                                        Total Emps
                                    </p>
                                    <h3 className="card-body p-0 green">
                                        {total}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 my-3">
                            <div className="card dash-card">
                                <div className="card-body">
                                    <p className="card-title">
                                        On Time
                                    </p>
                                    <h3 className="card-body p-0 green">
                                        {onTime}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 my-3">
                            <div className="card dash-card">
                                <div className="card-body">
                                    <p className="card-title">
                                        Late
                                    </p>
                                    <h3 className="card-body p-0 red">
                                        {late}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 my-3">
                            <div className="card dash-card">
                                <div className="card-body">
                                    <p className="card-title">
                                        Absent
                                    </p>
                                    <h3 className="card-body p-0 red">
                                        {absent}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                { !weekday && 
                    <h2>{moment().format('DD MMMM YYYY')}: Not a working day!</h2>
                }
            </div>
        </div>
    )
}