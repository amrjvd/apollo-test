import { FlaskConical, Leaf, Atom, Sigma, Mountain, BookOpen, type LucideIcon } from 'lucide-react';
import type { SubjectIcon } from '@/lib/types';

const iconMap: Record<SubjectIcon, LucideIcon> = {
  biology: Leaf,
  chemistry: FlaskConical,
  physics: Atom,
  math: Sigma,
  geology: Mountain,
  literature: BookOpen,
};

export function SubjectIcon({ icon, className }: { icon: SubjectIcon; className?: string }) {
  const Icon = iconMap[icon] ?? BookOpen;
  return <Icon className={className} />;
}
