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

  const [showSummary, setShowSummary] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showEquipmentList, setShowEquipmentList] = useState(false);
  const [showIssuedEquipment, setShowIssuedEquipment] = useState(false);
  const [showSendNotification, setShowSendNotification] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [showAssignEquipment, setShowAssignEquipment] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [showEditEquipmentModal, setShowEditEquipmentModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const [summaryRes, activityRes, issuedRes, equipmentRes, usersRes] = await Promise.all([
        api.get('/api/summary'),
        api.get('/api/activity'),
        api.get('/api/issued'),
        api.get('/api/equipment', { params: { page: currentPage } }),
        api.get('/api/users'),
      ]);

      setSummaryData(summaryRes.data);
      setActivityData(activityRes.data);
      setIssuedEquipment(issuedRes.data);
      setEquipmentList(equipmentRes.data);
      setUsers(usersRes.data);

      // Fetch users for issued equipment
      const userPromises = issuedRes.data.map(async (equipment) => {
        if (equipment.checkedOutBy) {
          try {
            const userRes = await api.get(`/api/users/${equipment.checkedOutBy}`);
            return userRes.data;
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.warn(`User with ID ${equipment.checkedOutBy} not found.`);
              return { username: 'User Deleted' };
            } else {
              console.error('Error fetching user:', error);
              return null;
            }
          }
        }
        return null;
      });

      const resolvedUsers = await Promise.all(userPromises);
      setIssuedEquipmentUsers(resolvedUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchUsername = async () => {
    try {
      const response = await api.get('/api/user/me');
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  useEffect(() => {
    fetchUsername();
    fetchData();
  }, [currentPage, fetchData]);

  const handleDeleteEquipment = async (equipmentId) => {
    try {
      await api.delete(`/api/equipment/${equipmentId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  const handleEditEquipment = (equipment) => {
    setEditingEquipment(equipment);
    setShowEditEquipmentModal(true);
  };

  const handleUpdateEquipment = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/equipment/${editingEquipment._id}`, {
        name: editingEquipment.name,
        status: editingEquipment.status,
      });
      setShowEditEquipmentModal(false);
      fetchData();
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/api/users/${userId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/users/${editingUser._id}`, {
        username: editingUser.username,
        role: editingUser.role,
      });
      setShowEditUserModal(false);
      fetchData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-home-page bg-gray-100 min-h-screen">
      <header className="bg-teal-600 text-white p-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">Welcome, {username}</h1>
        <LogoutButton />
      </header>

      <div className="flex">
        <nav className="bg-white shadow-md p-6 w-64 space-y-4">
          <button className="block w-full bg-teal-500 text-white py-2 px-4 rounded-md" onClick={() => setShowSummary(!showSummary)}>Summary</button>
          <button className="block w-full bg-blue-500 text-white py-2 px-4 rounded-md" onClick={() => setShowActivity(!showActivity)}>Activity Overview</button>
          <button className="block w-full bg-green-500 text-white py-2 px-4 rounded-md" onClick={() => setShowEquipmentList(!showEquipmentList)}>Equipment List</button>
          <button className="block w-full bg-purple-500 text-white py-2 px-4 rounded-md" onClick={() => setShowIssuedEquipment(!showIssuedEquipment)}>Issued Equipment</button>
          <button className="block w-full bg-yellow-500 text-white py-2 px-4 rounded-md" onClick={() => setShowSendNotification(!showSendNotification)}>Send Notification</button>
          <button className="block w-full bg-pink-500 text-white py-2 px-4 rounded-md" onClick={() => setShowAddEquipment(!showAddEquipment)}>Add Equipment</button>
          <button className="block w-full bg-indigo-500 text-white py-2 px-4 rounded-md" onClick={() => setShowAssignEquipment(!showAssignEquipment)}>Assign Equipment</button>
          <button className="block w-full bg-red-500 text-white py-2 px-4 rounded-md" onClick={() => setShowUserManagement(!showUserManagement)}>User Management</button>
        </nav>

        <main className="flex-grow p-8">
          {showSummary && <SummarySection data={summaryData} showSummary={showSummary} setShowSummary={setShowSummary} />}
          {showActivity && <ActivityOverview data={activityData} showActivity={showActivity} setShowActivity={setShowActivity} />}
          {showEquipmentList && (
            <EquipmentList
              equipment={equipmentList}
              showEquipmentList={showEquipmentList}
              setShowEquipmentList={setShowEquipmentList}
              handleEditEquipment={handleEditEquipment}
              handleDeleteEquipment={handleDeleteEquipment}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
          {showIssuedEquipment && (
            <IssuedEquipment
              equipment={issuedEquipment}
              users={issuedEquipmentUsers}
              showIssuedEquipment={showIssuedEquipment}
              setShowIssuedEquipment={setShowIssuedEquipment}
            />
          )}
          {showSendNotification && <SendNotificationSection showSendNotification={showSendNotification} setShowSendNotification={setShowSendNotification} />}
          {showAddEquipment && <AddEquipmentSection showAddEquipment={showAddEquipment} setShowAddEquipment={setShowAddEquipment} />}
          {showAssignEquipment && (
            <AssignEquipmentSection
              showAssignEquipment={showAssignEquipment}
              setShowAssignEquipment={setShowAssignEquipment}
              users={users}
              equipmentList={equipmentList}
              fetchData={fetchData}
            />
          )}
          {showUserManagement && (
            <UserManagementSection
              users={users}
              showUserManagement={showUserManagement}
              setShowUserManagement={setShowUserManagement}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </main>
      </div>

      {showEditEquipmentModal && (
        <EditEquipmentModal
          equipment={editingEquipment}
          setEditingEquipment={setEditingEquipment}
          showEditEquipmentModal={showEditEquipmentModal}
          setShowEditEquipmentModal={setShowEditEquipmentModal}
          handleUpdateEquipment={handleUpdateEquipment}
        />
      )}
      {showEditUserModal && (
        <EditUserModal
          user={editingUser}
          setEditingUser={setEditingUser}
          showEditUserModal={showEditUserModal}
          setShowEditUserModal={setShowEditUserModal}
          handleUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default AdminHomePage;
