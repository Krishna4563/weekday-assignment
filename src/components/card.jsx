import React, { useEffect, useState } from "react";
import "./card.css";

const Card = () => {
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const [filteredjobs, setFilteredjobs] = useState([]);

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
        setSelected(result.jdList);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleJobFilter = (event) => {
    let category = event.target.value;

    if (category === "") {
      setJobData(selected);
    } else {
      const ans = selected.filter((job) => job.jobRole === category);
      setFilteredjobs(ans);
      setJobData(ans);
    }
  };

  const handleExpFilter = (event) => {
    let category = event.target.value;

    if (category === "") {
      if (filteredjobs.length > 0) {
        setJobData(filteredjobs);
      } else if (filteredjobs.length === 0 && filteredjobs.length === 0) {
        setJobData(selected);
      } else {
        setJobData(selected);
      }
    } else {
      const ans =
        filteredjobs.length > 0
          ? filteredjobs.filter(
              (job) =>
                job.minExp <= category <= job.maxExp &&
                category <= job.maxExp &&
                category >= job.minExp
            )
          : selected.filter(
              (job) =>
                job.minExp <= category <= job.maxExp &&
                category <= job.maxExp &&
                category >= job.minExp
            );
      setJobData(ans);
    }
  };

  const handleLocFilter = (event) => {
    let category = event.target.value;

    if (category === "") {
      if (filteredjobs.length > 0) {
        setJobData(filteredjobs);
      } else {
        setJobData(selected);
      }
    } else if (category === "remote") {
      const ans = selected.filter((job) => job.location === "remote");
      setJobData(ans);
    } else {
      const ans =
        filteredjobs.length > 0
          ? filteredjobs.filter((job) => job.location === category)
          : selected.filter((job) => job.location === category);
      setJobData(ans);
    }
  };

  const handleJobTypeFilter = (event) => {
    let category = event.target.value;

    if (category === "") {
      if (filteredjobs.length > 0) {
        setJobData(filteredjobs);
      } else {
        setJobData(selected);
      }
    } else if (category === "remote") {
      const filteredJobs = filteredjobs.length > 0 ? filteredjobs : selected;
      const ans = filteredJobs.filter((job) => job.location === "remote");
      setJobData(ans);
    } else {
      const filteredJobs = filteredjobs.length > 0 ? filteredjobs : selected;
      const ans = filteredJobs.filter((job) => job.location !== "remote");
      setJobData(ans);
    }
  };

  const handleSalaryFilter = (event) => {
    let category = event.target.value;

    if (category === "") {
      if (filteredjobs.length > 0) {
        setJobData(filteredjobs);
      } else if (filteredjobs.length === 0 && filteredjobs.length === 0) {
        setJobData(selected);
      } else {
        setJobData(selected);
      }
    } else {
      const ans =
        filteredjobs.length > 0
          ? filteredjobs.filter(
              (job) =>
                job.minJdSalary <= category <= job.maxJdSalary &&
                category <= job.maxJdSalary &&
                category >= job.minJdSalary
            )
          : selected.filter(
              (job) =>
                job.minJdSalary <= category <= job.maxJdSalary &&
                category <= job.maxJdSalary &&
                category >= job.minJdSalary
            );
      setJobData(ans);
    }
  };

  const handleCompanyFilter = (event) => {
    let searchTerm = event.target.value.trim().toLowerCase();

    if (searchTerm === "") {
      setJobData(selected);
    } else {
      const filteredJobs = selected.filter((job) =>
        job.companyName.toLowerCase().includes(searchTerm)
      );
      setJobData(filteredJobs);
    }
  };

  return (
    <div>
      <h1 className="App-title">Candidate Application Platform</h1>

      <div className="filter-menu">
        <select onChange={handleJobFilter}>
          <option value="">
            <p className="">Roles</p>
          </option>
          {[...new Set(selected.map((job) => job.jobRole))].map((jobRole) => (
            <option key={jobRole} value={jobRole}>
              {jobRole}
            </option>
          ))}
        </select>

        <select onChange={handleExpFilter}>
          <option value="">
            <p className="">Min Exp.</p>
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13 and above</option>
        </select>

        <select onChange={handleLocFilter}>
          <option value="">
            <p className="">Location</p>
          </option>
          {[...new Set(selected.map((job) => job.location))].map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select onChange={handleJobTypeFilter}>
          <option value="">
            <p className="">Job Type</p>
          </option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>

        <select onChange={handleSalaryFilter}>
          <option value="">
            <p className="">Min Base Pay.</p>
          </option>
          {[
            ...new Set(
              selected
                .map((job) => job.minJdSalary)
                .filter((salary) => salary !== null)
            ),
          ]
            .sort((a, b) => a - b)
            .map((salary) => (
              <option key={salary} value={salary}>
                {salary}K USD
              </option>
            ))}
        </select>

        <input
          type="text"
          placeholder="Search Company"
          onChange={handleCompanyFilter}
          className="search-input"
        />
      </div>

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
