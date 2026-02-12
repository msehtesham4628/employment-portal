import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => {
    return (
        <div className ="bg-white overflow-hidden rounded-xl shadow-sw border border-slate-100 p-6 flex items-center transition-transform hover:scale-105">
            <div className ={`p-3 rounded-lg bg-${color}-100 text-${color}-600 mr-4`}>
                <Icon size={24} />
            </div>
            <div>
                    <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
                    <p className="mt-1 text-2xl font-semibold text-salate-900">{value}</p>
            </div>    
        </div>
        
    );
};

export default StatCard;
