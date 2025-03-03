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
  
  // States for modals and visibility toggles
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
  const [editingUser] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  const [currentPage] = useState(1);
  //const [totalPages, setTotalPages] = useState(0);

  // Fetch data for summary, activity, issued equipment, and equipment list
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
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  // Fetch the username of the logged-in admin
  const fetchUsername = async () => {
    try {
      const response = await api.get('/auth/me');
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  // Fetch data on component mount and when currentPage changes
  useEffect(() => {
    fetchUsername();
    fetchData();
  }, [currentPage, fetchData]);

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
          {showEquipmentList && <EquipmentList equipment={equipmentList} onEdit={setEditingEquipment} />}
          {showIssuedEquipment && <IssuedEquipment equipment={issuedEquipment} users={issuedEquipmentUsers} showIssuedEquipment={showIssuedEquipment} setShowIssuedEquipment={setShowIssuedEquipment} />}
          {showSendNotification && <SendNotificationSection showSendNotification={showSendNotification} setShowSendNotification={setShowSendNotification} />}
          {showAddEquipment && <AddEquipmentSection showAddEquipment={showAddEquipment} setShowAddEquipment={setShowAddEquipment} />}
          {showAssignEquipment && <AssignEquipmentSection showAssignEquipment={showAssignEquipment} setShowAssignEquipment={setShowAssignEquipment} />}
          {showUserManagement && <UserManagementSection users={users} showUserManagement={showUserManagement} setShowUserManagement={setShowUserManagement} />}
        </main>
      </div>

      {showEditEquipmentModal && <EditEquipmentModal equipment={editingEquipment} onClose={() => setShowEditEquipmentModal(false)} />}
      {showEditUserModal && <EditUserModal user={editingUser} onClose={() => setShowEditUserModal(false)} />}
    </div>
  );
};

export default AdminHomePage;
