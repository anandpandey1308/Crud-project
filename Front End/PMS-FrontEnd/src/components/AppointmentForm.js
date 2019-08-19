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

  // function dateToString(date) {
  //   var _date = new Date(date);
  //   var days = _date.getDate();
  //   if (days < 10) days = "0" + days;
  //   var month = _date.getMonth() + 1; //Current Month
  //   if (month < 10) month = "0" + month;
  //   var year = _date.getFullYear(); //Current Year
  //   var hours = _date.getHours(); //Current Hours
  //   if (hours < 10) hours = "0" + hours;
  //   var min = _date.getMinutes(); //Current Minutes
  //   if (min < 10) min = "0" + min;
  //   const dateString =
  //     year + "-" + month + "-" + days + "T" + hours + ":" + min;
  //   return dateString;
  // }

  // function addDays() {
  //   var date = new Date();
  //   date.setDate(date.getDate() + 7);
  //   return date;
  // }

  // var date = new Date(); //Current Date
  // var minDate = dateToString(date);
  // var nextDate = addDays();
  // var maxDate = dateToString(nextDate);

  return (
    <form onSubmit={props.onSubmit}>
      <p style={styleRed}>* Required fields</p>
      <h4 className="jumbotron">Patient Details</h4>
      <div style={style}>
        <TextInput
          id="name"
          label="Patient Full Name*"
          onChange={props.onChange}
          name="name"
          value={props.patient.name}
          error={props.errors.name}
        />

        <div className="form-group">
          <label htmlFor="dob">Date of Birth*</label>
          <div className="field">
            <input
              id="dob"
              type="date"
              onChange={props.onChange}
              name="dob"
              className="form-control"
              value={props.patient.dob || ""}
            />
          </div>
          {props.errors.dob && (
            <div className="alert alert-danger">{props.errors.dob}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender*</label>
          <div className="field">
            <select
              id="gender"
              onChange={props.onChange}
              name="gender"
              value={props.patient.gender || ""}
              className="form-control"
            >
              <option value="" />
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {props.errors.gender && (
            <div className="alert alert-danger">{props.errors.gender}</div>
          )}
        </div>
        <TextInput
          id="phone"
          label="Phone Number*"
          onChange={props.onChange}
          name="phone"
          value={props.patient.phone}
          error={props.errors.phone}
        />
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
