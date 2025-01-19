import React from "react";
import NavBar from "../components/NavBar"

const RequestBook = () => {
    return (
        <div>
          <NavBar useDarkTheme={true} showTitle={true}/>
          <h1>Request Book Page</h1>
          <p>Welcome! This is the Request Book Page.</p>
        </div>
    );
};

export default RequestBook;