'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageSquare, ThumbsUp, Trash2, Loader2 } from 'lucide-react';
import { getAnonId, getAnonNickname } from '@/lib/anon-auth';

interface Comment {
  id: string;
  user_id: string | null;
  anon_id: string | null;
  content: string;
  created_at: string;
  profiles?: {
    name: string;
  };
}

export default function CommentsSection({ analysisId }: { analysisId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reactionCounts, setReactionCounts] = useState({ agree: 0, counter: 0 });
  const [userReaction, setUserReaction] = useState<'agree' | 'counter' | null>(null);
  const [localAnonId, setLocalAnonId] = useState('');

  useEffect(() => {
    setLocalAnonId(getAnonId());
    fetchComments();
    fetchReactions();
  }, [analysisId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profiles(name)')
        .eq('analysis_id', analysisId)
        .order('created_at', { ascending: true });
      if (data) setComments(data);
    } catch (err) {
      console.error('Fetch comments error:', err);
    }
  };

  const fetchReactions = async () => {
    try {
      const { data, error } = await supabase
        .from('reactions')
        .select('type')
        .eq('analysis_id', analysisId);
      
      if (data) {
        const counts = data.reduce((acc: any, curr: any) => {
          acc[curr.type]++;
          return acc;
        }, { agree: 0, counter: 0 });
        setReactionCounts(counts);
      }
    } catch (err) {
      console.error('Fetch reactions error:', err);
    }
  };

  const handleReaction = async (type: 'agree' | 'counter') => {
    const { error } = await supabase
      .from('reactions')
      .insert([{ 
        analysis_id: analysisId, 
        user_id: null,
        anon_id: localAnonId,
        type 
      }]);

    if (!error) {
       setUserReaction(type);
       fetchReactions();
    } else {
       // Allow visual toggle even if insert fails (e.g. unique constraint if added later)
       setUserReaction(type);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{ 
          analysis_id: analysisId, 
          user_id: null,
          anon_id: localAnonId,
          content: newComment 
        }]);

      if (error) {
        console.error('Comment submit error:', error);
        alert(`댓글 작성 실패: ${error.message} (${error.details || 'no details'})`);
      } else {
        setNewComment('');
        fetchComments();
      }
    } catch (err: any) {
      alert('오류가 발생했습니다: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;
    
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('anon_id', localAnonId);

    if (!error) {
      fetchComments();
    } else {
      alert('본인의 댓글만 삭제할 수 있습니다.');
    }
  };

  const totalReactions = reactionCounts.agree + reactionCounts.counter;
  const agreePercent = totalReactions > 0 ? (reactionCounts.agree / totalReactions) * 100 : 50;
  const counterPercent = totalReactions > 0 ? (reactionCounts.counter / totalReactions) * 100 : 50;

  return (
    <div className="mt-20 pt-10 border-t border-border">
      {/* Reactions Section */}
      <div className="flex flex-col items-center mb-16">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-8">Professional Consensus</h3>
        
        <div className="flex items-center gap-6 mb-10 w-full max-w-xl">
          <button 
            onClick={() => handleReaction('agree')}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${userReaction === 'agree' ? 'bg-accent text-white border-accent' : 'bg-white border-border hover:border-accent'}`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">{reactionCounts.agree}</span>
          </button>

          {/* Consensus Bar Visualization */}
          <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden flex relative group">
            <div 
              className="bg-accent h-full transition-all duration-700 ease-out"
              style={{ width: `${agreePercent}%` }}
            />
            <div 
              className="bg-red-400 h-full transition-all duration-700 ease-out"
              style={{ width: `${counterPercent}%` }}
            />
          </div>

          <button 
            onClick={() => handleReaction('counter')}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${userReaction === 'counter' ? 'bg-red-500 text-white border-red-500' : 'bg-white border-border hover:border-red-500'}`}
          >
            <ThumbsUp className="w-3.5 h-3.5 rotate-180" />
            <span className="text-[10px] font-black uppercase tracking-widest">{reactionCounts.counter}</span>
          </button>
        </div>

        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
          * This metric represents the analytical validity agreed upon by the local strategic community.
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-10 mb-12">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <MessageSquare className="w-3 h-3" />
          <span>Discussion Layer ({comments.length})</span>
          <div className="h-px flex-grow bg-slate-100" />
        </div>

        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="group flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-black uppercase">
                {comment.anon_id?.slice(-1) || 'A'}
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      {getAnonNickname(comment.anon_id || '')}
                      {comment.anon_id === localAnonId && <span className="ml-2 text-[8px] text-accent">(본인)</span>}
                    </span>
                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {comment.anon_id === localAnonId && (
                    <button 
                      onClick={() => handleDeleteComment(comment.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium bg-muted p-4 rounded-2xl rounded-tl-none">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Comment Input */}
      <form onSubmit={handleSubmitComment} className="relative group">
        <textarea 
          placeholder="작성자의 분석 방식이나 데이터에 대한 당신의 논리적 논평을 남겨주세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-white border border-border p-6 rounded-3xl text-sm min-h-[120px] outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all shadow-sm resize-none"
        />
        <button 
          disabled={isSubmitting}
          className="absolute bottom-4 right-4 bg-primary hover:bg-black text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Post Review'}
        </button>
      </form>
    </div>
  );
}
