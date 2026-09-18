import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TradesmenList } from './components/TradesmenList';
import { ReviewForm } from './components/ReviewForm';
import { BlockchainTab } from './components/BlockchainTab';
import { RelationshipsGraph } from './components/RelationshipsGraph';
function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const tabs = [
        { name: 'dashboard', label: 'Dashboard' },
        { name: 'tradesmen', label: 'Tradesmen' },
        { name: 'submit-review', label: 'Submit Review' },
        { name: 'blockchain', label: 'Blockchain' },
        { name: 'graph', label: 'Relationships' },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-900", children: [_jsx("header", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 shadow-lg", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsx("h1", { className: "text-4xl font-bold", children: "Trade Trace" }), _jsx("p", { className: "text-blue-100 mt-2", children: "Transparent tradesman reviews with blockchain immutability" })] }) }), _jsx("div", { className: "bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 shadow-sm", children: _jsx("div", { className: "max-w-7xl mx-auto px-4", children: _jsx("div", { className: "flex space-x-8 overflow-x-auto", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.name), className: `py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === tab.name
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'}`, children: tab.label }, tab.name))) }) }) }), _jsxs("main", { className: "max-w-7xl mx-auto px-4 py-8", children: [activeTab === 'dashboard' && _jsx(Dashboard, {}), activeTab === 'tradesmen' && _jsx(TradesmenList, {}), activeTab === 'submit-review' && _jsx(ReviewForm, {}), activeTab === 'blockchain' && _jsx(BlockchainTab, {}), activeTab === 'graph' && _jsx(RelationshipsGraph, {})] })] }));
}
export default App;
