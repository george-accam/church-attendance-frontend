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

const AdminContainer = ({changeColor }) => {
  const [dues, setDues] = useState({});
  const [isTotalAmountByDate, setIsTotalAmountByDate] = useState({});
  const [isTotalAmount, setIsTotalAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [titheOnly, setTitheOnly] = useState({});
  const [welfareOnly, setWelfareOnly] = useState({});

  const category = "Tithe";

  // function to get tithe data
  const getAllWelfare = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await api.get('tithe-welfare');
      const { message, titheAndWelfareData } = response.data;
      if (message) {
        const filteredByDate = {};
        
        for (const date in titheAndWelfareData){
          filteredByDate[date] = titheAndWelfareData[date].filter((item) => item.category !== category);
        }
        setWelfareOnly(filteredByDate);
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
    setLoading(true);
    try {
      setLoading(true);
      const response = await api.get('tithe-welfare');
      const { message, titheAndWelfareData, totalAmountByDate, totalAmount } = response.data;
      if (message) {
        const filteredByDate = {};
        
        for (const date in titheAndWelfareData){
          filteredByDate[date] = titheAndWelfareData[date].filter((item) => item.category === category);
        }
        setTitheOnly(filteredByDate);
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
    setLoading(true);
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
  useEffect(() => {
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
              />
            }>
              <Route path='all' element={
                <All
                  dues={dues}
                  isTotalAmount={isTotalAmount}
                  isTotalAmountByDate={isTotalAmountByDate}
                  loading={loading}
                />
                } />
              <Route path='tithe' element={
                <Tithe 
                  titheOnly={titheOnly}
                  isTotalAmount={isTotalAmount}
                  isTotalAmountByDate={isTotalAmountByDate}
                  loading={loading}
                />
                } />
              <Route path='welfare' element={
                <Welfare 
                  welfareOnly={welfareOnly}
                  isTotalAmount={isTotalAmount}
                  isTotalAmountByDate={isTotalAmountByDate}
                  loading={loading}
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
              />
            } />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminContainer;