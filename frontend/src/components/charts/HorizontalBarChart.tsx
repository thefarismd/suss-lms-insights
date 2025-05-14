import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

type Props = {
  chartData: {
    [key: string]: string | number;
  }[];
  chartConfig: ChartConfig;
  title?: string;
  description?: string;
  xKey?: string;
  yKey?: string;
  cap1?: string;
  cap2?: string;
};

const HorizontalBarChart = ({ chartData, chartConfig, title = 'Bar Chart', description = 'Chart description', xKey = 'visitors', yKey = 'browser', cap1 ='', cap2 ='' }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout='vertical' margin={{ left: 0 }}>
            <YAxis
              dataKey={yKey}
              type='category'
              tickLine={false}
              tickMargin={10}
              width={90}
              axisLine={false}
              tickFormatter={(value: string) => {
                const label = chartConfig[value as keyof typeof chartConfig]?.label;
                return typeof label === 'string' ? label : String(value);
              }}
            />
            <XAxis dataKey={xKey} type='number' hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey={xKey} layout='vertical' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          {cap1} <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>{cap2}</div>
      </CardFooter>
    </Card>
  );
}

export default HorizontalBarChart;
