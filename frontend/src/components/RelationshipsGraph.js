import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
export function RelationshipsGraph() {
    const [tradesmen, setTradesmen] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [graph, setGraph] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        loadTradesmen();
    }, []);
    async function loadTradesmen() {
        try {
            const data = await apiClient.getTradesmen();
            setTradesmen(data);
            if (data.length > 0) {
                setSelectedId(data[0].id);
                loadGraph(data[0].id);
            }
        }
        catch (error) {
            console.error('Error loading tradesmen:', error);
        }
    }
    async function loadGraph(tradesman_id) {
        try {
            setIsLoading(true);
            const data = await apiClient.getGraph(tradesman_id);
            setGraph(data);
        }
        catch (error) {
            console.error('Error loading graph:', error);
        }
        finally {
            setIsLoading(false);
        }
    }
    const handleSelectChange = (e) => {
        const id = e.target.value;
        setSelectedId(id);
        loadGraph(id);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-slate-50", children: "Relationship Graph" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2", children: "Select Tradesman" }), _jsx("select", { value: selectedId, onChange: handleSelectChange, className: "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white", children: tradesmen.map((t) => (_jsxs("option", { value: t.id, children: [t.name, " - ", t.trade] }, t.id))) })] }), isLoading ? (_jsx("div", { className: "text-slate-500", children: "Loading graph..." })) : !graph ? (_jsx("div", { className: "text-slate-500", children: "Select a tradesman to view relationships" })) : (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-white rounded-lg shadow p-4 dark:bg-slate-800", children: [_jsx("div", { className: "text-sm font-semibold text-slate-600 dark:text-slate-400", children: "Nodes" }), _jsx("div", { className: "text-3xl font-bold text-blue-600", children: graph.nodes.length })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-4 dark:bg-slate-800", children: [_jsx("div", { className: "text-sm font-semibold text-slate-600 dark:text-slate-400", children: "Connections" }), _jsx("div", { className: "text-3xl font-bold text-green-600", children: graph.edges.length })] })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3", children: ["Nodes (", graph.nodes.length, ")"] }), _jsx("div", { className: "space-y-2", children: graph.nodes.map((node) => (_jsxs("div", { className: "flex items-center space-x-3 p-3 rounded bg-slate-50 dark:bg-slate-700", children: [_jsx("span", { className: `w-3 h-3 rounded-full ${node.type === 'trader' ? 'bg-blue-600' : 'bg-green-600'}` }), _jsxs("span", { className: "text-slate-700 dark:text-slate-300", children: [node.name, " ", _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: ["(", node.type, ")"] })] })] }, node.id))) })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3", children: ["Connections (", graph.edges.length, ")"] }), graph.edges.length === 0 ? (_jsx("p", { className: "text-slate-500", children: "No connections declared" })) : (_jsx("div", { className: "space-y-2", children: graph.edges.map((edge, idx) => (_jsxs("div", { className: "flex items-center space-x-2 p-3 rounded bg-slate-50 dark:bg-slate-700", children: [_jsx("span", { className: "text-slate-600 dark:text-slate-400", children: "\u2192" }), _jsx("span", { className: "text-slate-700 dark:text-slate-300", children: edge.type })] }, idx))) }))] })] }))] }));
}
