import React, { Component } from "react";
//import { getAppointments } from "../api/appointmentApi";
import AppointmentDataService from "../service/AppointmentDataService";
import PatientsList from "./PatientsList";

class PatientsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: [],
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
      this.setState({ patient: response.data });
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
          Patient's Information
        </h3>
        <br />
        <br />
        <PatientsList patient={this.state.patient} />
      </>
    );
  }
}

export default PatientsPage;
