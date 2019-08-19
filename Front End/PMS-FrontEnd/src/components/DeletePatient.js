class DeletePatientPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", patient_list: [], deleted: false, patient: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let a = "http://localhost:8080/api/patients/";
    fetch(a)
      .then(res => res.json())
      .then(
        result => {
          if (result.error) {
            this.setState({
              deleted: false,
              error: result.error
            });
          } else {
            let initial_patient_list = [];
            for (let i = 0; i < result["_embedded"]["patients"].length; i++) {
              let curr_link =
                result["_embedded"]["patients"][i]._links.self.href;
              initial_patient_list.push(
                curr_link.substring(curr_link.lastIndexOf("/") + 1)
              );
            }
            this.setState({
              deleted: false,
              patient_list: initial_patient_list,
              value: initial_patient_list[0]
            });
            this.fetchPatientDetails(this.state.value);
          }
        },
        error => {
          this.setState({
            deleted: false,
            error
          });
        }
      );
  }

  handleChange(event) {
    this.fetchPatientDetails(event.target.value);
    this.setState({ value: event.target.value });
  }

  fetchPatientDetails(id) {
    const a = "http://localhost:8080/api/patients/" + id;
    fetch(a, { cache: "no-store" })
      .then(res => res.json())
      .then(
        result => {
          if (result.error) {
            this.setState({
              patient: null,
              error: result.error
            });
          } else {
            let curr_link = result._links.self.href;
            result.id = curr_link.substring(curr_link.lastIndexOf("/") + 1);
            this.setState({
              patient: result
            });
          }
        },
        error => {
          this.setState({
            patient: null,
            error
          });
        }
      );
  }

  handleSubmit(event) {
    const url_endpoint =
      "http://localhost:8080/api/patients/" + this.state.value;
    fetch(url_endpoint, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    }).then(
      result => {
        if (result.error) {
          this.setState({
            deleted: false,
            error: result.error
          });
        } else {
          this.setState({
            deleted: true,
            patient: null
          });
          let temp_array = [...this.state.patient_list];
          let index = temp_array.indexOf(this.state.value);
          if (index > -1) {
            temp_array.splice(index, 1);
            this.setState({
              patient_list: temp_array,
              value: temp_array[0]
            });
            this.fetchPatientDetails(temp_array[0]);
          }
        }
      },
      error => {
        this.setState({
          deleted: false,
          error
        });
      }
    );
    event.preventDefault();
  }

  render() {
    let patient;
    if (this.state.patient) {
      patient = <PatientDetails patient={this.state.patient} />;
    }
    return (
      <div class="row justify-content-center">
        <div class="col-sm-4">
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label>Enter patient id :</label>

              <select
                class="form-control"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.state.patient_list.map(function(patient_id) {
                  return (
                    <option key={patient_id} value={patient_id}>
                      {patient_id}
                    </option>
                  );
                })}
              </select>
            </div>

            <input class="btn btn-primary" type="submit" value="Submit" />
          </form>
          {this.state.deleted && (
            <p>
              <br />
              <b>Patient details have been successfully deleted</b>
              <br />
            </p>
          )}
          {this.state.patient && (
            <b>
              <br />
              Are you sure you want to delete the below patient?
            </b>
          )}
          {this.state.patient && patient}
        </div>
      </div>
    );
  }
}
