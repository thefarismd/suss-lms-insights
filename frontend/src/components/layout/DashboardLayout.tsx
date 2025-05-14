import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '../AppSidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {

  return (
    <SidebarProvider>
      <AppSidebar menuItems={[]} />
      <main className='w-full'>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;