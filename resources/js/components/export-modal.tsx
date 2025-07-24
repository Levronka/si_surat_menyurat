import { Residents } from '@/types';
import { ExportOptions, exportResidents } from '@/utils/export-utils';
import { Check, Download, FileImage, FileSpreadsheet, FileText, X } from 'lucide-react';
import React, { useState } from 'react';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    residents: Residents[];
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, residents }) => {
    const [selectedFormat, setSelectedFormat] = useState<'excel' | 'csv' | 'pdf'>('excel');
    const [filename, setFilename] = useState('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        'nik',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'rt',
        'rw',
        'status_pernikahan',
    ]);
    const [isExporting, setIsExporting] = useState(false);

    const availableColumns = [
        { key: 'nik', label: 'NIK' },
        { key: 'nama_lengkap', label: 'Nama Lengkap' },
        { key: 'tempat_lahir', label: 'Tempat Lahir' },
        { key: 'tanggal_lahir', label: 'Tanggal Lahir' },
        { key: 'jenis_kelamin', label: 'Jenis Kelamin' },
        { key: 'alamat', label: 'Alamat' },
        { key: 'rt', label: 'RT' },
        { key: 'rw', label: 'RW' },
        { key: 'status_pernikahan', label: 'Status Pernikahan' },
        { key: 'agama', label: 'Agama' },
        { key: 'pekerjaan', label: 'Pekerjaan' },
        { key: 'kewarganegaraan', label: 'Kewarganegaraan' },
    ];

    const formatOptions = [
        {
            value: 'excel' as const,
            label: 'Excel (.xlsx)',
            icon: FileSpreadsheet,
            description: 'Best for data analysis and calculations',
            color: 'text-green-600 bg-green-50 border-green-200',
        },
        {
            value: 'csv' as const,
            label: 'CSV (.csv)',
            icon: FileText,
            description: 'Universal format, compatible with all systems',
            color: 'text-blue-600 bg-blue-50 border-blue-200',
        },
        {
            value: 'pdf' as const,
            label: 'PDF (.pdf)',
            icon: FileImage,
            description: 'Perfect for printing and sharing',
            color: 'text-red-600 bg-red-50 border-red-200',
        },
    ];

    const handleColumnToggle = (columnKey: string) => {
        setSelectedColumns((prev) => (prev.includes(columnKey) ? prev.filter((col) => col !== columnKey) : [...prev, columnKey]));
    };

    const handleExport = async () => {
        if (selectedColumns.length === 0) {
            alert('Please select at least one column to export');
            return;
        }

        setIsExporting(true);

        try {
            const options: ExportOptions = {
                format: selectedFormat,
                filename: filename || undefined,
                includeColumns: selectedColumns,
            };

            await exportResidents(residents, options);
            onClose();
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="bg-opacity-50 fixed inset-0 bg-black transition-opacity" onClick={onClose} />

                <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                                <Download className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Export Data Penduduk</h2>
                                <p className="text-sm text-gray-500">{residents.length} records ready to export</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-6 p-6">
                        {/* Format Selection */}
                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-700">Choose Export Format</label>
                            <div className="grid grid-cols-1 gap-3">
                                {formatOptions.map((format) => {
                                    const Icon = format.icon;
                                    return (
                                        <label
                                            key={format.value}
                                            className={`relative flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all ${
                                                selectedFormat === format.value
                                                    ? 'border-indigo-500 bg-indigo-50'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="format"
                                                value={format.value}
                                                checked={selectedFormat === format.value}
                                                onChange={(e) => setSelectedFormat(e.target.value as any)}
                                                className="sr-only"
                                            />
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${format.color}`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{format.label}</span>
                                                    {selectedFormat === format.value && <Check className="h-4 w-4 text-indigo-600" />}
                                                </div>
                                                <p className="text-sm text-gray-500">{format.description}</p>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Filename */}
                        <div>
                            <label htmlFor="filename" className="mb-2 block text-sm font-medium text-gray-700">
                                Custom Filename (Optional)
                            </label>
                            <input
                                type="text"
                                id="filename"
                                value={filename}
                                onChange={(e) => setFilename(e.target.value)}
                                placeholder={`data-penduduk-${new Date().toISOString().split('T')[0]}`}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                            />
                            <p className="mt-1 text-xs text-gray-500">File extension will be added automatically</p>
                        </div>

                        {/* Column Selection */}
                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-700">Select Columns to Export</label>
                            <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-gray-200 p-3">
                                {availableColumns.map((column) => (
                                    <label key={column.key} className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={selectedColumns.includes(column.key)}
                                            onChange={() => handleColumnToggle(column.key)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm text-gray-700">{column.label}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-xs text-gray-500">
                                    {selectedColumns.length} of {availableColumns.length} columns selected
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedColumns(availableColumns.map((col) => col.key))}
                                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                                    >
                                        Select All
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedColumns([])}
                                        className="text-xs font-medium text-gray-500 hover:text-gray-700"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-6">
                        <div className="text-sm text-gray-500">Ready to export {residents.length} records</div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onClose}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleExport}
                                disabled={isExporting || selectedColumns.length === 0}
                                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-medium text-white transition-all hover:from-indigo-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isExporting ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-4 w-4" />
                                        Export Data
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
