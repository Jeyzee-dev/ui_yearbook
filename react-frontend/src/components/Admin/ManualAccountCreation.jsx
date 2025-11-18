// src/components/Admin/ManualAccountCreation.jsx
import React, { useState } from 'react';
import './ManualAccountCreation.css';

const ManualAccountCreation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    profilePicture: null,
    
    // Academic Info
    studentNumber: '',
    batchYear: '',
    collegeDepartment: '',
    program: '',
    section: '',
    
    // Employment
    employmentStatus: '',
    currentJob: '',
    company: ''
  });

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Academic Info' },
    { number: 3, title: 'Employment' },
    { number: 4, title: 'Review' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: URL.createObjectURL(file)
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating alumni account:', formData);
    // Submit logic here
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Birth Date</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+63 XXX XXX XXXX"
                />
              </div>
              <div className="form-group full-width">
                <label>Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Complete address..."
                  rows="3"
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Profile Picture</label>
                <div className="profile-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="file-input"
                  />
                  <div className="upload-area">
                    {formData.profilePicture ? (
                      <img src={formData.profilePicture} alt="Profile Preview" />
                    ) : (
                      <div className="upload-placeholder">
                        <span>📷</span>
                        <p>Click to upload profile picture</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="step-content">
            <h3>Academic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Student Number *</label>
                <input
                  type="text"
                  name="studentNumber"
                  value={formData.studentNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Batch Year *</label>
                <select
                  name="batchYear"
                  value={formData.batchYear}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Batch</option>
                  {[2024, 2023, 2022, 2021, 2020].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select
                  name="collegeDepartment"
                  value={formData.collegeDepartment}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="CCS">College of Computer Studies</option>
                  <option value="CBM">College of Business and Management</option>
                  <option value="CTE">College of Teacher Education</option>
                  <option value="CCJE">College of Criminal Justice Education</option>
                  <option value="CAS">College of Arts and Sciences</option>
                  <option value="IF">Institute of Fisheries</option>
                </select>
              </div>
              <div className="form-group">
                <label>Program *</label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="step-content">
            <h3>Employment Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Employment Status *</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="seeking">Seeking Employment</option>
                </select>
              </div>
              {formData.employmentStatus === 'employed' && (
                <>
                  <div className="form-group">
                    <label>Current Position</label>
                    <input
                      type="text"
                      name="currentJob"
                      value={formData.currentJob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="step-content">
            <h3>Review Information</h3>
            <div className="review-section">
              <div className="review-item">
                <h4>Personal Information</h4>
                <p><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</p>
                <p><strong>Gender:</strong> {formData.gender}</p>
                <p><strong>Birth Date:</strong> {formData.birthDate}</p>
                <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                <p><strong>Address:</strong> {formData.address}</p>
              </div>
              <div className="review-item">
                <h4>Academic Information</h4>
                <p><strong>Student No:</strong> {formData.studentNumber}</p>
                <p><strong>Batch:</strong> {formData.batchYear}</p>
                <p><strong>Department:</strong> {formData.collegeDepartment}</p>
                <p><strong>Program:</strong> {formData.program}</p>
                <p><strong>Section:</strong> {formData.section}</p>
              </div>
              <div className="review-item">
                <h4>Employment Information</h4>
                <p><strong>Status:</strong> {formData.employmentStatus}</p>
                {formData.employmentStatus === 'employed' && (
                  <>
                    <p><strong>Position:</strong> {formData.currentJob}</p>
                    <p><strong>Company:</strong> {formData.company}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="manual-account-creation">
      <div className="creation-header">
        <h1>Manual Alumni Account Creation</h1>
        <p>Create alumni accounts manually for special cases or bulk imports</p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        {steps.map(step => (
          <div key={step.number} className={`step ${currentStep >= step.number ? 'active' : ''}`}>
            <div className="step-number">{step.number}</div>
            <span className="step-title">{step.title}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {renderStepContent()}
        
        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="btn-secondary">
              ← Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button type="button" onClick={nextStep} className="btn-primary">
              Next →
            </button>
          ) : (
            <button type="submit" className="btn-success">
              ✅ Create Alumni Account
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ManualAccountCreation;