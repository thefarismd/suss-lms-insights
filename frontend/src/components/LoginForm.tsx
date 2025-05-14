import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/authService';
import { useState, useEffect } from 'react';
import AlertDestructive from './AlertDestructive';
import axios from 'axios';

const LoginForm = ({ className, ...props }: React.ComponentProps<'div'>) => {

   const [userId, setUserId] = useState('');
   const [password, setPassword] = useState('');
   const [showError, setShowError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const navigate = useNavigate();

   useEffect(() => {
     function handleClick() {
       if (showError) {
         setShowError(false);
         setErrorMessage('');
       }
     }

     if (showError) {
       document.addEventListener('click', handleClick);
     }

     return () => {
       document.removeEventListener('click', handleClick);
     };
   }, [showError]);


  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();
    try {
      const user = await AuthService.login({ user_id: parseInt(userId.trim(), 10), password });

      if (user.user_role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
        if (axios.isAxiosError(error)) {
         const message = error.response?.data?.message;
        setErrorMessage(message);
        }
      setShowError(true);
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {showError && <AlertDestructive errorMessage={errorMessage} />} {/* Show error alert */}
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>Welcome to SUSS LMS Insights</CardTitle>
          <CardDescription className='text-center'>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} autoComplete='off'>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='userId'>User ID</Label>
                <Input id='userId' type='text' name='user_id_custom' placeholder='4XXX6' required autoComplete='off' value={userId} onChange={(e) => setUserId(e.target.value)} />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a href='#' className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                    Forgot your password?
                  </a>
                </div>
                <Input id='password' type='password' required autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <a href='#' className='underline underline-offset-4'>
                Contact Admin
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;