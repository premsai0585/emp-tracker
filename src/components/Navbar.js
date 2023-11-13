import axiosInstance from '../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './hooks/Provider';

export default function Navbar() {
    const navigate = useNavigate();
    const {setAuthorized} = useContext(Context);
    const logout = ()=>{
        axiosInstance.get('/logout').then((res)=>{
            setAuthorized(false);
            navigate('/');
        }).catch(()=>{
            alert("Unable to logout");
            navigate('/dashboard');
        })
    }
    return (
        <div className="navbar navbar-expand-lg px-2 border-bottom" data-bs-theme="dark">
            <Link to="/dashboard" className="navbar-brand">Employee Manager</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="btn btn-success m-2" to="/addemp">Add Employee</Link></li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="btn btn-success m-2" to="/emps">Employee Attendance</Link></li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="btn btn-success m-2" to="/post/attendance">Post Attendance</Link></li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item"><button className="btn btn-danger m-2" onClick={logout}>Logout</button></li>
                </ul>
            </div>
        </div>
    )
}