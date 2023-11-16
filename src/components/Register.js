import React,{useState} from 'react';
import {toast,ToastContainer} from 'react-toastify';
import '../assets/styles/register.css';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

export default function Register () {
    const [empID,setEmpID]=useState('');
    const [pass,setPass]=useState('');
    const [cpass,setCPass]=useState('');
    const formValidation=()=>{
        if(pass!==cpass){
            toast.error("Passwords do not match",{
                position:toast.POSITION.TOP_CENTER
            });
            setCPass('');
            setPass('');
            return false;
        }
        if(pass==='' || empID===''){
            toast.error("Please fill all the fields",{
                position:toast.POSITION.TOP_CENTER
            });
            return false;
        }
        return true;
    }
    const registerClick=async(e)=>{
        e.preventDefault();
        let validation = formValidation();
        if(validation){
            let submit= await axiosInstance.post('/Register',{empID,pass});
            if(submit.data.msg==='Exists'){
                toast.error("User already exists",{
                    position:toast.POSITION.TOP_CENTER
                })
            };
            if(submit.data.msg==='Created'){
                toast.success("User successfully created.\n You can now login.",{
                    position:toast.POSITION.TOP_CENTER
                });
            if(submit.status===500){
                toast.error("Some internal error occured.",{
                    position:toast.POSITION.TOP_CENTER
                })
            }
            }
        }
    }
  return (
   <>
    <ToastContainer></ToastContainer>
    <div className="row w-100">
        <div className='col-md-6 d-md-block d-none side-img'></div>
        <div className='col-md-6 col-sm-12 min-vh-100 d-flex flex-column align-center justify-content-center'>
            <div className="display-5 text-center fw-bold">
                Hi<span style={{color:'#3B8653'}}>!</span>
            </div>
            <span className="text-center fw-lighter fs-6 mb-3">Register to the dashboard</span>
            <form className="d-flex flex-column align-items-center">
                <div className="mt-3">
                    <label htmlFor="empID" className='form-label'>Employee ID</label>
                    <input type="text" id='empID' className='form-control register-input' value={empID} onChange={(e)=>{setEmpID(e.target.value)}}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="pass" className='form-label'>Password</label>
                    <input type="password" id='pass' className='form-control register-input' value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="cpass" className='form-label'>Confirm Password</label>
                    <input type="password" id='cpass' className='form-control register-input' value={cpass} onChange={(e)=>{setCPass(e.target.value)}}/>
                </div>
                <button className='btn btn-outline-light mt-4' onClick={registerClick}>Register</button>
                <p className='text-center mt-3'>Go Back to <Link to='/' style={{color:'#3B8653',textDecoration:'none'}}>Login</Link> </p>
            </form>

        </div>
    </div>
   </>
  )
}


