import React from "react";
//import { url } from "inspector";
import about from "../images/about.jpg";

class AboutPage extends React.Component {
  render() {
    // const style = {
    //   backgroundImage: "url(" + about + ")",
    //   height: "100%",
    //   width: "100%",
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover"
    // };
    return (
      <div style="background-image: url('https://mdbootstrap.com/img/Photos/Others/architecture.jpg'); background-repeat: no-repeat; background-size: cover; background-positon: center center;">
        <h2>About Hospital</h2>
        <p>
          Patient Management System allows us to perform CRUD operation through
          UI.
        </p>
      </div>
    );
  }
}

export default AboutPage;
