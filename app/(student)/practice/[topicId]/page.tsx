import { PracticeFlowClient } from './practice-client';

export default function PracticePage({ params }: { params: { topicId: string } }) {
  return <PracticeFlowClient topicId={params.topicId} />;
}
