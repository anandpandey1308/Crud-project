import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

function AppointmentForm(props) {
  const style = {
    marginLeft: 100,
    marginRight: 100
  };

  const styleRed = {
    color: "red"
  };

  function dateToString(date) {
    var _date = new Date(date);
    var days = _date.getDate();
    if (days < 10) days = "0" + days;
    var month = _date.getMonth() + 1; //Current Month
    if (month < 10) month = "0" + month;
    var year = _date.getFullYear(); //Current Year
    var hours = _date.getHours(); //Current Hours
    if (hours < 10) hours = "0" + hours;
    var min = _date.getMinutes(); //Current Minutes
    if (min < 10) min = "0" + min;
    const dateString =
      year + "-" + month + "-" + days + "T" + hours + ":" + min;
    return dateString;
  }

  function addDays() {
    var date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }

  var date = new Date(); //Current Date
  var minDate = dateToString(date);
  var nextDate = addDays();
  var maxDate = dateToString(nextDate);

  return (
    <form onSubmit={props.onSubmit}>
      <p style={styleRed}>* required fields</p>
      <h4 className="jumbotron">Appointment Details</h4>
      <div style={style}>
        <div className="form-group">
          <TextInput
            id="disease"
            label="Disease*"
            onChange={props.onChange}
            name="disease"
            value={props.appointment.disease}
            error={props.errors.disease}
          />
          <label htmlFor="time">Time*</label>
          <div className="field">
            <input
              id="time"
              type="datetime-local"
              onChange={props.onChange}
              name="time"
              value={props.appointment.time || ""}
              className="form-control"
              min={minDate}
              max={maxDate}
            />
          </div>
          {props.errors.time && (
            <div className="alert alert-danger">{props.errors.time}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="doctor">Name of the Doctor Assisting*</label>
          <div className="field">
            <select
              id="doctor"
              onChange={props.onChange}
              name="doctor"
              value={props.appointment.doctor || ""}
              className="form-control"
            >
              <option value="" />
              <option value="Dr. Sajeev Mathur">Dr. Sajeev Mathur</option>
              <option value="Dr. Mahima Batra">Dr. Mahima Batra</option>
              <option value="Dr. Karan Johar">Dr. Karan Johar</option>
            </select>
          </div>
          {props.errors.doctor && (
            <div className="alert alert-danger">{props.errors.doctor}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="nurse">Name of the Nurse Assisting</label>
          <div className="field">
            <select
              id="nurse"
              onChange={props.onChange}
              name="nurse"
              value={props.appointment.nurse || ""}
              className="form-control"
            >
              <option value="" />
              <option value="Miss Shelly Gupta">Miss Shelly Gupta</option>
              <option value="Mr. Raj Kapoor">Mr. Raj Kapoor</option>
              <option value="Mrs. Meera">Mrs. Meera</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="room">Room Number Alloted*</label>
          <div className="field">
            <select
              id="room"
              onChange={props.onChange}
              name="room"
              value={props.appointment.room || ""}
              className="form-control"
            >
              <option value="" />
              <option value="Consultation Room 1">Consultation Room 1</option>
              <option value="Consultation Room 2">Consultation Room 2</option>
              <option value="Consultation Room 3">Consultation Room 3</option>
              <option value="X Ray Room 1">X Ray Room 3</option>
            </select>
          </div>
        </div>
        {props.errors.room && (
          <div className="alert alert-danger">{props.errors.room}</div>
        )}
      </div>
      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

AppointmentForm.propTypes = {
  appointment: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default AppointmentForm;
