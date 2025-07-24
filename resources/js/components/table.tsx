import { Link } from '@inertiajs/react';
import get from 'lodash/get';
import { ChevronRight, Filter, Search } from 'lucide-react';
import { useState } from 'react';

interface TableProps<T> {
    columns: {
        name: string;
        label: string;
        colSpan?: number;
        renderCell?: (row: T) => React.ReactNode;
    }[];
    rows: T[];
    getRowDetailsUrl?: (row: T) => string;
    title?: string;
    description?: string;
}

export default function Table<T>({ columns = [], rows = [], getRowDetailsUrl, title, description }: TableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter rows based on search term
    const filteredRows = rows.filter((row) => {
        if (!searchTerm) return true;
        return columns.some((column) => {
            const value = get(row, column.name);
            return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    // Pagination
    const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRows = filteredRows.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
                        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
                    </div>

                    {/* Search and Filter */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search residents..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm text-black transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns?.map((column) => (
                                <th
                                    key={column.label}
                                    colSpan={column.colSpan ?? 1}
                                    className="border-b border-gray-200 px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase"
                                >
                                    {column.label}
                                </th>
                            ))}
                            {getRowDetailsUrl && (
                                <th className="border-b border-gray-200 px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase"></th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedRows?.length === 0 && (
                            <tr>
                                <td className="px-6 py-16 text-center text-gray-500" colSpan={columns.length + 1}>
                                    <div className="flex flex-col items-center">
                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <p className="mb-1 text-sm font-medium text-gray-900">No residents found</p>
                                        <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {paginatedRows?.map((row, index) => {
                            return (
                                <tr key={index} className="transition-colors duration-150 hover:bg-gray-50">
                                    {columns.map((column) => {
                                        return (
                                            <td key={column.name} className="px-6 py-4 whitespace-nowrap">
                                                {column.renderCell?.(row) ?? get(row, column.name) ?? (
                                                    <span className="text-gray-400 italic">N/A</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                    {getRowDetailsUrl && (
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={getRowDetailsUrl(row)}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRows.length)} of {filteredRows.length} results
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`rounded-md px-3 py-1 text-sm font-medium transition-colors duration-200 ${
                                            currentPage === i + 1
                                                ? 'bg-indigo-600 text-white'
                                                : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
