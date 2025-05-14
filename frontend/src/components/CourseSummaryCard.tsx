import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, BookOpen, ListChecks } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getCourseSummaries } from '@/services/instructor';

type EntriesSummary = {
  course_name: string;
  total_topics: number;
  total_entries: number;
  top_engagement_contributor: string;
  most_active_contributor: string;
};

const CourseSummaryCards = () => {
  const [summaries, setSummaries] = useState<EntriesSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getCourseSummaries();
      setSummaries(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-sm text-muted-foreground">Loading summaries...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {summaries.map((summary) => (
        <Card key={summary.course_name}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5" />
              {summary.course_name}
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Engagement Section */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">
                Engagement
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Top Contributor: {summary.top_engagement_contributor}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ListChecks className="w-4 h-4" />
                <span>Total Topics: {summary.total_topics}</span>
              </div>
            </div>

            <Separator />

            {/* Activity Section */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">
                Activity
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Most Active: {summary.most_active_contributor}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ListChecks className="w-4 h-4" />
                <span>Total Entries: {summary.total_entries}</span>
              </div>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CourseSummaryCards;