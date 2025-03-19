import React, { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import tailwindConfig from "../../tailwind.config";
import Cookies from "js-cookie";

export default function Audit() {
  const [isAuditOngoing, setIsAuditOngoing] = useState(false);

  useEffect(() => {
    //set isAuditOngoing
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <h1>Audit</h1>
      {isAuditOngoing ? (
        <>
          <h2>Audit Started {}</h2>
          <div className="flex flex-row">
            <section>
              <h3>Locations</h3>
              <ul>
                <li>
                  <p>Location name</p>
                  <button>Complete Location</button>
                </li>
              </ul>
            </section>
            <section>
              <h3>Scanning</h3>
              <input type="text" placeholder="Start Scanning"></input>
              <div>
                <p>Book Title</p>
                <p>Author</p>
                <p>Location</p>
              </div>
            </section>
            <section>
              <h3>Instructions</h3>
              <ul>
                <li></li>
              </ul>
            </section>
          </div>
        </>
      ) : (
        <div>
          <h2>Audit Completed {}</h2>
          <button>Start New Audit</button>
          <button>Go to Audit Reports</button>
        </div>
      )}
    </>
  );
}
