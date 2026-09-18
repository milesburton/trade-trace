import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
export function ReviewForm() {
    const [tradesmen, setTradesmen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        type: null,
    });
    const [formData, setFormData] = useState({
        tradesman_id: '',
        reviewer_name: '',
        rating: '',
        review_text: '',
    });
    useEffect(() => {
        loadTradesmen();
    }, []);
    async function loadTradesmen() {
        try {
            const data = await apiClient.getTradesmen();
            setTradesmen(data);
        }
        catch (error) {
            console.error('Error loading tradesmen:', error);
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setSubmitStatus({ type: null });
        try {
            await apiClient.submitReview({
                tradesman_id: formData.tradesman_id,
                reviewer_name: formData.reviewer_name,
                rating: parseInt(formData.rating),
                review_text: formData.review_text,
            });
            setSubmitStatus({
                type: 'success',
                message: '✅ Review submitted and recorded on blockchain!',
            });
            setFormData({
                tradesman_id: '',
                reviewer_name: '',
                rating: '',
                review_text: '',
            });
            setTimeout(() => setSubmitStatus({ type: null }), 5000);
        }
        catch (error) {
            setSubmitStatus({
                type: 'error',
                message: '❌ Error submitting review',
            });
        }
        finally {
            setIsLoading(false);
        }
    }
    return (_jsx("div", { className: "max-w-2xl mx-auto", children: _jsxs("div", { className: "bg-white rounded-lg shadow p-6 dark:bg-slate-800", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6", children: "Submit a Review" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2", children: "Tradesman" }), _jsxs("select", { value: formData.tradesman_id, onChange: (e) => setFormData({ ...formData, tradesman_id: e.target.value }), className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white", required: true, children: [_jsx("option", { value: "", children: "Select a tradesman..." }), tradesmen.map((t) => (_jsxs("option", { value: t.id, children: [t.name, " - ", t.trade] }, t.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2", children: "Your Name" }), _jsx("input", { type: "text", value: formData.reviewer_name, onChange: (e) => setFormData({ ...formData, reviewer_name: e.target.value }), placeholder: "Your name", className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2", children: "Rating" }), _jsxs("select", { value: formData.rating, onChange: (e) => setFormData({ ...formData, rating: e.target.value }), className: "px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white", required: true, children: [_jsx("option", { value: "", children: "Select rating..." }), _jsx("option", { value: "1", children: "\u2B50 1 - Poor" }), _jsx("option", { value: "2", children: "\u2B50\u2B50 2 - Fair" }), _jsx("option", { value: "3", children: "\u2B50\u2B50\u2B50 3 - Good" }), _jsx("option", { value: "4", children: "\u2B50\u2B50\u2B50\u2B50 4 - Very Good" }), _jsx("option", { value: "5", children: "\u2B50\u2B50\u2B50\u2B50\u2B50 5 - Excellent" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2", children: "Review" }), _jsx("textarea", { value: formData.review_text, onChange: (e) => setFormData({ ...formData, review_text: e.target.value }), placeholder: "Share your experience...", rows: 5, className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white", required: true })] }), submitStatus.type && (_jsx("div", { className: `p-4 rounded-lg ${submitStatus.type === 'success'
                                ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100'
                                : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100'}`, children: submitStatus.message })), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600", children: isLoading ? 'Submitting...' : 'Submit Review' })] })] }) }));
}
