'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageSquare, ThumbsUp, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { getAnonId, getAnonNickname } from '@/lib/anon-auth';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  anon_id: string | null;
  content: string;
  created_at: string;
}

export default function CommentsSection({ analysisId }: { analysisId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReactionLoading, setIsReactionLoading] = useState(false); // 연타 방지용 로딩 상태
  const [reactionCounts, setReactionCounts] = useState({ agree: 0, counter: 0 });
  const [userReaction, setUserReaction] = useState<'agree' | 'counter' | null>(null);
  const [localAnonId, setLocalAnonId] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const aid = getAnonId();
    setLocalAnonId(aid);
    if (analysisId) {
      fetchComments();
      fetchReactions();
      fetchMyReaction(aid);
    }
  }, [analysisId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase.from('comments').select('*').eq('analysis_id', analysisId).order('created_at', { ascending: true });
      if (error) throw error;
      if (data) setComments(data);
    } catch (err: any) {
      console.error('Fetch comments error:', err.message);
    }
  };

  const fetchReactions = async () => {
    try {
      const { data, error } = await supabase.from('reactions').select('type').eq('analysis_id', analysisId);
      if (error) throw error;
      if (data) {
        const counts = data.reduce((acc: any, curr: any) => {
          acc[curr.type]++;
          return acc;
        }, { agree: 0, counter: 0 });
        setReactionCounts(counts);
      }
    } catch (err: any) {
      console.error('Fetch reactions error:', err.message);
    }
  };

  const fetchMyReaction = async (aid: string) => {
    try {
      const { data, error } = await supabase.from('reactions').select('type').eq('analysis_id', analysisId).eq('anon_id', aid).maybeSingle();
      if (data) setUserReaction(data.type as any);
    } catch (err) {
      console.error('Fetch my reaction error:', err);
    }
  };

  const handleReaction = async (type: 'agree' | 'counter') => {
    if (isReactionLoading) return; // 이미 처리 중이면 클릭 무시
    setIsReactionLoading(true);

    try {
      if (userReaction === type) {
        // 이미 같은 걸 눌렀다면 투표 취소
        const { error } = await supabase.from('reactions').delete().eq('analysis_id', analysisId).eq('anon_id', localAnonId);
        if (error) throw error;
        setUserReaction(null);
      } else {
        // 다른 걸 누르거나 새로 투표하면 기존 기록 삭제 후 삽입
        await supabase.from('reactions').delete().eq('analysis_id', analysisId).eq('anon_id', localAnonId);
        
        const { error } = await supabase.from('reactions').insert({ 
          analysis_id: analysisId, 
          anon_id: localAnonId, 
          type 
        });
        
        if (error) throw error;
        setUserReaction(type);
      }
      
      // 서버에서 실시간 개수 다시 가져오기
      await fetchReactions();
    } catch (err: any) {
      console.error('Reaction Error:', err.message);
    } finally {
      setIsReactionLoading(false); // 처리 완료 후 잠금 해제
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('comments').insert([{ analysis_id: analysisId, anon_id: localAnonId, content: newComment.trim() }]);
      if (error) throw error;
      setNewComment('');
      fetchComments();
    } catch (err: any) {
      setError(`댓글 작성 오류: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('삭제하시겠습니까?')) return;
    try {
      await supabase.from('comments').delete().eq('id', commentId).eq('anon_id', localAnonId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {}
  };

  const totalReactions = reactionCounts.agree + reactionCounts.counter;
  const agreePercent = totalReactions > 0 ? (reactionCounts.agree / totalReactions) * 100 : 50;
  const counterPercent = totalReactions > 0 ? (reactionCounts.counter / totalReactions) * 100 : 50;

  return (
    <div className="mt-20 pt-10 border-t border-border">
      {/* Consensus Board */}
      <div className="flex flex-col items-center mb-16">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-8 underline decoration-accent underline-offset-4">Strategic Validation</h3>
        <div className="flex items-center gap-6 mb-10 w-full max-w-xl">
          <button 
            onClick={() => handleReaction('agree')}
            disabled={isReactionLoading}
            className={cn(
              "flex flex-col items-center gap-2 group transition-all",
              userReaction === 'agree' ? "text-accent scale-110" : "text-slate-300 hover:text-accent",
              isReactionLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <ThumbsUp className={cn("w-6 h-6 transition-all", userReaction === 'agree' ? "fill-accent stroke-accent" : "stroke-current")} />
            <span className="text-[10px] font-black">{reactionCounts.agree}</span>
          </button>

          <div className="flex-grow h-3 bg-slate-100 rounded-full overflow-hidden flex relative">
            <div className="bg-accent h-full transition-all duration-700" style={{ width: `${agreePercent}%` }} />
            <div className="bg-red-400 h-full transition-all duration-700" style={{ width: `${counterPercent}%` }} />
            <div className="absolute inset-0 flex items-center justify-between px-4 mix-blend-overlay text-[8px] font-black text-white pointer-events-none">
              <span>AGREE {Math.round(agreePercent)}%</span>
              <span>COUNTER {Math.round(counterPercent)}%</span>
            </div>
          </div>

          <button 
            onClick={() => handleReaction('counter')}
            disabled={isReactionLoading}
            className={cn(
              "flex flex-col items-center gap-2 group transition-all",
              userReaction === 'counter' ? "text-red-500 scale-110" : "text-slate-300 hover:text-red-500",
              isReactionLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <ThumbsUp className={cn("w-6 h-6 rotate-180 transition-all", userReaction === 'counter' ? "fill-red-500 stroke-red-500" : "stroke-current")} />
            <span className="text-[10px] font-black">{reactionCounts.counter}</span>
          </button>
        </div>
      </div>

      {/* Discussion */}
      <div className="space-y-8 mb-12">
        {comments.map((comment) => (
          <div key={comment.id} className="group flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-black uppercase">
              {comment.anon_id?.slice(-1)}
            </div>
            <div className="flex-grow space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-primary">
                  {getAnonNickname(comment.anon_id || '')}
                  {comment.anon_id === localAnonId && <span className="ml-2 text-[8px] text-accent">(YOU)</span>}
                </span>
                {comment.anon_id === localAnonId && (
                  <button onClick={() => handleDeleteComment(comment.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500">
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-700 bg-muted p-4 rounded-2xl rounded-tl-none font-medium leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitComment} className="relative">
        <textarea 
          placeholder="당신의 통찰을 남겨주세요..."
          value={newComment} onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-white border border-border p-6 rounded-3xl text-sm min-h-[120px] outline-none focus:border-accent shadow-sm"
        />
        <button disabled={isSubmitting} className="absolute bottom-4 right-4 bg-primary text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
          {isSubmitting ? 'Posting...' : 'Post Review'}
        </button>
      </form>
    </div>
  );
}
