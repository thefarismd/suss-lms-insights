import EntriesPerCourseChart from '@/components/charts/EntriesPerCourseChart';
import CourseLegendCard from '@/components/CourseLegendCard';
import CourseSummaryCards from '@/components/CourseSummaryCard';

const InstructorPage = () => {

  return (
    <div className='p-4 space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div><EntriesPerCourseChart /></div>
        <div><CourseLegendCard /></div>
      </div>
      <div><CourseSummaryCards /></div>
    </div>
  );
}

export default InstructorPage;
