import React, { useState } from 'react';
import './AlumniProfile.css';

const ProfileEdit = ({ alumni, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: alumni.fullName,
    email: alumni.email,
    phone: alumni.phone,
    address: alumni.address,
    currentCompany: alumni.currentCompany || '',
    position: alumni.position || '',
    employmentStatus: alumni.employmentStatus
  });
  const [profilePicture, setProfilePicture] = useState(alumni.profilePicture);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (formData.employmentStatus === 'employed') {
      if (!formData.currentCompany.trim()) {
        newErrors.currentCompany = 'Company name is required for employed status';
      }
      if (!formData.position.trim()) {
        newErrors.position = 'Position is required for employed status';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        ...formData,
        profilePicture
      });
      // onSave will handle the actual update and navigation
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-edit">
      <div className="edit-header">
        <h2>Edit Profile</h2>
        <p>Update your personal and professional information</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        {/* Profile Picture Upload */}
        <div className="form-section">
          <h3>Profile Picture</h3>
          <div className="avatar-upload">
            <div className="avatar-preview">
              <img src={profilePicture} alt="Profile Preview" />
            </div>
            <div className="upload-controls">
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <label htmlFor="profilePicture" className="upload-btn">
                <i className="fas fa-camera"></i>
                Change Photo
              </label>
              <p className="upload-hint">Recommended: 2x2 square image, max 2MB</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                placeholder="Enter your complete address"
                rows="3"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="form-section">
          <h3>Professional Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="employmentStatus">Employment Status *</label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
              >
                <option value="employed">Employed</option>
                <option value="unemployed">Seeking Opportunities</option>
              </select>
            </div>

            {formData.employmentStatus === 'employed' && (
              <>
                <div className="form-group">
                  <label htmlFor="currentCompany">Company *</label>
                  <input
                    type="text"
                    id="currentCompany"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    className={errors.currentCompany ? 'error' : ''}
                    placeholder="Enter company name"
                  />
                  {errors.currentCompany && <span className="error-message">{errors.currentCompany}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="position">Position *</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={errors.position ? 'error' : ''}
                    placeholder="Enter your position"
                  />
                  {errors.position && <span className="error-message">{errors.position}</span>}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Read-only Academic Information */}
        <div className="form-section">
          <h3>Academic Information</h3>
          <div className="read-only-info">
            <div className="info-item">
              <label>Batch Year</label>
              <span>{alumni.batchYear}</span>
            </div>
            <div className="info-item">
              <label>Program</label>
              <span>{alumni.program}</span>
            </div>
            <div className="info-item">
              <label>Department</label>
              <span>{alumni.department}</span>
            </div>
            <div className="info-item">
              <label>Section</label>
              <span>{alumni.section}</span>
            </div>
          </div>
          <p className="info-note">
            <i className="fas fa-info-circle"></i>
            Academic information cannot be modified. Contact admin for corrections.
          </p>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                Save Changes
              </>
            )}
          </button>
        </div>

        {errors.submit && (
          <div className="error-banner">
            <i className="fas fa-exclamation-triangle"></i>
            {errors.submit}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileEdit;