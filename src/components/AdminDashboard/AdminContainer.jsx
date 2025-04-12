import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminMembersChecked from './AdminRouterPage/MembersChecked';
import AdminAllMembers from "./AdminRouterPage/AllMembers"
import AdminPersonal from "./AdminRouterPage/Personal"
import AdminRegister from "./AdminRouterPage/Register"
import AdminCheckIn from "./AdminRouterPage/CheckIn"
import AdminUshers from "./AdminRouterPage/Ushers"
import TitheAndWelfare from './AdminRouterPage/TitheAndWelfare';
import AIAnalyst from './AdminRouterPage/AIAnalyst';
import All from './AdminRouterPage/TitheAndWelfare/All';
import Tithe from './AdminRouterPage/TitheAndWelfare/Tithe';
import Welfare from './AdminRouterPage/TitheAndWelfare/Welfare';
import api from '../../API/Api';
import { handleError, handleSuccess } from '../../notifications/Notification';
import BarChart from './AdminRouterPage/BarChart';
import Revenue from './AdminRouterPage/BarChart/Revenue';
import Attendance from './AdminRouterPage/BarChart/Attendance';
import Members from './AdminRouterPage/BarChart/Members';

const AdminContainer = ({changeColor }) => {
  const [dues, setDues] = useState({});
  const [search, setSearch] = useState('');
  const [titheSearchResults, setTitheSearchResults] = useState({});
  const [welfareSearchResults, setWelfareSearchResults] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const [isTotalAmountByDate, setIsTotalAmountByDate] = useState({});
  const [isTotalAmount, setIsTotalAmount] = useState("");
  const [titheAmountByDate, setTitheAmountByDate] = useState({});
  const [titheAmount, setTitheAmount] = useState("");
  const [welfareAmountByDate, setWelfareAmountByDate] = useState({});
  const [welfareAmount, setWelfareAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [titheOnly, setTitheOnly] = useState({});
  const [welfareOnly, setWelfareOnly] = useState({});
  const [searchTotalAmountByDate, setSearchTotalAmountByDate] = useState({});
  const [searchTotalAmount, setSearchTotalAmount] = useState({});

  const [searchTitheTotalAmountByDate, setSearchTitheTotalAmountByDate] = useState({}); 
  const [searchTitheTotalAmount, setSearchTitheTotalAmount] = useState({});

  const [searchWelfareTotalAmountByDate, setSearchWelfareTotalAmountByDate] = useState({});
  const [searchWelfareTotalAmount, setSearchWelfareTotalAmount] = useState({});

  const [totalCheckIn, setTotalCheckIn] = useState("");
  const [totalCheckInByDate, setTotalCheckInByDate] = useState({});
  const [totalMembers, setTotalMembers] = useState("");
  const adminStored = JSON.parse(localStorage.getItem('admin'));
  

  const category = "Tithe";

  // function to handle update amount 
  const handleRenameData = async({ id, fullName, amount, category, close}) => {
    try {
      setIsSaving(true);
      if(!amount){
        handleError("amount is required");
        return;
      };

      const payload = {
        fullName,
        amount,
        category,
      }
      const response = await api.put(`tithe-welfare/${id}`, payload);
      const { message } = response.data;
      if (message) {
        handleSuccess(message);
      }
      setTimeout(() => {
        close();
        getAllDues();
        searchTitheAndWelfare();
        getAllTithe();
        getAllWelfare();
      }, 2000);
    } 
    catch (error) {
      if(error.response.data.message) {
        handleError(`error status: ${error.response.data.message}`);
      }
      else if(e.request) {
        handleError(`network error: ${error.request}`);
      }
      else {
        handleError(`error occurred: ${error.message}`);
      }
    }
    finally{
      setIsSaving(false);
    }
  };

  // function to handle delete amount
  const handleDeletedData = async({ id, close }) => {
    try {
      setIsSaving(true);
      const response = await api.delete(`tithe-welfare/${id}`); 
      const { message } = response.data;
      if (message) {
        handleSuccess(message);
      }
      setTimeout(() => {
        close();
        getAllDues();
        getAllTithe();
        getAllWelfare();
        searchTitheAndWelfare();
      }, 2000);
    } catch (error) {
      if(error.response.data.message) {
        handleError(`error status: ${error.response.data.message}`);
      }
      else if(e.request) {
        handleError(`network error: ${error.request}`);
      }
      else {
        handleError(`error occurred: ${error.message}`);
      }
    }
    finally{
      setIsSaving(false);
    }
  };
  
  // function to handle search tithe and welfare data
  const searchTitheAndWelfare = async () => {
    try {
      setIsSearching(true);
      const response = await api.get(`search-tithe-welfare?q=${search}`);
      
      // First check if response exists
      if (!response) {
        handleError("No response received from server");
        return;
      }
  
      // Then check if data exists
      if (!response.data) {
        handleError("No data in response");
        return;
      }
  
      const { 
        message, 
        titheAndWelfareData = {}, 
        totalAmountByDate = {}, 
        totalAmount = 0, 
        titheAmountByDate = {}, 
        totalTitheAmount = 0, 
        welfareAmountByDate = {}, 
        totalWelfareAmount = 0 
      } = response.data;
  
      // Check if we actually got data
      if (!titheAndWelfareData || Object.keys(titheAndWelfareData).length === 0) {
        handleError("No search results found");
        return;
      }
  
      // filter tithe and welfare data by category
      const filteredTitheByDate = {};
      const filteredWelfareByDate = {};
      
      for (const date in titheAndWelfareData) {
        filteredTitheByDate[date] = titheAndWelfareData[date].filter(
          (item) => item.category === "Tithe" // Explicitly filter for Tithe
        );
        filteredWelfareByDate[date] = titheAndWelfareData[date].filter(
          (item) => item.category === "Welfare" // Explicitly filter for Welfare
        );
      }
  
      if (message) {
        // Update state
        setTitheSearchResults(filteredTitheByDate);
        setWelfareSearchResults(filteredWelfareByDate); // Fixed: Use filtered welfare data
        setSearchResults(titheAndWelfareData);
    
        setSearchTotalAmountByDate(totalAmountByDate);
        setSearchTotalAmount(totalAmount);
    
        setSearchTitheTotalAmountByDate(titheAmountByDate);
        setSearchTitheTotalAmount(totalTitheAmount); // Fixed: Correct function name
        
        setSearchWelfareTotalAmountByDate(welfareAmountByDate);
        setSearchWelfareTotalAmount(totalWelfareAmount);
      }
      
  
    } catch (error) {
      console.error("Search error:", error);
      
      if (error?.response?.data?.message) {
        handleError(`Error: ${error.response.data.message}`);
      } else if (error?.request) {
        handleError("Network error: Could not reach server");
      } else {
        handleError(`Error: ${error.message}`);
      }
    } finally { 
      setIsSearching(false);
    }
  }
  
  // function to get tithe data
  const getAllWelfare = async () => {
    try {
      setLoading(true);
      const response = await api.get('tithe-welfare');
      const { message, titheAndWelfareData, welfareAmountByDate, totalWelfareAmount } = response.data;
      if (message) {
        const filteredByDate = {};
        
        for (const date in titheAndWelfareData){
          filteredByDate[date] = titheAndWelfareData[date].filter((item) => item.category !== category);
        }
        setWelfareOnly(filteredByDate);
        setWelfareAmount(totalWelfareAmount);
        setWelfareAmountByDate(welfareAmountByDate);
      } 
    } catch (error) {
      if(error.response.data.message) {
        handleError(`error status: ${error.response.data.message}`);
      }
      else if(e.request) {
        handleError(`network error: ${error.request}`);
      }
      else {
        handleError(`error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  // function to get tithe data
  const getAllTithe = async () => {
    try {
      setLoading(true);
      const response = await api.get('tithe-welfare');
      const { message, titheAndWelfareData, titheAmountByDate, totalTitheAmount } = response.data;
      if (message) {
        const filteredByDate = {};
        
        for (const date in titheAndWelfareData){
          filteredByDate[date] = titheAndWelfareData[date].filter((item) => item.category === category);
        }
        setTitheOnly(filteredByDate);
        setTitheAmountByDate(titheAmountByDate);
        setTitheAmount(totalTitheAmount);
      } 
    } catch (error) {
      if(error.response.data.message) {
        handleError(`error status: ${error.response.data.message}`);
      }
      else if(e.request) {
        handleError(`network error: ${error.request}`);
      }
      else {
        handleError(`error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  // function to get both tithe and welfare data
  const getAllDues = async () => {
    try {
      setLoading(true);
      const response = await api.get('tithe-welfare');
      const { message, titheAndWelfareData, totalAmountByDate, totalAmount } = response.data;
      if (message) {
        setIsTotalAmountByDate(totalAmountByDate);
        setIsTotalAmount(totalAmount);
        setDues(titheAndWelfareData);
      } 
    } catch (e) {
      if(e.response.data) {
        handleError(`error status: ${e.response.data.message}`);
      }
      else if(e.request) {
        handleError(`network error: ${e.request}`);
      }
      else {
        handleError(`error occurred: ${e.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleTotalCheckIns = async () => {
    try {
      setLoading(true);
      const response = await api.get(`search-checked-in-attendee?q=`);
      const { message, totalCheckIns, checkIns } = response.data;

      if (message) {
        setTotalCheckIn(totalCheckIns);
        setTotalCheckInByDate(checkIns);
      } 
    } catch (error) {
      if(error.response.data.message) {
        handleError(`error status: ${error.response.data.message}`);
      }
      else if(e.request) {
        handleError(`network error: ${error.request}`);
      }
      else {
        handleError(`error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAttendance = async () => {
    try {
      setLoading(true);
      const response = await api.get("attendees");
      const { attendance, message } = response.data;
      if (message) {
        const filteredAttendance = attendance.filter((member) => member.fullName !== adminStored.fullName);
        setTotalMembers(filteredAttendance.length);
      }
    } catch (error) {
      if(error.response.data.message) {
        handleError(`error status: ${error.response.data.message}`);
      }
      else if(e.request) {
        handleError(`network error: ${error.request}`);
      }
      else {
        handleError(`error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchTitheAndWelfare();
  }, [search]);
  
  useEffect(() => {
    handleTotalCheckIns();
    handleAttendance();
    getAllWelfare();
    getAllTithe();
    getAllDues();
  }, []);

  return (
    <div>
      <div className="user-content-container admin-content-container">
        <div className="user-content">
          <Routes>
            <Route path="/" element={<Navigate to="members-checked" replace />} />
            <Route path="members-checked" element={
              <AdminMembersChecked 
                changeColor={changeColor}
              />
              } />

            {/* tithe and  welfare */}
            <Route path="tithe-and-welfare" element={
              <TitheAndWelfare 
                changeColor={changeColor}
                search={search}
                isSearching={isSearching}
                setSearch={setSearch}
              />
            }>
              <Route path='all' element={
                <All
                  dues={dues}
                  isTotalAmount={isTotalAmount}
                  isTotalAmountByDate={isTotalAmountByDate}
                  loading={loading}
                  handleRenameData={handleRenameData}
                  handleDeletedData={handleDeletedData}
                  isSaving={isSaving}
                  isSearching={isSearching}
                  searchResults={searchResults}
                  searchTotalAmount={searchTotalAmount}
                  searchTotalAmountByDate={searchTotalAmountByDate}
                />
                } />
              <Route path='tithe' element={
                <Tithe 
                  titheOnly={titheOnly}
                  titheAmountByDate={titheAmountByDate}
                  titheAmount={titheAmount}
                  loading={loading}
                  titheSearchResults={titheSearchResults}
                  searchTitheTotalAmountByDate={searchTitheTotalAmountByDate}
                  searchTitheTotalAmount={searchTitheTotalAmount}
                  handleRenameData={handleRenameData}
                  handleDeletedData={handleDeletedData}
                  isSaving={isSaving}
                />
                } />
              <Route path='welfare' element={
                <Welfare 
                  welfareOnly={welfareOnly}
                  welfareAmountByDate={welfareAmountByDate}
                  welfareAmount={welfareAmount}
                  welfareSearchResults={welfareSearchResults}
                  searchWelfareTotalAmountByDate={searchWelfareTotalAmountByDate}
                  searchWelfareTotalAmount={searchWelfareTotalAmount}
                  loading={loading}
                  handleRenameData={handleRenameData}
                  handleDeletedData={handleDeletedData}
                  isSaving={isSaving}
                />
                } />
            </Route>

            <Route path="ushers" element={
              <AdminUshers 
                changeColor={changeColor}
              />
            } />
            <Route path="all-members" element={
              <AdminAllMembers
                changeColor={changeColor}
              />
            } />
            <Route path="personal" element={
              <AdminPersonal
                changeColor={changeColor}
              />
            } />
            <Route path="register-member" element={
              <AdminRegister
                changeColor={changeColor}
              />
            } />
            <Route path="check-in" element={
              <AdminCheckIn
                changeColor={changeColor}
              />
            } />
            <Route path="ai-analyst" element={
              <AIAnalyst
                changeColor={changeColor}
                totalAmount={isTotalAmount}
                isTotalAmountByDate={isTotalAmountByDate}
                totalCheckIn={totalCheckIn}
                totalCheckInByDate={totalCheckInByDate}
                totalMembers={totalMembers}
              />
            } />
            {/* bar chart */}
            <Route path="chart" element={
              <BarChart
                changeColor={changeColor}
              />
            }>
              <Route path="revenue" element={ 
                <Revenue />
              } />

              <Route path="attendance" element={
                <Attendance />
              } />
          </Route>
        </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminContainer;