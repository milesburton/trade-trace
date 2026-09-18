import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
export function Dashboard() {
    const [stats, setStats] = useState({
        totalTradesmen: 0,
        totalReviews: 0,
        blockchainStatus: 'Verified',
    });
    const [recentReviews, setRecentReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadData();
    }, []);
    async function loadData() {
        try {
            setIsLoading(true);
            const [tradesmen, reviews] = await Promise.all([
                apiClient.getTradesmen(),
                apiClient.getReviews(),
            ]);
            setStats({
                totalTradesmen: tradesmen.length,
                totalReviews: reviews.length,
                blockchainStatus: 'Verified',
            });
            setRecentReviews(reviews.slice(0, 5));
        }
        catch (error) {
            console.error('Error loading dashboard:', error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("div", { className: "text-sm font-semibold text-slate-600", children: "Total Tradesmen" }), _jsx("div", { className: "text-4xl font-bold text-blue-600 mt-2", children: isLoading ? '-' : stats.totalTradesmen })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("div", { className: "text-sm font-semibold text-slate-600", children: "Total Reviews" }), _jsx("div", { className: "text-4xl font-bold text-green-600 mt-2", children: isLoading ? '-' : stats.totalReviews })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("div", { className: "text-sm font-semibold text-slate-600", children: "Blockchain Status" }), _jsx("div", { className: "text-4xl font-bold text-purple-600 mt-2", children: "Verified" })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4", children: "Recent Reviews" }), _jsx("div", { className: "space-y-4", children: recentReviews.length === 0 ? (_jsx("p", { className: "text-slate-500", children: "No reviews yet" })) : (recentReviews.map((review) => (_jsxs("div", { className: "bg-white rounded-lg shadow p-4 dark:bg-slate-800", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-50", children: review.reviewer_name }), _jsxs("div", { className: "flex items-center mt-2 space-x-2", children: [_jsx("span", { className: "text-lg", children: '⭐'.repeat(review.rating) }), _jsxs("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: [review.rating, "/5"] })] })] }), _jsx("span", { className: "px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full dark:bg-green-900 dark:text-green-100", children: "Confirmed" })] }), _jsx("p", { className: "text-slate-700 dark:text-slate-300 mt-3", children: review.review_text }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-3", children: new Date(review.created_at).toLocaleDateString() })] }, review.id)))) })] })] }));
}
