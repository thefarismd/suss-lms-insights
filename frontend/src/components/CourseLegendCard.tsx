import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type LucideIcon, Laptop, BarChart, Users, Wrench, CreditCard } from 'lucide-react';

type CourseLegend = {
  course_id: number;
  course_name: string;
  icon: LucideIcon;
};

const courseLegends: CourseLegend[] = [
  {
    course_id: 23409,
    course_name: 'Web Development',
    icon: Laptop,
  },
  {
    course_id: 75861,
    course_name: 'Business Analytics',
    icon: BarChart,
  },
  {
    course_id: 34290,
    course_name: 'Social Work',
    icon: Users,
  },
  {
    course_id: 15697,
    course_name: 'Advance Mechanics',
    icon: Wrench,
  },
  {
    course_id: 22376,
    course_name: 'Financial Technology',
    icon: CreditCard,
  },
];

const CourseLegendCard = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='text-base'>Course Legend</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3 text-sm'>
        {courseLegends.map((course) => {
          const Icon = course.icon;
          return (
            <div key={course.course_id} className='flex items-center gap-3'>
              <Icon className='h-4 w-4 text-muted-foreground' />
              <div>
                <div className='font-medium leading-tight'>{course.course_name}</div>
                <div className='text-muted-foreground text-xs'>Course Code: {course.course_id}</div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default CourseLegendCard;