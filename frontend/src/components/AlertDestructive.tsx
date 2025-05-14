import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertDestructiveProps = {
  errorMessage: string;
};

const AlertDestructive = ({errorMessage}: AlertDestructiveProps ) => {
  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}

export default AlertDestructive;