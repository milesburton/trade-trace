import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
export function TradesmenList() {
    const [tradesmen, setTradesmen] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadTradesmen();
    }, []);
    async function loadTradesmen() {
        try {
            setIsLoading(true);
            const data = await apiClient.getTradesmen();
            setTradesmen(data);
        }
        catch (error) {
            console.error('Error loading tradesmen:', error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-slate-50", children: "All Tradesmen" }), isLoading ? (_jsx("div", { className: "text-slate-500", children: "Loading..." })) : tradesmen.length === 0 ? (_jsx("div", { className: "text-slate-500", children: "No tradesmen found" })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: tradesmen.map((tradesman) => (_jsxs("div", { className: "bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow dark:bg-slate-800", children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50", children: tradesman.name }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: tradesman.trade })] }), tradesman.verified && (_jsx("span", { className: "inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded dark:bg-blue-900 dark:text-blue-100", children: "Verified" }))] }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 mb-4", children: tradesman.location }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-lg", children: '⭐'.repeat(Math.round(tradesman.rating)) }), _jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: tradesman.rating.toFixed(1) })] }), _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: [tradesman.reviewCount, " reviews"] })] })] }, tradesman.id))) }))] }));
}
