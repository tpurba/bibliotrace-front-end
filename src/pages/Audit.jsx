import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import tailwindConfig from "../../tailwind.config";
import Cookies from "js-cookie";

export default function Audit() {
  const [isAuditOngoing, setIsAuditOngoing] = useState(false);
  const [auditID, setAuditID] = useState(null);
  const [lastAuditCompletedDate, setLastAuditCompletedDate] = useState("");
  const [lastAuditStartDate, setLastAuditStartDate] = useState("10/10/2020");
  const [currentLocation, setCurrentLocation] = useState("");
  const [locations, setLocations] = useState([
    "basement",
    "storage bin 1",
    "shelf",
    "storage bin 2",
    "storage bin 3",
    "storage bin 4",
  ]);
  const [allLocationsComplete, setAllLocationsComplete] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookLocation, setBookLocation] = useState("");

  useEffect(() => {
    //set isAuditOngoing
  }, []);

  async function handleStartAudit() {
    //create new audit
    try {
      const response = await fetch("http://localhost:8080/api/inventory/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${Cookies.get("authToken")}` },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(response.message);
      } else {
        setIsAuditOngoing(true);
        setLastAuditStartDate(new Date().toLocaleDateString());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function goToReports() {}

  function handleCompleteLocation() {}

  async function handleScan(e) {
    if (e.key !== "Enter" || e.target.value == "") {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/inventory/auditEntry", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${Cookies.get("authToken")}` },
        body: { qr_code: e.target.value, location: currentLocation, audit_id: auditID },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(response.message);
      } else {
        //set book data
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleCompleteAudit() {}
  return (
    <>
      <NavBar></NavBar>
      <h1 className="text-center mb-10">Audit</h1>
      {isAuditOngoing ? (
        <>
          <h2 className="text-center text-2xl mb-10">Started On: {lastAuditStartDate}</h2>

          <div className="flex flex-row justify-around h-[60%]">
            <section className="flex flex-col w-full mx-10">
              <h3 className="text-center text-xl mb-5">Current Location: {currentLocation}</h3>
              <ul className="border overflow-y-scroll w-full h-full p-5 text-lg">
                {locations.map((location) => {
                  return (
                    <li className="flex flex-row flex-nowrap justify-between items-center mb-7">
                      <label className="w-full" for={`${location}-radio`}>
                        <input
                          id={`${location}-radio`}
                          className="mr-3"
                          type="radio"
                          name="location"
                          onClick={() => {
                            setCurrentLocation(location);
                          }}
                        ></input>
                        {location}
                      </label>
                      {location === currentLocation ? (
                        <button className="text-sm" onClick={handleCompleteLocation}>
                          Complete
                        </button>
                      ) : (
                        <></>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="flex flex-col w-full mx-10">
              <h3 className="text-center text-xl mb-5">.</h3>
              <input
                className="border p-2 mb-10"
                type="text"
                placeholder="Start Scanning"
                onKeyDown={(e) => handleScan(e)}
              ></input>
              <div className="flex flex-col w-full">
                <p className="text-lg mb-5 ml-5">Title: {bookTitle}</p>
                <p className="text-lg mb-5 ml-5">Author: {bookAuthor}</p>
                <p className="text-lg mb-5 ml-5">Location: {bookLocation}</p>
              </div>
              {allLocationsComplete ? (
                <button className="mt-auto" onClick={handleCompleteAudit}>
                  COMPLETE AUDIT
                </button>
              ) : (
                <></>
              )}
            </section>

            <section className="flex flex-col w-full mx-10">
              <h3 className="text-center text-xl mb-5">Instructions</h3>
              <ul className="text-lg">
                <li className="mb-5">1. Click to select a location</li>
                <li className="mb-5">2. Scan all books currently in that location</li>
                <li className="mb-5">
                  3. Click the 'Complete' button to mark location as done when all books have been scanned
                </li>
                <li className="mb-5">4. Repeat until all locations are done</li>
                <li className="mb-5">5. Mark audit as complete to generate a final report</li>
              </ul>
            </section>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center text-2xl mb-20">Last Audit Completed: {lastAuditCompletedDate}</h2>
          <div className="flex flex-row justify-center items-center">
            <button className="m-5" onClick={handleStartAudit}>
              Start New Audit
            </button>
            <button className="m-5" onClick={goToReports}>
              Go to Audit Reports
            </button>
          </div>
        </>
      )}
    </>
  );
}
