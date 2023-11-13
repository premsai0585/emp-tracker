import Navbar from "./Navbar";
import '../assets/styles/addemp.css';
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function AddEmployee() {
    const [empName, setEmpName] = useState('');
    const [emailID, setEmailID] = useState('');
    const [mobile, setMobile] = useState('');
    const [bloodGP, setBloodGP] = useState('');
    const [DOB, setDOB] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const addEmp = (e) => {
        e.preventDefault();
        axiosInstance.post('/add/emp', { empName, emailID, mobile, bloodGP, DOB, gender, role }).then((res) => {
            if (res.data.success) {
                setEmpName('');
                setEmailID('');
                setMobile('');
                setBloodGP('');
                setDOB('');
                setRole('');
                setGender('');
                alert("Employee successfully added. \nNew employee's ID: " + res.data.empID);
            } else {
                alert("Employee was not added. Kindly try again")
            }
        });
    }
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
                <form className="align-items-center flex-grow-1 addemp-form px-4 my-3">
                    <h3 className="text-center my-3">Add an Employee!</h3>
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="empName">Employee Name</label>
                        <input type="text" className="form-control" id="empName" value={empName} onChange={(e) => { setEmpName(e.target.value) }} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="email">Email ID</label>
                        <input type="email" className="form-control" id="email" value={emailID} onChange={(e) => { setEmailID(e.target.value) }} />
                    </div>
                    <div className="mb-3 form-group">
                        <label className="form-label" htmlFor="mobile">Mobile</label>
                        <input type="text" className="form-control" id="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
                    </div>
                    <div className="mb-3 form-group">
                        <label className="form-label" htmlFor="bloodGP">Blood Group</label>
                        <input type="text" className="form-control" id="bloodGP" value={bloodGP} onChange={(e) => { setBloodGP(e.target.value) }} />
                    </div>
                    <div className="mb-3 form-group">
                        <label className="form-label" htmlFor="dob">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" value={DOB} onChange={(e) => { setDOB(e.target.value) }} />
                    </div>
                    <div className="mb-3 form-group">
                        <label className="form-label" htmlFor="gender" >Gender</label>
                        <select name="gender" id="gender" class="mb-3 form-select" value={gender} onChange={(e) => { setGender(e.target.value) }}>
                            <option value="" selected></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3 form-group">
                        <label className="form-label" htmlFor="role">Role</label>
                        <input type="text" className="form-control" id="role" value={role} onChange={(e) => { setRole(e.target.value) }} />
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <button className="btn btn-outline-success text-center" onClick={addEmp}>Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}