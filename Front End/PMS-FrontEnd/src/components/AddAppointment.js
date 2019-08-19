import React, { useState, useEffect } from "react";
import AppointmentForm from "./AppointmentForm";
import * as appointmentApi from "../api/appointmentApi";
import { toast } from "react-toastify";
import AppointmentDataService from "../service/AppointmentDataService";

const AddAppointmentPage = props => {
  const [errors, setErrors] = useState({});

  const [patient, setPatient] = useState({
    id: null,
    name: "",
    dob: null,
    gender: null,
    appointments: [
      {
        id: null,
        slug: ""
      }
    ]
  });

  const [appointment, setAppointment] = useState({
    id: null,
    slug: "",
    time: null,
    doctor: null,
    nurse: null,
    room: null
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      appointmentApi
        .getAppointmentBySlug(slug)
        .then(_appointment => setAppointment(_appointment));
    }
  }, [props.match.params.slug]);

  function handleChange({ target }) {
    setAppointment({ ...appointment, [target.name]: target.value });
    setPatient({ ...patient, [target.name]: target.value });
  }

  function formIsValid() {
    const _errors = {};
    if (!patient.name) _errors.name = "Patient's name is required.";
    if (!patient.dob) _errors.dob = "Date of Birth is required.";
    if (!patient.gender) _errors.gender = "Gender is required.";
    if (!patient.phone) _errors.phone = "Phone is required.";
    if (patient.phone && patient.phone.length !== 10)
      _errors.phone = "Phone number should contain 10 digits .";
    // if (!appointment.doctor) _errors.doctor = "Doctor is required.";
    // if (!appointment.room) _errors.room = "Room number is required.";

    setErrors(_errors);
    //Form is valid if the error object has no properties.

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    debugger;
    event.preventDefault();
    if (!formIsValid()) return;
    const index = patient.appointments.length;
    patient.appointments[index - 1] = appointment;
    AppointmentDataService.addAppointment(patient).then(
      response => {
        console.log(response);
        props.history.push("/appointments");
        toast.success("Patient saved.");
      },
      error => {
        console.log(error);
      }
    );
  }

  const headingStyle = {
    backgroundColor: "#1e90ff",
    color: "white",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10
  };

  return (
    <>
      <br />
      <h1 style={headingStyle}>Add Appointment</h1>
      <br />
      <AppointmentForm
        errors={errors}
        patient={patient}
        appointment={appointment}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddAppointmentPage;
