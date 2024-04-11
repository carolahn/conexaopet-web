import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken, getUser } from '../utils/selectors';
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
import LoadingSpinner from '../components/LoadingSpinner';
import SearchPetsResults from '../pages/SearchPetsResults';
import SearchEventsResults from '../pages/SearchEventsResults';


const AppRoutes = () => {
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, [location, navigate]);

  return (
    <>
      {loading && <LoadingSpinner />}
   
      <Routes>
        <Route path="/" element={<Home user={user} token={token} />} />
        <Route path="/event" element={<Event user={user} token={token} />} />
        <Route path="/event/:id" element={<SingleEvent user={user} token={token}/>} />
        <Route path="/pet/:id" element={<SinglePet user={user} token={token}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/protector/:id" element={<ProfileProtector/>} />
        <Route path="/dashboard/protector/:id" element={<DashboardProtector user={user} token={token} />} />
        <Route path="/dashboard/member/:id" element={<DashboardMember user={user} token={token} />} />
        <Route path="/dashboard/sponsor/:id" element={<DashboardSponsor user={user} token={token} />} />
        <Route path="/search/pet" element={<SearchPetsResults user={user} token={token} />}/>
        <Route path="/search/event" element={<SearchEventsResults user={user} token={token} />}/>
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;