// src/components/Admin/VerificationQueue.jsx
import React, { useState, useEffect } from 'react';
import './VerificationQueue.css';

const VerificationQueue = () => {
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [filters, setFilters] = useState({
    department: '',
    batch: '',
    program: ''
  });

  useEffect(() => {
    fetchPendingAlumni();
  }, [filters]);

  const fetchPendingAlumni = async () => {
    try {
      // Mock data with batches only from 2020-2024
      const mockData = [
        {
          _id: '1',
          student_number: '2020-00123',
          first_name: 'Juan',
          middle_name: 'Dela',
          last_name: 'Cruz',
          profile_picture: '',
          diploma_front: '',
          gender: 'Male',
          phone_number: '+63 912 345 6789',
          address: 'Calapan City, Oriental Mindoro',
          batch_year: 2020,
          college_department: 'CCS',
          program: 'BS Computer Science',
          section: 'A',
          employment_status: 'employed',
          current_job: 'Software Developer',
          company: 'Tech Solutions Inc.',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          _id: '2',
          student_number: '2021-00234',
          first_name: 'Maria',
          middle_name: 'Santos',
          last_name: 'Reyes',
          profile_picture: '',
          diploma_front: '',
          gender: 'Female',
          phone_number: '+63 917 654 3210',
          address: 'Roxas, Oriental Mindoro',
          batch_year: 2021,
          college_department: 'CBM',
          program: 'BS Business Administration',
          section: 'B',
          employment_status: 'unemployed',
          current_job: '',
          company: '',
          createdAt: '2024-01-14T15:45:00Z'
        }
      ];
      
      // Filter based on selected filters
      let filtered = mockData;
      if (filters.department) {
        filtered = filtered.filter(alumni => alumni.college_department === filters.department);
      }
      if (filters.batch) {
        filtered = filtered.filter(alumni => alumni.batch_year === parseInt(filters.batch));
      }
      
      setPendingAlumni(filtered);
    } catch (error) {
      console.error('Error fetching pending alumni:', error);
    }
  };

  const handleApprove = async (alumniId, batchAction = false) => {
    try {
      console.log('Approving alumni:', alumniId);
      if (!batchAction) {
        setPendingAlumni(prev => prev.filter(alumni => alumni._id !== alumniId));
        setSelectedAlumni(null);
      }
    } catch (error) {
      console.error('Error approving alumni:', error);
    }
  };

  const handleReject = async (alumniId, reason) => {
    try {
      console.log('Rejecting alumni:', alumniId, 'Reason:', reason);
      setPendingAlumni(prev => prev.filter(alumni => alumni._id !== alumniId));
      setSelectedAlumni(null);
    } catch (error) {
      console.error('Error rejecting alumni:', error);
    }
  };

  const bulkApprove = async (alumniList) => {
    try {
      console.log('Bulk approving:', alumniList);
      setPendingAlumni(prev => prev.filter(alumni => !alumniList.includes(alumni)));
    } catch (error) {
      console.error('Error bulk approving:', error);
    }
  };

  return (
    <div className="verification-queue">
      <div className="queue-header">
        <h1>Alumni Verification Queue</h1>
        <p>Review and verify alumni registration applications</p>
      </div>

      {/* Filters */}
      <div className="verification-filters">
        <select 
          value={filters.department} 
          onChange={(e) => setFilters(prev => ({...prev, department: e.target.value}))}
        >
          <option value="">All Departments</option>
          <option value="CCS">College of Computer Studies</option>
          <option value="CBM">College of Business and Management</option>
          <option value="CTE">College of Teacher Education</option>
          <option value="CCJE">College of Criminal Justice Education</option>
          <option value="CAS">College of Arts and Sciences</option>
          <option value="IF">Institute of Fisheries</option>
        </select>

        <select 
          value={filters.batch} 
          onChange={(e) => setFilters(prev => ({...prev, batch: e.target.value}))}
        >
          <option value="">All Batches</option>
          {[2024, 2023, 2022, 2021, 2020].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <button 
          className="bulk-approve-btn"
          onClick={() => bulkApprove(pendingAlumni)}
          disabled={pendingAlumni.length === 0}
        >
          ✅ Approve All ({pendingAlumni.length})
        </button>
      </div>

      {/* Alumni List */}
      <div className="verification-layout">
        <div className="alumni-list">
          <h3>Pending Applications ({pendingAlumni.length})</h3>
          {pendingAlumni.map(alumni => (
            <div 
              key={alumni._id}
              className={`alumni-item ${selectedAlumni?._id === alumni._id ? 'selected' : ''}`}
              onClick={() => setSelectedAlumni(alumni)}
            >
              <div className="alumni-avatar">
                {alumni.profile_picture ? (
                  <img src={alumni.profile_picture} alt={alumni.first_name} />
                ) : (
                  <div className="avatar-placeholder">
                    {alumni.first_name[0]}{alumni.last_name[0]}
                  </div>
                )}
              </div>
              <div className="alumni-info">
                <h4>{alumni.first_name} {alumni.last_name}</h4>
                <p>{alumni.program} • Batch {alumni.batch_year}</p>
                <span className="submission-date">
                  Submitted: {new Date(alumni.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Panel */}
        <div className="verification-panel">
          {selectedAlumni ? (
            <div className="verification-details">
              <div className="details-header">
                <h2>Verify Alumni</h2>
                <span className="application-id">ID: {selectedAlumni.student_number}</span>
              </div>

              {/* Documents Review */}
              <div className="documents-section">
                <h3>Documents Review</h3>
                <div className="documents-grid">
                  <div className="document-item">
                    <h4>2x2 Profile Picture</h4>
                    <div className="document-image-placeholder">
                      {selectedAlumni.profile_picture ? (
                        <img src={selectedAlumni.profile_picture} alt="Profile" />
                      ) : (
                        <div className="no-document">No Image Uploaded</div>
                      )}
                    </div>
                  </div>
                  <div className="document-item">
                    <h4>Diploma Front Page</h4>
                    <div className="document-image-placeholder">
                      {selectedAlumni.diploma_front ? (
                        <img src={selectedAlumni.diploma_front} alt="Diploma" />
                      ) : (
                        <div className="no-document">No Image Uploaded</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alumni Information */}
              <div className="info-sections">
                <div className="info-section">
                  <h4>Personal Information</h4>
                  <div className="info-grid">
                    <div><strong>Full Name:</strong> {selectedAlumni.first_name} {selectedAlumni.middle_name} {selectedAlumni.last_name}</div>
                    <div><strong>Gender:</strong> {selectedAlumni.gender}</div>
                    <div><strong>Phone:</strong> {selectedAlumni.phone_number}</div>
                    <div><strong>Address:</strong> {selectedAlumni.address}</div>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Academic Information</h4>
                  <div className="info-grid">
                    <div><strong>Student No:</strong> {selectedAlumni.student_number}</div>
                    <div><strong>Batch Year:</strong> {selectedAlumni.batch_year}</div>
                    <div><strong>Department:</strong> {selectedAlumni.college_department}</div>
                    <div><strong>Program:</strong> {selectedAlumni.program}</div>
                    <div><strong>Section:</strong> {selectedAlumni.section}</div>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Employment Status</h4>
                  <div className="info-grid">
                    <div><strong>Status:</strong> {selectedAlumni.employment_status}</div>
                    {selectedAlumni.employment_status === 'employed' && (
                      <>
                        <div><strong>Position:</strong> {selectedAlumni.current_job}</div>
                        <div><strong>Company:</strong> {selectedAlumni.company}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="verification-actions">
                <button 
                  className="approve-btn"
                  onClick={() => handleApprove(selectedAlumni._id)}
                >
                  ✅ Approve & Activate
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => handleReject(selectedAlumni._id, 'Document verification failed')}
                >
                  ❌ Reject Application
                </button>
                <button className="request-info-btn">
                  📧 Request More Information
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <div className="placeholder-icon">👆</div>
              <h3>Select an application to verify</h3>
              <p>Click on an alumni from the list to review their details and documents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationQueue;