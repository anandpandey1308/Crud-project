import axios from "axios";
const PATIENT_API_URL = "http://localhost:8080";

class PatientDataService {
  retrieveAllPatients() {
    return axios.get(`${PATIENT_API_URL}/Patient/getAllPatients`);
  }

  retrievePatient(pid) {
    return axios.get(`${PATIENT_API_URL}/Patient/${pid}`);
  }

  updatePatient(slug, patient) {
    return axios.put(`${PATIENT_API_URL}/Patient/update`, patient);
  }

  addPatient(patient) {
    return axios.post(`${PATIENT_API_URL}/Patient/save`, patient);
  }
}

export default new PatientDataService();
