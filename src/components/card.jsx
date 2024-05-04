import React, { useEffect, useState } from "react";
import "./card.css";

const Card = () => {
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 10,
        offset: 0,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      try {
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setJobData(result.jdList);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div>
      {error && <p>Error: {error}</p>}

      <ul className="card-div">
        {jobData.map((job) => (
          <li key={job.jdUid} className="card">
            <div className="company-details-div">
              <div className="logo-div">
                <img src={job.logoUrl} alt="logo" className="company-logo" />
              </div>
              <div className="company-details">
                <p className="company-name">{job.companyName}</p>
                <p className="role-name">
                  {capitalizeFirstLetter(job.jobRole)} Engineer
                </p>
                <p className="city-name">
                  {capitalizeFirstLetter(job.location)}
                </p>
              </div>
            </div>

            {job.minJdSalary !== null && job.maxJdSalary !== null ? (
              <div className="salary-div">
                <p className="salary">
                  Estimated Salary: {job.minJdSalary} - {job.maxJdSalary}K{" "}
                  {job.salaryCurrencyCode}{" "}
                </p>
                <p>&#x2705;</p>
              </div>
            ) : null}

            <div className="jd-div">
              <p className="p1">About Company:</p>
              <p className="p2">About us</p>
              <p className="jd">{job.jobDetailsFromCompany}</p>
            </div>

            {job.minExp !== null && job.maxExp !== null ? (
              <div className="experience-div">
                <p className="exp-title">Minimum Experience</p>
                <p className="exp">
                  {job.minExp} - {job.maxExp} years
                </p>
              </div>
            ) : null}

            <div className="apply-div">
              <a href={job.jdLink} target="_blank" rel="noopener noreferrer">
                <button className="apply-btn">
                  <p className="apply-text">⚡Easy Apply</p>
                </button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
