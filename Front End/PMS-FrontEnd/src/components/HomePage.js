import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Patient Management System </h1>
      <p>Create,Update,Read and Delete Patient</p>
      <Link to="patients" className="btn btn-success">
        Get All Patients
      </Link>
      &nbsp;&nbsp;&nbsp;
      <Link to="add-appointment" className="btn btn-success">
        Add Patients
      </Link>
      &nbsp;&nbsp;&nbsp;
      <Link to="add-appointment" className="btn btn-success">
        Delete Patients
      </Link>
      &nbsp;&nbsp;&nbsp;
      <Link to="add-appointment" className="btn btn-success">
        Update Patients
      </Link>
    </div>
  );
}

export default HomePage;
