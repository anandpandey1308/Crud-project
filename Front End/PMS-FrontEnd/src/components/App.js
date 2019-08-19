import React from "react";
import AboutPage from "./AboutPage";
import HomePage from "./HomePage";
import Header from "./common/header";
import AppointmentsPage from "./Appointments";
import PatientsPage from "./PatientsPage";
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFoundPage from "./PageNotFound";
import AddAppointmentPage from "./AddAppointment";
import AddAppointmentForExistingPatientPage from "./AddAppointmentForExistingPatient";
import ShowAppointmentPage from "./ShowAppointmentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/appointments" component={AppointmentsPage} />
        <Route path="/patients" component={PatientsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/show-patient" component={ShowAppointmentPage} />
        <Route path="/show-patient/:id" component={ShowAppointmentPage} />
        {/* <Route path="/add-appointment/:slug" component={AddAppointmentPage} /> */}
        <Route path="/add-appointment" component={AddAppointmentPage} />
        {/* <Route path="/delete-patient" component={DeletePatientPage} /> */}
        <Route
          path="/add-appointment-existing"
          component={AddAppointmentForExistingPatientPage}
        />
        <Redirect from="/about-page" to="about" />
        <Route component={PageNotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
