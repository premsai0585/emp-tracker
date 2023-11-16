import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Protected from './components/hooks/Protected';
import AddEmployee from './components/AddEmployee';
import Employees from './components/Employees';
import Employee from './components/Employee';
import PostAttendance from './components/PostAttendance';
import Register from './components/Register';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Protected> <Dashboard /></Protected>} />
        <Route path='/addemp' element={<Protected> <AddEmployee /></Protected>} />
        <Route path='/emps' element={<Protected> <Employees /></Protected>} />
        <Route path='/emps/:empID' element={<Protected> <Employee /></Protected>} />
        <Route path='/post/attendance' element={<Protected> <PostAttendance /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
