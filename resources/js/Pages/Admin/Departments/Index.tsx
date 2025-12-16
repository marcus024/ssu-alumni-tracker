import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps, Department } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';

interface DepartmentsIndexProps extends PageProps {
    departments: Department[];
}

export default function Index({ auth, departments }: DepartmentsIndexProps) {
    const [search, setSearch] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this department?')) {
            router.delete(route('admin.departments.destroy', id));
        }
    };

    const filteredDepartments = search
        ? departments.filter(dept =>
            dept.name.toLowerCase().includes(search.toLowerCase()) ||
            dept.description.toLowerCase().includes(search.toLowerCase())
        )
        : departments;

    return (
        <AdminLayout header="Departments Management">
            <Head title="Departments Management" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Departments Management</h2>
                <Link href={route('admin.departments.create')}>
                    <PrimaryButton>Add New Department</PrimaryButton>
                </Link>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search departments..."
                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                />
            </div>

            {/* Departments Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredDepartments.map((department) => (
                                    <div
                                        key={department.id}
                                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                                    >
                                        {department.logo && (
                                            <img
                                                src={`/storage/${department.logo}`}
                                                alt={department.name}
                                                className="w-20 h-20 object-contain mx-auto mb-4"
                                            />
                                        )}
                                        <h3 className="text-xl font-bold mb-2 text-center">{department.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                            {department.description}
                                        </p>
                                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                                            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                                                <div className="font-bold text-blue-600 dark:text-blue-400">
                                                    {department.total_students}
                                                </div>
                                                <div className="text-gray-600 dark:text-gray-400">Students</div>
                                            </div>
                                            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                                                <div className="font-bold text-green-600 dark:text-green-400">
                                                    {department.total_teachers}
                                                </div>
                                                <div className="text-gray-600 dark:text-gray-400">Teachers</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-center">
                                            <Link
                                                href={route('admin.departments.edit', department.id)}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(department.id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                ))}
            </div>

            {filteredDepartments.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    No departments found.
                </div>
            )}
        </AdminLayout>
    );
}
