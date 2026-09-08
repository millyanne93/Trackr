import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
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
      const usersRes = await api.get('/api/users?page=1&limit=100');
      const [summaryRes, activityRes, issuedEquipmentRes, equipmentRes] = await Promise.all([
        api.get('/api/summary'),
        api.get('/api/activity'),
        api.get('/api/issued'),
        api.get('/api/equipment', { params: { page: currentPage } }),
      ]);

      const allUsers = usersRes.data?.users || [];
      setUsers(allUsers);

      const equipmentData = equipmentRes.data;
      if (Array.isArray(equipmentData)) {
        setEquipmentList(equipmentData);
      } else if (equipmentData && equipmentData.equipment) {
        setEquipmentList(equipmentData.equipment);
      } else {
        setEquipmentList([]);
      }

      setSummaryData(summaryRes.data);
      setActivityData(activityRes.data);
      setIssuedEquipment(issuedEquipmentRes.data);
      setLoading(false);

      const userPromises = issuedEquipmentRes.data.map(async (equipment) => {
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

  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      const res = await api.get(`/api/users?page=${page}&limit=${limit}`);
      setUsers(res.data?.users || []);
      setTotalPages(res.data?.totalPages || 0);
      setCurrentPage(res.data?.currentPage || 1);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setTotalPages(0);
    }
  };

  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  useEffect(() => {
    fetchUsername();
    fetchData();
    fetchUsers(currentPage);
  }, [currentPage]);

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
      fetchUsers(currentPage);
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
      fetchUsers(currentPage);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-home-page bg-forest-50 min-h-screen"> 
      <header className="bg-forest-600 text-white p-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">Welcome, {username}</h1>
      </header>

      <div className="flex">
        <nav className="bg-white shadow-md p-6 w-64 space-y-4">
          <button 
            className="block w-full bg-forest-600 text-white py-2 px-4 rounded-md hover:bg-forest-700 transition-colors" 
            onClick={() => setShowSummary(!showSummary)}
          >
            Summary
          </button>
          <button 
            className="block w-full bg-forest-600 text-white py-2 px-4 rounded-md hover:bg-forest-700 transition-colors" 
            onClick={() => setShowActivity(!showActivity)}
          >
            Activity Overview
          </button>
          <button 
            className="block w-full bg-forest-600 text-white py-2 px-4 rounded-md hover:bg-forest-700 transition-colors" 
            onClick={() => setShowEquipmentList(!showEquipmentList)}
          >
            Equipment List
          </button>
          <button 
            className="block w-full bg-forest-600 text-white py-2 px-4 rounded-md hover:bg-forest-700 transition-colors" 
            onClick={() => setShowIssuedEquipment(!showIssuedEquipment)}
          >
            Issued Equipment
          </button>
          <button 
            className="block w-full bg-forest-600 text-white py-2 px-4 rounded-md hover:bg-forest-700 transition-colors" 
            onClick={() => setShowSendNotification(!showSendNotification)}
          >
            Send Notification
          </button>
          <button 
            className="block w-full bg-forest-600 text-white py-2 px-4 rounded-md hover:bg-forest-700 transition-colors" 
            onClick={() => setShowAddEquipment(!showAddEquipment)}
          >
            Add Equipment
          </button>
          <button 
            className="block w-full bg-forest-600 text-white py-2 px-4 rounded-md hover:bg-forest-700 transition-colors" 
            onClick={() => setShowAssignEquipment(!showAssignEquipment)}
          >
            Assign Equipment
          </button>
          <button 
            className="block w-full bg-forest-600 text-white py-2 px-4 rounded-md hover:bg-forest-700 transition-colors" 
            onClick={() => setShowUserManagement(!showUserManagement)}
          >
            User Management
          </button>
        </nav>

        <main className="flex-grow p-8">
          {showSummary && <SummarySection summaryData={summaryData} showSummary={showSummary} setShowSummary={setShowSummary} />}
          {showActivity && <ActivityOverview activityData={activityData} showActivity={showActivity} setShowActivity={setShowActivity} />}
          {showEquipmentList && (
            <EquipmentList
              equipmentList={equipmentList}
              showEquipmentList={showEquipmentList}
              setShowEquipmentList={setShowEquipmentList}
              handleEditEquipment={(equipment) => {
                setEditingEquipment(equipment);
                setShowEditEquipmentModal(true);
              }}
              handleDeleteEquipment={handleDeleteEquipment}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
          {showIssuedEquipment && (
            <IssuedEquipment
              issuedEquipment={issuedEquipment} 
              issuedEquipmentUsers={issuedEquipmentUsers} 
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
              users={users || []} 
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
