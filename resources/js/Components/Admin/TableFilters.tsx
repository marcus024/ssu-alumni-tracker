import { FormEventHandler } from 'react';
import TextInput from '@/Components/TextInput';

interface FilterOption {
    value: string;
    label: string;
}

interface TableFiltersProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    filters?: {
        name: string;
        label: string;
        value: string;
        onChange: (value: string) => void;
        options: FilterOption[];
    }[];
    onExport?: () => void;
    onClear?: () => void;
}

export default function TableFilters({
    searchValue = '',
    onSearchChange,
    searchPlaceholder = 'Search...',
    filters = [],
    onExport,
    onClear,
}: TableFiltersProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                {onSearchChange && (
                    <div className="flex-1">
                        <TextInput
                            type="text"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                    </div>
                )}

                {/* Filter Dropdowns */}
                {filters.map((filter) => (
                    <div key={filter.name} className="lg:w-48">
                        <select
                            value={filter.value}
                            onChange={(e) => filter.onChange(e.target.value)}
                            className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">{filter.label}</option>
                            {filter.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {onClear && (
                        <button
                            onClick={onClear}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors whitespace-nowrap"
                        >
                            Clear Filters
                        </button>
                    )}
                    {onExport && (
                        <button
                            onClick={onExport}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export CSV
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
