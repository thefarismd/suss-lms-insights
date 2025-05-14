import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminPage from '@/pages/AdminPage';
import InstructorPage from '@/pages/InstructorPage';
import RoleBasedRoute from './RoleBasedRoute'
import Unauthorized from '@/pages/Unauthorized';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/unauthorized' element={<Unauthorized />} />

      {/* Instructor dashboard layout */}
      <Route element={<RoleBasedRoute allowedRoles={['instructor']} />}>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<InstructorPage />} />
        </Route>
      </Route>

      {/* Admin dashboard layout */}
      <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
        <Route path='/admin/dashboard' element={<DashboardLayout />}>
          <Route index element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
