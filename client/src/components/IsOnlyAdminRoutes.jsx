import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const IsOnlyAdminRoutes = () => {
  
 
  const { currentuser } = useSelector((state) => state.user);
  return currentuser && currentuser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/signin' />
  );

};

export default IsOnlyAdminRoutes;
