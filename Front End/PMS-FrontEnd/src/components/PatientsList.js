import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PatientsList(props) {
  function getTimeAndDate(time) {
    var dateTime = new Date(time);
    var options = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    var _date = dateTime.toLocaleDateString("en-US", options);
    return _date;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Date of Birth</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {props.patient.map(patient => {
          var dateAndTime = getTimeAndDate(patient.dob);
          return (
            <tr key={patient.id}>
              <td>
                <Link
                  to={"/show-appointment/" + patient.appointments[0].slug}
                  query={{ appointment: patient }}
                >
                  {patient.name}
                </Link>
              </td>
              <td>{dateAndTime}</td>
              <td>{patient.gender}</td>
              <td>
                {patient.address}, {patient.city}, {patient.state},{" "}
                {patient.country}, {patient.zip}
              </td>
              <td>{patient.phone}</td>
              <td>{patient.insuranceNo}</td>
              <td>{patient.insuranceName}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  to="/add-appointment-existing"
                  query={{ patient: patient }}
                >
                  Add Appointment
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

PatientsList.prototype = {
  appointment: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string,
      name: PropTypes.string.isRequired,
      dob: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      address: PropTypes.string,
      phone: PropTypes.string.isRequired,
      insuranceNo: PropTypes.string.isRequired,
      insuranceName: PropTypes.string.isRequired,
      appointments: PropTypes.array.isRequired
    })
  ).isRequired
};

PatientsList.defaultProps = {
  appointment: []
};
export default PatientsList;
