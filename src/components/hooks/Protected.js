import { useLocation } from "react-router-dom";
import { Context } from "./Provider";
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Protected({children}){
    const {authorized, setRedirected} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(()=>{
        if (!authorized){
            setRedirected(location.pathname);
            navigate('/')
        }
    }, [])
    return (<>{authorized && (<>{children}</>) }</>)
}