// src/components/Admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    batch: 'all',
    verification: 'all'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filters]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.student_number.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    // Department filter
    if (filters.department !== 'all') {
      filtered = filtered.filter(user => user.college_department === filters.department);
    }

    // Batch filter
    if (filters.batch !== 'all') {
      filtered = filtered.filter(user => user.batch_year === parseInt(filters.batch));
    }

    // Verification filter
    if (filters.verification !== 'all') {
      filtered = filtered.filter(user => user.verified === (filters.verification === 'verified'));
    }

    setFilteredUsers(filtered);
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      setUsers(prev => prev.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Student No', 'Email', 'Batch', 'Department', 'Program', 'Status'];
    const csvData = filteredUsers.map(user => [
      `${user.first_name} ${user.last_name}`,
      user.student_number,
      user.email,
      user.batch_year,
      user.college_department,
      user.program,
      user.status
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alumni_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="user-management">
      <div className="management-header">
        <h1>User Management</h1>
        <p>Manage all alumni accounts and their status</p>
      </div>

      {/* Controls */}
      <div className="management-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by name, student number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select 
            value={filters.status} 
            onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          <select 
            value={filters.department} 
            onChange={(e) => setFilters(prev => ({...prev, department: e.target.value}))}
          >
            <option value="all">All Departments</option>
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
            <option value="all">All Batches</option>
            {Array.from({length: 20}, (_, i) => 2024 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select 
            value={filters.verification} 
            onChange={(e) => setFilters(prev => ({...prev, verification: e.target.value}))}
          >
            <option value="all">All Verification</option>
            <option value="verified">Verified Only</option>
            <option value="unverified">Unverified Only</option>
          </select>

          <button className="export-btn" onClick={exportToCSV}>
            📊 Export CSV
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Alumni</th>
              <th>Contact</th>
              <th>Academic Info</th>
              <th>Employment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.profile_picture ? (
                        <img src={user.profile_picture} alt={user.first_name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {user.first_name[0]}{user.last_name[0]}
                        </div>
                      )}
                    </div>
                    <div className="user-details">
                      <strong>{user.first_name} {user.last_name}</strong>
                      <span>ID: {user.student_number}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div>{user.email}</div>
                    <div>{user.phone_number}</div>
                  </div>
                </td>
                <td>
                  <div className="academic-info">
                    <div>Batch {user.batch_year}</div>
                    <div>{user.program}</div>
                    <div>{user.college_department}</div>
                  </div>
                </td>
                <td>
                  <div className="employment-info">
                    <span className={`employment-status ${user.employment_status}`}>
                      {user.employment_status}
                    </span>
                    {user.employment_status === 'employed' && (
                      <div className="company">{user.company}</div>
                    )}
                  </div>
                </td>
                <td>
                  <select 
                    value={user.status} 
                    onChange={(e) => handleStatusChange(user._id, e.target.value)}
                    className={`status-select ${user.status}`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="view-btn"
                      onClick={() => window.location.href = `/admin/users/${user._id}`}
                    >
                      👁️ View
                    </button>
                    <button className="edit-btn">✏️ Edit</button>
                    <button className="message-btn">💬 Message</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No users found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="pagination-btn">← Previous</button>
        <span className="pagination-info">Page 1 of 5</span>
        <button className="pagination-btn">Next →</button>
      </div>
    </div>
  );
};

export default UserManagement;