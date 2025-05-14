import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/authService'; // adjust path if needed
import { Button } from '@/components/ui/button'; // assuming you're using shadcn/ui

const Unauthorized = () => {
  const navigate = useNavigate();

  function handleLogout() {
    AuthService.logout();
    navigate('/');
  }

  return (
    <div className='p-8 text-center'>
      <h1 className='text-2xl font-bold mb-4'>403 - Unauthorized</h1>
      <p className='text-gray-600 mb-6'>You do not have permission to view this page.</p>
      <Button variant='destructive' onClick={handleLogout}>Please Logout</Button>
    </div>
  );
}

export default Unauthorized;