import HorizontalBarChart from './HorizontalBarChart';
import { useEffect, useState } from 'react';
import { getTopicCountsByCourse } from '@/services/admin';

type CourseTopicCount = {
  course_name: string;
  topics_count: number;
};

const TopicsPerCourseChart = () => {
  const [chartData, setChartData] = useState<CourseTopicCount[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTopicCountsByCourse();
        setChartData(data);
      } catch (error) {
        console.error('Failed to load chart data', error);
      }
    }
    fetchData();
  }, []);

  const chartConfig = {
    topics_count: { label: 'Topics' },
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

  return <HorizontalBarChart chartData={chartDataWithFill} chartConfig={chartConfig} title='Topics per Course' description='Number of student-initiated topics by course' xKey='topics_count' yKey='course_name' cap1='Student-Initiated Discussions By Course' />;
}

export default TopicsPerCourseChart;
