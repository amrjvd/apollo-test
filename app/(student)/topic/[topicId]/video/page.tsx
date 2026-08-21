import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/apollo/page-header';
import { api } from '@/lib/api';
import { toPersianDigits } from '@/lib/persian';

export default function VideoPage({ params }: { params: { topicId: string } }) {
  const topic = api.getTopic(params.topicId);
  if (!topic) notFound();

  const videos = api.getVideos(topic.id);
  if (videos.length === 0) notFound();
  const video = videos[0];

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href={`/topic/${topic.id}`} className="hover:text-foreground">مبحث</Link>
        <span>/</span>
        <span className="text-foreground">ویدیو</span>
      </nav>

      <PageHeader title={video.title} description={topic.title} />

      <Card className="overflow-hidden p-0">
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={video.url}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium">{video.title}</p>
            <p className="text-xs text-muted-foreground">مدت: {toPersianDigits(Math.floor(video.durationSec / 60))}:{toPersianDigits(Math.floor(video.durationSec % 60).toString().padStart(2, '0'))}</p>
          </div>
          <Link href={`/practice/${topic.id}`}>
            <Button>شروع تمرین</Button>
          </Link>
        </div>
      </Card>

      {videos.length > 1 && (
        <div className="space-y-3">
          <h2 className="font-semibold">ویدیوهای بیشتر</h2>
          {videos.slice(1).map((v) => (
            <Link key={v.id} href={`/topic/${topic.id}/video`} className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent">
              <PlayCircle className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">{v.title}</span>
            </Link>
          ))}
        </div>
      )}

      <Link href={`/topic/${topic.id}`}>
        <Button variant="ghost">
          <ChevronRight className="ml-2 h-4 w-4" />
          بازگشت به مبحث
        </Button>
      </Link>
    </div>
  );
}
