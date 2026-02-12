import React, { useEffect, useState } from 'react';
import api from '../api';
import Modal from '../components/Modal';
import EmployeeForm from '../components/EmployeeForm';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    useEffect(() => { fetchEmployees(); }, []);

    const fetchEmployees = async () => {
        try {
            const res = await api.get('/employees');
            setEmployees(res.data);
        } catch (err) { console.error('Failed to fetch', err); } finally { setLoading(false); }
    };

    const handleAdd = () => { setCurrentEmployee(null); setIsModalOpen(true); };
    const handleEdit = (emp) => { setCurrentEmployee(emp); setIsModalOpen(true); };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                setEmployees(employees.filter(e => e.id !== id));
            } catch (err) { console.error(err); }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (currentEmployee) {
                const res = await api.put(`/employees/${currentEmployee.id}`, formData);
                setEmployees(employees.map(e => e.id === currentEmployee.id ? res.data : e));
            } else {
                const res = await api.post('/employees', formData);
                setEmployees([...employees, res.data]);
            }
            setIsModalOpen(false);
        } catch (err) { console.error(err); }
    };

    const filtered = employees.filter(e => 
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                <button onClick={handleAdd} className="flex items-center px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg">
                    <Plus className="w-5 h-5 mr-2" /> Add Employee
                </button>
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 uppercase text-xs font-medium text-gray-500">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Position</th>
                            <th className="px-6 py-3 text-left">Department</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filtered.map((emp) => (
                            <tr key={emp.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{emp.name}</div>
                                    <div className="text-xs text-gray-500">{emp.email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{emp.position}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{emp.department}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleEdit(emp)} className="text-indigo-600 mr-4"><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(emp.id)} className="text-red-600"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentEmployee ? 'Edit' : 'Add'}>
                <EmployeeForm initialData={currentEmployee} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}
