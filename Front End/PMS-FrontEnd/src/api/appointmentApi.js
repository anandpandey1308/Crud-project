import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/appointments/";

export function getAppointments() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getAppointmentBySlug(slug) {
  return fetch(baseUrl + "?slug=" + slug)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then(appointments => {
        if (appointments.length !== 1)
          throw new Error("Appointment not found: " + slug);
        return appointments[0]; // should only find one appointment for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveAppointment(appointment) {
  return fetch(baseUrl + (appointment.id || ""), {
    method: appointment.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...appointment,
      // Parse authorId to a number (in case it was sent as a string).
      appointmentId: parseInt(appointment.appointmentId, 10)
    })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAppointment(appointmentId) {
  return fetch(baseUrl + appointmentId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
