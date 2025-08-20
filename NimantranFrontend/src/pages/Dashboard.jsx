import React, { useContext } from 'react';
import UserDashboard from '../components/dashboard/UserDashboard';
import WholesalerDashboard from '../components/dashboard/WholesalerDashboard';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext); 

  if (!user) return <div>Loading...</div>;

  return (
    <div className="px-6 md:px-20 py-10 bg-background min-h-screen">
      {user.role === 'wholesaler' ? <WholesalerDashboard user={user} /> : <UserDashboard user={user} />}
    </div>
  );
};

export default Dashboard;
