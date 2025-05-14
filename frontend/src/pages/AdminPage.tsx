import CourseEnrollmentChart from '@/components/charts/CourseEnrollmentChart';
import TopicsPerCourseChart from '@/components/charts/TopicsPerCourseChart';

const AdminPage = () => {
  return (
    <div className='p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div >
          <CourseEnrollmentChart />
        </div>
        <div>
          <TopicsPerCourseChart />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
