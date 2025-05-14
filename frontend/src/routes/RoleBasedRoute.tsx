import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  allowedRoles: string[];
}

const RoleBasedRoute = ({ allowedRoles }: Props) => {

  const userRole = localStorage.getItem('user_role');

  if (!userRole)return <Navigate to='/' />;
  
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to='/unauthorized' />;
};

export default RoleBasedRoute;
