import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Context } from "./hooks/Provider";
import axiosInstance from "../api/axiosInstance";
import LoadingPage from "./LoadingPage";
import '../assets/styles/login.css';

export default function Login(){
    const [empID, setEmpID] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const {authorized, setAuthorized, redirected} = useContext(Context)
    const loginButtonClick = (e) =>{
        e.preventDefault();
        axiosInstance.post('/login', {empID, password:pass}).then((res)=>{
            if (res.status === 200){
                setAuthorized(true);
                alert("Success");
                if (redirected){
                    navigate(redirected, {replace:true});
                } else {
                    navigate('/dashboard');
                }
            }
        }).catch((error)=>{
            alert("Invalid login");
            setEmpID('');
            setPass('');
        });
    }

    useEffect(() => {
        if (authorized) {
            setLoading(false);
        } else {
            axiosInstance.get('/verifytoken').then((res)=>{
                setAuthorized(true);
                if (redirected){
                    navigate(redirected, {replace:true});
                } else {
                    navigate('/dashboard');
                }
            }).catch((error) => {
                setLoading(false);
            })
        }
    }, [])

    return loading ? <LoadingPage /> : (
        
        <div className="row w-100">
            <div className="col-md-6 d-md-block d-none side-img">
            </div>
            <div className="col-md-6 col-sm-12 min-vh-100 d-flex flex-column align-center justify-content-center">
                <div className="display-5 text-center fw-bold">
                    Hi!
                </div>
                <span className="text-center fw-lighter fs-6 mb-3">Login to the dashboard</span>
                <form className="d-flex flex-column align-items-center">
                    <div className="mt-3">
                        <label htmlFor="empID" className="form-label">Employee ID</label>
                        <input type="text" id="empID" className="form-control login-input" onChange={(e)=>{setEmpID(e.target.value)}} value={empID} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" id="pass" className="form-control login-input" onChange={(e)=>{setPass(e.target.value)}} value={pass} />
                    </div>
                    <button onClick={loginButtonClick} className="btn btn-outline-light mt-4">Login</button>
                </form>
            </div>
        </div>
    )
}