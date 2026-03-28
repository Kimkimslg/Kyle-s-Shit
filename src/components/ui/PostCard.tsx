import Link from 'next/link';
import { Calendar, Folder, Clock } from 'lucide-react';

interface PostCardProps {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  readTime?: string;
}

export default function PostCard({ id, title, date, category, summary, readTime }: PostCardProps) {
  return (
    <article className="archive-list-item group relative py-10">
      <div className="flex flex-col gap-3">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-secondary">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" /> {date}
          </span>
          <Link 
            href={`/industries/${category.toLowerCase()}`}
            className="flex items-center gap-1.5 transition-colors hover:text-accent hover:underline relative z-10"
          >
            <Folder className="w-3 h-3" /> {category}
          </Link>
          {readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/analysis/${id}`} className="block group">
          <h2 className="text-2xl font-[800] tracking-tight group-hover:text-accent transition-all duration-300">
            {title}
          </h2>
        </Link>

        {/* Snippet */}
        <p className="text-sm text-secondary leading-relaxed line-clamp-2 max-w-2xl">
          {summary}
        </p>
      </div>
    </article>
  );
}
