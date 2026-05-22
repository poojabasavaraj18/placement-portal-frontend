

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getApplicationsByJob } from "../services/applicationService";

import "./ApplicantsPage.css";

const AUTH = {
  username: "admin",
  password: "admin123",
};

function ApplicantsPage() {

  const { jobId } = useParams();

  const [applicants, setApplicants] = useState([]);

  // FETCH APPLICATIONS
  useEffect(() => {

    getApplicationsByJob(jobId)

      .then((res) => {

        setApplicants(res.data);

      })

      .catch((err) => {

        console.error(err);

      });

  }, [jobId]);

  // UPDATE STATUS
  const updateStatus = (appId, status) => {

    axios.put(
      `http://localhost:8080/applications/${appId}/status?status=${status}`,
      {},
      { auth: AUTH }
    )

    .then(() => {

      getApplicationsByJob(jobId)

        .then((res) => {

          setApplicants(res.data);

        });

    })

    .catch((err) => {

      console.error(err);

      alert("Failed to update status");

    });

  };

  return (

    <div className="applicants-page">

      {/* EMPTY STATE */}
      {applicants.length === 0 ? (

        <div className="empty-state">

          No applicants found

        </div>

      ) : (

        <div className="applicants-grid">

          {applicants.map((app) => (

            <div
              key={app.id}
              className="applicant-card"
            >

              {/* TOP */}
              <div className="applicant-top">

                <div className="applicant-avatar">
                  👤
                </div>

                <div className="applicant-info">

                  <h2>
                    {app.name}
                  </h2>

                  <p>
                    {app.email}
                  </p>

                </div>

              </div>

              {/* DETAILS */}
              <div className="info-grid">

                <div className="info-box">

                  <span>Package</span>

                  <strong>
                    ₹{app.packageAmount || "120000"}
                  </strong>

                </div>

                <div className="info-box">

                  <span>Round</span>

                  <strong>
                    {app.status}
                  </strong>

                </div>

              </div>

              {/* STATUS UPDATE */}
              <select
                value={app.status}
                onChange={(e) =>
                  updateStatus(
                    app.id,
                    e.target.value
                  )
                }
                className="status-select"
              >

                <option value="APPLIED">
                  APPLIED
                </option>

                <option value="ROUND1">
                  ROUND 1
                </option>

                <option value="ROUND2">
                  ROUND 2
                </option>

                <option value="HR">
                  HR
                </option>

                <option value="SELECTED">
                  SELECTED
                </option>

                <option value="REJECTED">
                  REJECTED
                </option>

              </select>

              {/* BUTTONS */}
              <div className="action-buttons">

                <a
                  href={`http://localhost:8080/files/${app.resumePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-btn"
                >
                  View Resume
                </a>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default ApplicantsPage;