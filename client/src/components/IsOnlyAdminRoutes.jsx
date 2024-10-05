import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const IsOnlyAdminRoutes = () => {
  const {currentuser} = useSelector((state) => state?.user);

  console.log('Current user in IsOnlyAdminRoutes:', currentuser);

 
  return (
    <div>
      { currentuser && currentuser.isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to="/signin" />
      )}
    </div>
  );
};

export default IsOnlyAdminRoutes;
 