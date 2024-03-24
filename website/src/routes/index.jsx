import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Event from '../pages/Event';
import ProfileProtector from '../pages/ProfileProtector';
import DashboardProtector from '../pages/DashboardProtector';
import DashboardMember from '../pages/DashboardMember';
import DashboardSponsor from '../pages/DashboardSponsor';
import SinglePet from '../pages/SinglePet';
import SingleEvent from '../pages/SingleEvent';

const AppRoutes = () => {
  // const { token, user } = useSelector((state) => state);
  const tokenFromLocalStorage = localStorage.getItem('token');
  const userFromLocalStorage = localStorage.getItem('user');
  const token = useSelector((state) => state.authReducer.token || tokenFromLocalStorage);
  const user = useSelector((state) => state.authReducer.user || userFromLocalStorage);

  const isAuthenticated = true;
  const userType = 'patrocinador'; //protetor, patrocinador, membro, visitante
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event" element={<Event />} />
      <Route path="/event/:id" element={<SingleEvent />} />
      <Route path="/pet/:id" element={<SinglePet />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/protector/:id" element={<ProfileProtector/>} />
      <Route path="/dashboard/protector/:id" element={<DashboardProtector />} />
      <Route path="/dashboard/member/:id" element={<DashboardMember />} />
      <Route path="/dashboard/sponsor/:id" element={<DashboardSponsor />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default AppRoutes;