import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AppointmentList(props) {
  function getTimeAndDate(time) {
    var dateTime = new Date(time);
    var options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    var _time = dateTime.toLocaleTimeString("en-US");
    var _date = dateTime.toLocaleDateString("en-US", options);
    return [_time, _date];
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Patient Full Name</th>
          {/* <th>Doctor Full Name</th>
          <th>Nurse Full Name</th>
          <th>Room</th>
          <th>Time</th>
          <th>Date</th> */}
          <th>Date of Birth</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Phone Number</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.appointment.map(appointment => {
          var dateAndTime = getTimeAndDate(appointment.appointments[0].time);
          return (
            <tr key={appointment.id}>
              <td>
                <Link
                  to={"/show-patient/" + appointment.id}
                  query={{ appointment: appointment }}
                >
                  {appointment.name}
                </Link>
              </td>
              <td>{appointment.appointments[0].doctor}</td>
              <td>{appointment.appointments[0].nurse}</td>
              <td>{appointment.appointments[0].room}</td>
              <td>{dateAndTime[0]}</td>
              <td>{dateAndTime[1]}</td>
              <td>
                <button className="btn btn-success">Active</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

AppointmentList.prototype = {
  appointment: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      dob: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      guardian: PropTypes.string,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      insuranceNo: PropTypes.string.isRequired,
      insuranceName: PropTypes.string.isRequired,
      appointments: PropTypes.array.isRequired
    })
  ).isRequired
};

AppointmentList.defaultProps = {
  appointment: []
};
export default AppointmentList;
