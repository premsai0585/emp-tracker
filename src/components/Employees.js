import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import axiosInstance from "../api/axiosInstance";
import '../assets/styles/employees.css'
import { Link } from "react-router-dom";
export default function Employees() {

    const [empList, setEmpList] = useState([{}]);

    useEffect(() => {
        axiosInstance.get('/get/emps').then((res) => {
            setEmpList(res.data.employees);
        }).catch((error) => {
            console.log(error);
            alert('Unable to fetch employee list, Please try again.')
        })
    }, [])

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container flex-grow-1 d-flex align-items-stretch justify-content-center flex-column my-3">
                <h3 className="text-center my-3">Employees!</h3>
                <div className="emps-holder px-4 py-2">
                    {empList.map((employee, index) => {
                        return (
                            <div className="employee row my-1" key={index}>
                                <div className="col-md-2 col-6 text-center">{index + 1}</div>
                                <div className="col-md-2 col-6 text-center">{employee.empID}</div>
                                <div className="col-md-4 col-12 text-center">{employee.empName}</div>
                                <div className="col-md-2 col-6 text-center">{employee.role}</div>
                                <div className="col-md-2 col-6 text-center text-primary"><Link to={`/emps/${employee.empID}`}>View Attendance</Link></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}