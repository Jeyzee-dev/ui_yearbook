import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    profilePicturePreview: null,
    diploma: null,
    diplomaPreview: null,
    fullName: '',
    locationAddress: '',
    cellphoneNo: '',
    gender: '',
    batchYear: '',
    program: '',
    department: '',
    section: '',
    employmentStatus: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if ((name === 'profilePicture' || name === 'diploma') && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'profilePicture') {
          setFormData(prev => ({
            ...prev,
            profilePicture: file,
            profilePicturePreview: reader.result
          }));
        } else if (name === 'diploma') {
          setFormData(prev => ({
            ...prev,
            diploma: file,
            diplomaPreview: reader.result
          }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // TODO: Implement actual registration logic with backend
    // For now, simulate registration
    setTimeout(() => {
      setLoading(false);
      // Navigate to login after successful registration
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    }, 1500);
  };

  const batchYears = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 50; year--) {
    batchYears.push(year);
  }

  const programs = [
    'BS Computer Science',
    'BS Information Technology',
    'BS Business Administration',
    'BS Education',
    'BS Engineering',
    'BS Nursing',
    'BS Agriculture',
    'BS Fisheries',
    'BS Criminology',
    'BS Psychology'
  ];

  const departments = [
    'College of Information Technology',
    'College of Business',
    'College of Education',
    'College of Engineering',
    'College of Nursing',
    'College of Agriculture',
    'College of Fisheries',
    'College of Criminal Justice',
    'College of Arts and Sciences'
  ];

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <img 
              src="https://tse3.mm.bing.net/th/id/OIP.tMmFZwBZrMx31lmMpteDpQHaHa?pid=Api&P=0&h=220" 
              alt="MinSU Logo" 
              className="register-logo"
            />
            <h1>Create Your Account</h1>
            <p>Join the MinSU E-YearBook community</p>
          </div>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            {/* Profile Picture Upload */}
            <div className="form-group profile-picture-group">
              <label htmlFor="profilePicture">
                <i className="fas fa-user-circle"></i>
                Profile Picture (2x2) *
              </label>
              <div className="profile-picture-upload">
                <div className="profile-preview">
                  {formData.profilePicturePreview ? (
                    <img src={formData.profilePicturePreview} alt="Preview" />
                  ) : (
                    <div className="profile-placeholder">
                      <i className="fas fa-camera"></i>
                      <span>Upload 2x2 Photo</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input"
                  required
                />
                <label htmlFor="profilePicture" className="file-label">
                  Choose Photo
                </label>
              </div>
            </div>

            {/* Diploma Upload */}
            <div className="form-group diploma-upload-group">
              <label htmlFor="diploma">
                <i className="fas fa-certificate"></i>
                Diploma Upload *
              </label>
              <div className="diploma-upload">
                {formData.diplomaPreview ? (
                  <div className="diploma-preview">
                    <img src={formData.diplomaPreview} alt="Diploma Preview" />
                    <button 
                      type="button"
                      className="remove-file"
                      onClick={() => setFormData(prev => ({ ...prev, diploma: null, diplomaPreview: null }))}
                    >
                      <i className="fas fa-times"></i> Remove
                    </button>
                  </div>
                ) : (
                  <div className="diploma-placeholder">
                    <i className="fas fa-file-pdf"></i>
                    <p>Upload your diploma (PDF or Image)</p>
                    <input
                      type="file"
                      id="diploma"
                      name="diploma"
                      accept="image/*,.pdf"
                      onChange={handleChange}
                      className="file-input"
                      required
                    />
                    <label htmlFor="diploma" className="file-label">
                      Choose Diploma File
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">
                <i className="fas fa-user"></i>
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Location Address */}
            <div className="form-group">
              <label htmlFor="locationAddress">
                <i className="fas fa-map-marker-alt"></i>
                Location Address *
              </label>
              <input
                type="text"
                id="locationAddress"
                name="locationAddress"
                value={formData.locationAddress}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            {/* Cellphone Number */}
            <div className="form-group">
              <label htmlFor="cellphoneNo">
                <i className="fas fa-phone"></i>
                Cellphone Number *
              </label>
              <input
                type="tel"
                id="cellphoneNo"
                name="cellphoneNo"
                value={formData.cellphoneNo}
                onChange={handleChange}
                placeholder="+63 912 345 6789"
                required
              />
            </div>

            {/* Gender and Batch Year Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">
                  <i className="fas fa-venus-mars"></i>
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="batchYear">
                  <i className="fas fa-graduation-cap"></i>
                  Batch Year *
                </label>
                <select
                  id="batchYear"
                  name="batchYear"
                  value={formData.batchYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Batch Year</option>
                  {batchYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Program and Department Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="program">
                  <i className="fas fa-book"></i>
                  Program *
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Program</option>
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="department">
                  <i className="fas fa-building"></i>
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section and Employment Status Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="section">
                  <i className="fas fa-users"></i>
                  Former Section *
                </label>
                <input
                  type="text"
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="e.g., CS-4A, IT-3B"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="employmentStatus">
                  <i className="fas fa-briefcase"></i>
                  Employment Status *
                </label>
                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password and Confirm Password Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <i className="fas fa-lock"></i>
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="register-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="login-link">
                Sign in here
              </Link>
            </p>
            <Link to="/" className="back-home">
              <i className="fas fa-arrow-left"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

