import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/penguin.css";

function PageNotFoundPage() {
  return (
    <div>
      <h1 className="jumbotron">Page Not Found</h1>
      <div className={styles.penguin}>
        <div className="penguin">
          <div className="penguin-bottom">
            <div className="right-hand" />
            <div className="left-hand" />
            <div className="right-feet" />
            <div className="left-feet" />
          </div>
          <div className="penguin-top">
            <div className="right-cheek" />
            <div className="left-cheek" />
            <div className="belly" />
            <div className="right-eye">
              <div className="sparkle" />
            </div>
            <div className="left-eye">
              <div className="sparkle" />
            </div>
            <div className="blush-right" />
            <div className="blush-left" />
            <div className="beak-top" />
            <div className="beak-bottom" />
          </div>
        </div>
      </div>
      <p>
        <Link to="/" className="btn btn-primary">
          Back to Home Page
        </Link>
      </p>
    </div>
  );
}

export default PageNotFoundPage;
