import React, { Component } from "react";
//import { getAppointments } from "../api/appointmentApi";
import AppointmentDataService from "../service/AppointmentDataService";
import AppointmentList from "./AppointmentList";
import { Link } from "react-router-dom";

class AppointmentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      message: null
    };
    this.refreshAppointments = this.refreshAppointments.bind(this);
  }

  componentDidMount() {
    this.refreshAppointments();
  }

  refreshAppointments() {
    AppointmentDataService.retrieveAllAppointments().then(response => {
      console.log(response);
      this.setState({ appointments: response.data });
    });
  }

  render() {
    const style = {
      backgroundColor: "#E8ECEF",
      borderRadius: 5,
      paddingTop: 25,
      paddingBottom: 25,
      display: "flex",
      justifyContent: "center"
    };
    return (
      <>
        <h3 id="appointment_heading" style={style}>
          Patient Details
        </h3>
        <Link className="btn btn-primary" to="/add-appointment">
          Add new Patients
        </Link>
        <br />
        <br />
        <AppointmentList appointment={this.state.appointments} />
      </>
    );
  }
}

export default AppointmentsPage;
