import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppointmentDataService from "../service/AppointmentDataService";

class ShowAppointmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: {
        id: null,
        name: "",
        dob: null,
        gender: null,
        // guardian: "",
        // disease: "",
        // address: "",
        // city: "",
        // state: null,
        // country: null,
        // zip: "",
        phone: "",
        insuranceName: "",
        insuranceNo: "",
        appointments: [
          {
            id: null,
            slug: "",
            time: null
            // doctor: null,
            // nurse: null,
            // room: null
          }
        ]
      },
      message: null
    };
    this.refreshAppointments = this.refreshAppointments.bind(this);
  }

  componentDidMount() {
    this.refreshAppointments();
  }

  refreshAppointments() {
    const id = this.props.match.params.id;
    AppointmentDataService.retrieveAppointment(id).then(
      response => {
        console.log(response);
        this.setState({ appointment: response.data });
      },
      error => {
        console.log(error);
      }
    );
  }

  getTimeAndDate(time) {
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

  render() {
    const slug = this.props.match.params.slug;

    const style = {
      backgroundColor: "#A0F59A",
      padding: 10,
      borderRadius: 5,
      margin: 10
    };
    const style1 = {
      backgroundColor: "#14FC03",
      padding: 10,
      borderRadius: 5,
      margin: 10
    };

    var dob = this.getTimeAndDate(this.state.appointment.dob);
    var time = this.getTimeAndDate(this.state.appointment.appointments[0].time);
    return (
      <>
        <h1 className="jumbotron">Show Patient Details</h1>
        <Link className="btn btn-sm btn-danger" to={"/add-appointment/" + slug}>
          Edit Patient
        </Link>{" "}
        <br />
        <br />
        <table className="table">
          <tbody>
            <tr>
              <th>
                <h4 style={style}>Patient Full Name : </h4>
              </th>
              <td>{this.state.appointment.name}</td>
            </tr>
          </tbody>
        </table>
        {/* <h6 style={style1}>Personal Details</h6>
        <table className="table">
          <tbody>
            <tr>
              <th>Disease :</th>
              <td>{this.state.appointment.appointments[0].disease}</td>
            </tr>
            <tr>
              <th>Name of the Doctor :</th>
              <td>{this.state.appointment.appointments[0].doctor}</td>
            </tr>
            <tr>
              <th>Name of the Nurse :</th>
              <td>{this.state.appointment.appointments[0].nurse}</td>
            </tr>
            <tr>
              <th>Appointment time :</th>
              <td>
                {time[1]} {time[0]}
              </td>
            </tr>
            <tr>
              <th>Room number alloted :</th>
              <td>{this.state.appointment.appointments[0].room}</td>
            </tr>
          </tbody>
        </table> */}
        <h4 style={style}>Personal Details</h4>
        <table className="table">
          <tbody>
            <tr>
              <th>Age :</th>
              {/* <td>{dob[1]}</td> */}
            </tr>
            <tr>
              <th>Gender :</th>
              <td>{this.state.appointment.gender}</td>
            </tr>
          </tbody>
        </table>
        <h4 style={style}>Mailing Details</h4>
        <table className="table">
          <tbody>
            <tr>
              <th>Current Address :</th>
              <td>{this.state.appointment.address}</td>
            </tr>
            <tr>
              <th>City :</th>
              <td>{this.state.appointment.city}</td>
            </tr>
            <tr>
              <th>State :</th>
              <td>{this.state.appointment.state}</td>
            </tr>
            <tr>
              <th>Country :</th>
              <td>{this.state.appointment.country}</td>
            </tr>
          </tbody>
        </table>
        <h4 style={style}>Insurance Details</h4>
        <table className="table">
          <tbody>
            <tr>
              <th>Insurance Name :</th>
              <td>{this.state.appointment.insuranceName}</td>
            </tr>
            <tr>
              <th>Insurance Number :</th>
              <td>{this.state.appointment.insuranceNo}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default ShowAppointmentPage;
