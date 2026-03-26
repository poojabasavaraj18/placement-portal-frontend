import React, { useState } from "react";
import ApplicationForm from "./ApplicationForm";

function JobCard({ job, applications = [], onApply }) {
  const [showForm, setShowForm] = useState(false);

  const isApplied = (applications || []).some(
    (app) => Number(app.jobPost?.id) === Number(job.id)
  );

  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h3>{job?.title}</h3>
      <p>Company: {job?.company?.name}</p>
      <p>Salary: {job?.salary}</p>

      {isApplied ? (
        <button disabled style={{ backgroundColor: "gray" }}>
          Applied
        </button>
      ) : (
        <button onClick={() => setShowForm(true)}>
          Apply
        </button>
      )}

      {showForm && (
        <ApplicationForm
          job={job}
          onClose={() => setShowForm(false)}
          onSuccess={onApply}
        />
      )}
    </div>
  );
}

export default JobCard;