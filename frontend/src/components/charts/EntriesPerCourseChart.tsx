import HorizontalBarChart from './HorizontalBarChart';
import { useEffect, useState } from 'react';
import { getEntryCountsByCourse } from '@/services/instructor';

type CourseEntryCount = {
  course_name: string;
  entries_count: number;
};

const EntriesPerCourseChart = () => {
  const [chartData, setChartData] = useState<CourseEntryCount[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEntryCountsByCourse();
        setChartData(data);
      } catch (error) {
        console.error('Failed to load chart data', error);
      }
    }
    fetchData();
  }, []);

  const chartConfig = {
    entries_count: { label: 'Entries' },
    ...Object.fromEntries(
      chartData.map((d, i) => [
        d.course_name,
        {
          label: d.course_name,
          color: `var(--chart-${(i % 5) + 1})`,
        },
      ])
    ),
  };

  const chartDataWithFill = chartData.map((d, i) => ({
    ...d,
    fill: `var(--chart-${(i % 5) + 1})`,
  }));

  return <HorizontalBarChart chartData={chartDataWithFill} chartConfig={chartConfig} title='Entries Per Course' description='Number of student entries submitted per course' xKey='entries_count' yKey='course_name' cap1='Discussion Participation Levels By Course' />;
}

export default EntriesPerCourseChart;
