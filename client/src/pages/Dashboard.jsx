import React, { useEffect, useState } from 'react';
import api from '../api';
import StatCard from '../components/StatCard';
import { Users, Briefcase, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({ totalEmployees: 0, departments: 0, recentHires: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchStats(); }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/employees');
            const data = res.data;
            setStats({
                totalEmployees: data.length, 
                departments: new Set(data.map(e => e.department)).size,
                recentHires: data.slice(-3).length
            });
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
                <StatCard title="Total Employees" value={stats.totalEmployees} icon={Briefcase} color="purple-500" />
                <StatCard title="Departments" value={stats.departments} icon={Users} color="blue-500" />
                <StatCard title="Recent Hires" value={stats.recentHires} icon={TrendingUp} color="green-500" />
            </div>
            <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                    <button onClick={() => window.location.href='/employees'} className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg">
                        Add New Employee
                    </button>
                    <button onClick={() => window.location.href='/employees'} className="px-6 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        View All Employees
                    </button>
                </div>
            </div>
        </div>
    );
}