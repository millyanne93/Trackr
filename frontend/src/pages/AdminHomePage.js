import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import LogoutButton from '../components/LogoutButton';
import SummarySection from '../admin/SummarySection';
import ActivityOverview from '../admin/ActivityOverview';
import EquipmentList from '../admin/EquipmentList';
import IssuedEquipment from '../admin/IssuedEquipment';
import SendNotificationSection from '../admin/SendNotificationSection';
import AddEquipmentSection from '../admin/AddEquipmentSection';
import AssignEquipmentSection from '../admin/AssignEquipmentSection';
import UserManagementSection from '../admin/UserManagementSection';
import EditEquipmentModal from '../admin/EditEquipmentModal';
import EditUserModal from '../admin/EditUserModal';

const AdminHomePage = () => {
  const [summaryData, setSummaryData] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [issuedEquipment, setIssuedEquipment] = useState([]);
  const [issuedEquipmentUsers, setIssuedEquipmentUsers] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [showEditEquipmentModal, setShowEditEquipmentModal] = useState(false);
  const [showEquipmentList, setShowEquipmentList] = useState(false);
  const [showSendNotification, setShowSendNotification] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showIssuedEquipment, setShowIssuedEquipment] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAssignEquipment, setShowAssignEquipment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  // ✅ Memoize the fetchData function using useCallback to avoid infinite loops
  const fetchData = useCallback(async () => {
    try {
      const [summaryRes, activityRes, issuedRes, equipmentRes, usersRes] = await Promise.all([
        api.get('/summary'),
        api.get('/activity'),
        api.get('/issued-equipment'),
        api.get('/equipment', { params: { page: currentPage } }),
        api.get('/users'),
      ]);

      setSummaryData(summaryRes.data);
      setActivityData(activityRes.data);
      setIssuedEquipment(issuedRes.data.equipment);
      setIssuedEquipmentUsers(issuedRes.data.users);
      setEquipmentList(equipmentRes.data.equipment);
      setTotalPages(equipmentRes.data.totalPages);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]); // ✅ Dependencies ensure re-fetching only when currentPage changes

  // ✅ Fetch the username of the logged-in admin
  const fetchUsername = async () => {
    try {
      const response = await api.get('/auth/me');
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  // ✅ useEffect now safely includes fetchData without causing an infinite loop
  useEffect(() => {
    fetchUsername();
    fetchData();
  }, [currentPage, fetchData]); // ✅ No warning, properly optimized

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle editing equipment
  const handleEditEquipment = (equipment) => {
    setEditingEquipment(equipment);
    setShowEditEquipmentModal(true);
  };

  // Handle editing user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-home-page">
      <header>
        <h1>Welcome, {username}</h1>
        <LogoutButton />
      </header>

      <nav>
        <button onClick={() => setShowSummary(!showSummary)}>Summary</button>
        <button onClick={() => setShowActivity(!showActivity)}>Activity Overview</button>
        <button onClick={() => setShowEquipmentList(!showEquipmentList)}>Equipment List</button>
        <button onClick={() => setShowIssuedEquipment(!showIssuedEquipment)}>Issued Equipment</button>
        <button onClick={() => setShowSendNotification(!showSendNotification)}>Send Notification</button>
        <button onClick={() => setShowAddEquipment(!showAddEquipment)}>Add Equipment</button>
        <button onClick={() => setShowAssignEquipment(!showAssignEquipment)}>Assign Equipment</button>
        <button onClick={() => setShowUserManagement(!showUserManagement)}>User Management</button>
      </nav>

      {showSummary && <SummarySection data={summaryData} />}
      {showActivity && <ActivityOverview data={activityData} />}
      {showEquipmentList && (
        <EquipmentList
          equipment={equipmentList}
          onEdit={handleEditEquipment}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {showIssuedEquipment && (
        <IssuedEquipment
          equipment={issuedEquipment}
          users={issuedEquipmentUsers}
        />
      )}
      {showSendNotification && <SendNotificationSection />}
      {showAddEquipment && <AddEquipmentSection onAdd={() => fetchData()} />}
      {showAssignEquipment && <AssignEquipmentSection />}
      {showUserManagement && (
        <UserManagementSection
          users={users}
          onEdit={handleEditUser}
        />
      )}

      {showEditEquipmentModal && (
        <EditEquipmentModal
          equipment={editingEquipment}
          onClose={() => setShowEditEquipmentModal(false)}
          onSave={() => {
            fetchData();
            setShowEditEquipmentModal(false);
          }}
        />
      )}

      {showEditUserModal && (
        <EditUserModal
          user={editingUser}
          onClose={() => setShowEditUserModal(false)}
          onSave={() => {
            fetchData();
            setShowEditUserModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminHomePage;
