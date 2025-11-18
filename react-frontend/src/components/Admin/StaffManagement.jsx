// src/components/Admin/StaffManagement.jsx
import React, { useState } from 'react';
import './StaffManagement.css';

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@minsu.edu.ph',
      role: 'Administrator',
      department: 'IT Department',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@minsu.edu.ph',
      role: 'Moderator',
      department: 'Alumni Affairs',
      status: 'active',
      lastLogin: '2024-01-14T15:45:00Z'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'moderator',
    department: ''
  });

  const handleCreateStaff = (e) => {
    e.preventDefault();
    const staff = {
      id: staffMembers.length + 1,
      name: `${newStaff.firstName} ${newStaff.lastName}`,
      email: newStaff.email,
      role: newStaff.role,
      department: newStaff.department,
      status: 'active',
      lastLogin: new Date().toISOString()
    };
    
    setStaffMembers([...staffMembers, staff]);
    setShowCreateForm(false);
    setNewStaff({ firstName: '', lastName: '', email: '', role: 'moderator', department: '' });
  };

  const toggleStaffStatus = (staffId) => {
    setStaffMembers(staffMembers.map(staff => 
      staff.id === staffId 
        ? { ...staff, status: staff.status === 'active' ? 'inactive' : 'active' }
        : staff
    ));
  };

  return (
    <div className="staff-management">
      <div className="management-header">
        <div>
          <h1>Staff Management</h1>
          <p>Manage administrative staff accounts and permissions</p>
        </div>
        <button 
          className="create-staff-btn"
          onClick={() => setShowCreateForm(true)}
        >
          👨‍💼 Add Staff Member
        </button>
      </div>

      {/* Create Staff Form */}
      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Staff Account</h3>
              <button className="close-btn" onClick={() => setShowCreateForm(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateStaff}>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={newStaff.firstName}
                    onChange={(e) => setNewStaff({...newStaff, firstName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={newStaff.lastName}
                    onChange={(e) => setNewStaff({...newStaff, lastName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                  >
                    <option value="moderator">Moderator</option>
                    <option value="administrator">Administrator</option>
                    <option value="support">Support Staff</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                <button type="submit">Create Staff Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff List */}
      <div className="staff-list">
        <div className="staff-grid">
          {staffMembers.map(staff => (
            <div key={staff.id} className="staff-card">
              <div className="staff-avatar">
                {staff.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="staff-info">
                <h4>{staff.name}</h4>
                <p>{staff.email}</p>
                <div className="staff-meta">
                  <span className={`role-badge ${staff.role}`}>{staff.role}</span>
                  <span className="department">{staff.department}</span>
                </div>
                <div className="staff-status">
                  <span className={`status ${staff.status}`}>{staff.status}</span>
                  <span className="last-login">
                    Last login: {new Date(staff.lastLogin).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="staff-actions">
                <button className="edit-btn">Edit</button>
                <button 
                  className={`status-btn ${staff.status}`}
                  onClick={() => toggleStaffStatus(staff.id)}
                >
                  {staff.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="delete-btn">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;