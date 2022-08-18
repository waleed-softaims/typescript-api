import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../reactStore/reducers";
import { logout, recordList } from "../airtable/airtableSlice";

type RecordProp = {
	name: string
	students: any[]
}

const Card = () => {
  const dispatch = useAppDispatch();
  const recordLists = useAppSelector(recordList);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <div>
      <button onClick={handleClick}>Logout</button>
      <ul>
        {recordLists.records
          .slice()
          .sort(
            (a: { name: string }, b: { name: string }) =>
              Number(a.name.split(" ")[1]) - Number(b.name.split(" ")[1])
          )
          .map((record: RecordProp, id: string | number) => (
            <li key={id} style={{margin: "auto", border: "1px solid black", padding: "20px", width: "50vh", marginBottom: "10px"}}>
              <p>
                <strong>Name</strong> <br />
                {record.name}
              </p>
              <br />
              <p>
                <strong>Students</strong> <br />
                {record.students.map((element, id) => (
                  <span key={id}> {element} </span>
                ))}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Card;
