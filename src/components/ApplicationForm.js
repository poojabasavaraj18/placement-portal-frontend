
import React, {
  useState,
  useEffect
} from "react";

import {
  applyToJob
} from "../services/applicationService";

import "./ApplicationForm.css";

function ApplicationForm({
  job,
  onClose,
  onSuccess,
  viewMode = false,
  data
}) {

  const [formData,
    setFormData] =
    useState({

    resume: null,
    name: "",
    email: "",
    phone: "",
    cgpa: "",
    skills: "",
    experience: "",
    coverLetter: "",

  });

  // PREFILL
  useEffect(() => {

    if (viewMode && data) {

      setFormData({

        resume: null,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        cgpa: data.cgpa || "",
        skills: data.skills || "",
        experience: data.experience || "",
        coverLetter:
          data.coverLetter || "",

      });

    }

  }, [viewMode, data]);

  // CHANGE
  const handleChange =
    (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  // FILE
  const handleFileChange =
    (e) => {

    setFormData({
      ...formData,
      resume:
        e.target.files[0]
    });

  };

  // SUBMIT
  const handleSubmit =
    async () => {

    if (viewMode) return;

    if (
      !formData.resume ||
      !formData.name ||
      !formData.email
    ) {

      alert(
        "Fill required fields!"
      );

      return;
    }

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    const form =
      new FormData();

    form.append(
      "studentId",
      user.id
    );

    form.append(
      "jobId",
      job.id
    );

    form.append(
      "resume",
      formData.resume
    );

    form.append(
      "name",
      formData.name
    );

    form.append(
      "email",
      formData.email
    );

    form.append(
      "phone",
      formData.phone
    );

    form.append(
      "cgpa",
      formData.cgpa
    );

    form.append(
      "skills",
      formData.skills
    );

    form.append(
      "experience",
      formData.experience
    );

    form.append(
      "coverLetter",
      formData.coverLetter
    );

    try {

      await applyToJob(form);

      alert(
        "✅ Applied Successfully"
      );

      onSuccess();

      onClose();

    }
    catch (err) {

      console.error(err);

      alert(
        "❌ Error applying"
      );

    }

  };

  return (

    <div className="form-overlay">

      <div className="application-modal">

        {/* HEADER */}
        <div className="form-header">

          <h2>

            {viewMode
              ? "Application Details"
              : `Apply for ${job.title}`}

          </h2>

        </div>

        {/* BODY */}
        <div className="form-body">

          {!viewMode && (

            <div className="upload-box">

              <label>
                Upload Resume
              </label>

              <input
                type="file"
                onChange={
                  handleFileChange
                }
              />

            </div>

          )}

          <div className="form-grid">

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={viewMode}
              placeholder="Full Name"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={viewMode}
              placeholder="Email"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={viewMode}
              placeholder="Phone"
            />

            <input
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              readOnly={viewMode}
              placeholder="CGPA"
            />

            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              readOnly={viewMode}
              placeholder="Skills"
            />

            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              readOnly={viewMode}
              placeholder="Experience"
            />

          </div>

          <textarea
            name="coverLetter"
            value={
              formData.coverLetter
            }
            onChange={handleChange}
            readOnly={viewMode}
            placeholder="Cover Letter"
          />

          {/* RESUME */}
          {viewMode &&
            data?.resumePath && (

            <a
              href={`http://localhost:8080/files/${data.resumePath}`}
              target="_blank"
              rel="noreferrer"
              className="resume-btn"
            >
              View Resume
            </a>

          )}

        </div>

        {/* FOOTER */}
        <div className="form-footer">

          {!viewMode && (

            <button
              className="submit-btn"
              onClick={handleSubmit}
            >
              Submit Application
            </button>

          )}

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

}

export default ApplicationForm;