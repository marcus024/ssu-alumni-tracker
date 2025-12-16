import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Graduate, Department } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface EditProps {
    graduate: Graduate;
    departments: Department[];
}

export default function Edit({ graduate, departments }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: graduate.name,
        year: graduate.year,
        course: graduate.course,
        current_work: graduate.current_work,
        department_id: graduate.department_id.toString(),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.graduates.update', graduate.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Graduate Record" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Graduate Record</h2>
                            <Link href={route('admin.graduates.index')} className="text-gray-600 dark:text-gray-400">Back</Link>
                        </div>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Graduate Name" />
                                <TextInput id="name" type="text" value={data.name} className="mt-1 block w-full" onChange={(e) => setData('name', e.target.value)} required />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="year" value="Year Graduated" />
                                    <TextInput id="year" type="number" value={data.year} className="mt-1 block w-full" onChange={(e) => setData('year', parseInt(e.target.value))} required />
                                    <InputError message={errors.year} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="department_id" value="Department" />
                                    <select id="department_id" value={data.department_id} onChange={(e) => setData('department_id', e.target.value)} className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md" required>
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (<option key={dept.id} value={dept.id}>{dept.name}</option>))}
                                    </select>
                                    <InputError message={errors.department_id} className="mt-2" />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="course" value="Course/Program" />
                                <TextInput id="course" type="text" value={data.course} className="mt-1 block w-full" onChange={(e) => setData('course', e.target.value)} required />
                                <InputError message={errors.course} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="current_work" value="Current Work/Position" />
                                <TextInput id="current_work" type="text" value={data.current_work} className="mt-1 block w-full" onChange={(e) => setData('current_work', e.target.value)} required />
                                <InputError message={errors.current_work} className="mt-2" />
                            </div>
                            <div className="flex justify-end gap-4">
                                <Link href={route('admin.graduates.index')} className="text-gray-600 dark:text-gray-400">Cancel</Link>
                                <PrimaryButton disabled={processing}>Update Record</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
