import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Search,
  Filter,
  User,
  MapPin,
  Star
} from 'lucide-react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/reviews`);
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setLoading(false);
    }
  };

  const handleAction = async (reviewId, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/admin/reviews/${reviewId}`, { status });
      setReviews(reviews.map(r => r._id === reviewId ? { ...r, status } : r));
    } catch (err) {
      alert('Failed to update review status');
    }
  };

  const filteredReviews = reviews.filter(r => filter === 'all' || r.status === filter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Review Moderation</h2>
          <p className="text-slate-500 text-sm">Review and manage user-contributed content.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          {['all', 'pending', 'approved', 'spam'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                filter === f ? 'bg-[#11B573] text-white shadow-lg shadow-[#11B573]/20' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="h-64 bg-slate-50 rounded-3xl animate-pulse" />
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center">
            <MessageSquare className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-900">No reviews found</h3>
            <p className="text-slate-500 text-sm">Everything looks clean for now.</p>
          </div>
        ) : filteredReviews.map((review) => (
          <div key={review._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.user?.email}`} alt="avatar" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      {review.user?.name}
                      <span className="text-xs font-normal text-slate-400">•</span>
                      <span className="text-xs font-normal text-slate-400 flex items-center gap-1">
                        <MapPin size={12} /> {review.area?.name}
                      </span>
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "fill-orange-400 text-orange-400" : "text-slate-200"} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{review.comment}</p>
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {review.status !== 'approved' && (
                  <button 
                    onClick={() => handleAction(review._id, 'approved')}
                    className="p-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all flex items-center gap-2 font-bold text-xs"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                )}
                {review.status !== 'spam' && (
                  <button 
                    onClick={() => handleAction(review._id, 'spam')}
                    className="p-2.5 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all flex items-center gap-2 font-bold text-xs"
                  >
                    <AlertTriangle size={16} /> Mark Spam
                  </button>
                )}
                <button 
                  onClick={() => handleAction(review._id, 'deleted')}
                  className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all flex items-center gap-2 font-bold text-xs"
                >
                  <XCircle size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
