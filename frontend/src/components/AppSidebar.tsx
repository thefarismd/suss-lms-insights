import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/authService'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type MenuItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

type AppSidebarProps = {
  menuItems: MenuItem[];
};

const AppSidebar = ({ menuItems }: AppSidebarProps) => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('user_role');
  const role = userRole === 'admin' ? 'Administrator' : 'Instructor';
  const username = userRole === 'admin' ? 'Jane Doe' : 'John Doe';

  function handleLogout() {
    AuthService.logout();
    navigate('/');
  }

  return (
    <Sidebar>
      <SidebarContent>
        {/* User Info Section */}
        <SidebarHeader className='p-4 mb-0 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium text-gray-800'>{username}</p>
              <p className='text-xs text-gray-500'>{role}</p>
            </div>
          </div>
        </SidebarHeader>

        {/* Menu Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Welcome to LMS Insights</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className='flex items-center gap-2'>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Always show logout */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button onClick={handleLogout} className='flex items-center gap-2 w-full text-left'>
                    <LogOut />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;