import React, { useEffect, useState } from "react";
import "./card.css";

const Card = () => {
  const [jobData, setJobData] = useState([]);

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

  return (
    <div>
      <ul>
        {jobData.map((job) => (
          <li key={job.jdUid}>
            <p>Job Role: {job.jobRole}</p>
            <p>Location: {job.location}</p>
            <p>Min - Experience: {job.minExp}</p>
            <p>Max - Experience: {job.maxExp}</p>
            <p>
              Salary: {job.minJdSalary} - {job.maxJdSalary}{" "}
              {job.salaryCurrencyCode}
            </p>
            <p>
              Link:{" "}
              <a href={job.jdLink} target="_blank" rel="noopener noreferrer">
                {job.jdLink}
              </a>
            </p>
            <p>Details: {job.jobDetailsFromCompany}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
