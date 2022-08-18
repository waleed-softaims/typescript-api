import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Login.css';
import { useAppDispatch } from '../reactStore/reducers'
import { getStudentsList} from '../airtable/airtableSlice'

const Login = () => {
  const [studentName, setStudentName] = useState("");
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    setStudentName("");
  };

  const handleSubmit = () => {
		if (studentName.trim() !== '') dispatch(getStudentsList(studentName))
	}

  return (
    <div className="Login">
      <label>
        Student Name:
      </label>
      <input
        onChange={(e) => setStudentName(e.target.value)}
        value={studentName}
        type="text"
        name="student"
        id="student"
      />
      <button type="submit" onClick={handleSubmit}>
        <Link to={studentName.trim() !== "" ? "/records" : ""}>Login</Link>
      </button>
    </div>
  );
};
export default Login
