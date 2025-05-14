import HorizontalBarChart from "./HorizontalBarChart";
import { useEffect, useState } from "react";
import { getEnrollmentCountsByCourse } from "@/services/admin";

type CourseStudentCount = {
  course_name: string;
  student_count: number;
};

const CourseEnrollmentChart = () => {

      const [chartData, setChartData] = useState<CourseStudentCount[]>([]);

      useEffect(() => {
        async function fetchData() {
          try {
            const data = await getEnrollmentCountsByCourse();
            setChartData(data);
          } catch (error) {
            console.error('Failed to load chart data', error);
          }
        }
        fetchData();
      }, []);

      const chartConfig = {
        student_count: { label: 'Students' },
        ...Object.fromEntries(
          chartData.map((d, i) => [
            d.course_name,
            {
              label: d.course_name,
              color: `var(--chart-${(i % 5) + 1})`
            },
          ])
        ),
      };

      const chartDataWithFill = chartData.map((d, i) => ({
        ...d,
        fill: `var(--chart-${(i % 5) + 1})`,
      }));


    return <HorizontalBarChart chartData={chartDataWithFill} chartConfig={chartConfig} title='Course Enrollment' description='Active student enrollments by course' xKey='student_count' yKey='course_name' cap1='Enrollment Distribution Across Courses' />;
}

export default CourseEnrollmentChart;