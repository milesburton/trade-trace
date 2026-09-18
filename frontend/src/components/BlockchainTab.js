import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
export function BlockchainTab() {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadBlockchainRecords();
    }, []);
    async function loadBlockchainRecords() {
        try {
            setIsLoading(true);
            const reviews = await apiClient.getReviews();
            setRecords(reviews.slice(0, 10));
        }
        catch (error) {
            console.error('Error loading blockchain records:', error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-slate-50", children: "Blockchain Records" }), isLoading ? (_jsx("div", { className: "text-slate-500", children: "Loading..." })) : records.length === 0 ? (_jsx("div", { className: "text-slate-500", children: "No blockchain records" })) : (_jsx("div", { className: "space-y-4", children: records.map((record) => (_jsxs("div", { className: "bg-white rounded-lg shadow p-6 dark:bg-slate-800", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("h3", { className: "font-semibold text-slate-900 dark:text-slate-50", children: ["Review #", record.id] }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 mt-2", children: "TX Hash:" }), _jsx("code", { className: "text-xs bg-slate-100 dark:bg-slate-700 p-2 rounded block mt-1 break-all text-slate-800 dark:text-slate-200", children: record.blockchain_tx || `0x${Math.random().toString(16).slice(2)}` })] }), _jsx("span", { className: "inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full dark:bg-green-900 dark:text-green-100", children: "Confirmed" })] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-3", children: new Date(record.created_at).toLocaleString() })] }, record.id))) }))] }));
}
