import { importResidents, ImportResult } from '@/utils/import-utils';
import { AlertCircle, CheckCircle2, Download, FileSpreadsheet, FileText, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImportSuccess: (data: any[]) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImportSuccess }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [importResult, setImportResult] = useState<ImportResult | null>(null);
    const [isImporting, setIsImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const supportedFormats = [
        {
            extension: '.xlsx, .xls',
            icon: FileSpreadsheet,
            description: 'Excel files with headers in first row',
            color: 'text-green-600',
        },
        {
            extension: '.csv',
            icon: FileText,
            description: 'Comma-separated values with headers',
            color: 'text-blue-600',
        },
    ];

    const requiredColumns = [
        'NIK atau nik',
        'Nama Lengkap atau nama_lengkap',
        'Tempat Lahir atau tempat_lahir',
        'Tanggal Lahir atau tanggal_lahir',
        'Jenis Kelamin atau jenis_kelamin (L/P)',
        'Alamat atau alamat',
        'RT atau rt',
        'RW atau rw',
        'Status Pernikahan atau status_pernikahan',
    ];

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (file: File) => {
        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'];

        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/i)) {
            alert('Please select a valid Excel (.xlsx, .xls) or CSV (.csv) file');
            return;
        }

        setSelectedFile(file);
        setImportResult(null);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleImport = async () => {
        if (!selectedFile) return;

        setIsImporting(true);
        try {
            const result = await importResidents(selectedFile, {
                validateData: true,
                skipEmptyRows: true,
            });

            setImportResult(result);

            if (result.success && result.data) {
                // Here you would typically send the data to your backend
                // For now, we'll just call the success callback
                onImportSuccess(result.data);
            }
        } catch (error) {
            setImportResult({
                success: false,
                errors: [`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
            });
        } finally {
            setIsImporting(false);
        }
    };

    const downloadTemplate = () => {
        const templateData = [
            {
                NIK: '1234567890123456',
                'Nama Lengkap': 'John Doe',
                'Tempat Lahir': 'Jakarta',
                'Tanggal Lahir': '1990-01-01',
                'Jenis Kelamin': 'L',
                Alamat: 'Jl. Contoh No. 123',
                RT: '001',
                RW: '002',
                'Status Pernikahan': 'Menikah',
                Agama: 'Islam',
                Pekerjaan: 'Karyawan',
                Kewarganegaraan: 'WNI',
            },
        ];

        const csvContent = [Object.keys(templateData[0]).join(','), Object.values(templateData[0]).join(',')].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'template-data-penduduk.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    const resetModal = () => {
        setSelectedFile(null);
        setImportResult(null);
        setIsImporting(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClose = () => {
        resetModal();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="bg-opacity-50 fixed inset-0 bg-black transition-opacity" onClick={handleClose} />

                <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                                <Upload className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Import Data Penduduk</h2>
                                <p className="text-sm text-gray-500">Upload Excel or CSV file to import resident data</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-6 p-6">
                        {/* Template Download */}
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <div className="flex items-start gap-3">
                                <Download className="mt-0.5 h-5 w-5 text-blue-600" />
                                <div className="flex-1">
                                    <h3 className="font-medium text-blue-900">Need a template?</h3>
                                    <p className="mt-1 text-sm text-blue-700">
                                        Download our template file to see the correct format and required columns.
                                    </p>
                                    <button
                                        onClick={downloadTemplate}
                                        className="mt-2 text-sm font-medium text-blue-600 underline hover:text-blue-700"
                                    >
                                        Download Template (CSV)
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* File Upload Area */}
                        <div
                            className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                                dragActive
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : selectedFile
                                      ? 'border-green-500 bg-green-50'
                                      : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileInputChange}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />

                            {selectedFile ? (
                                <div className="flex items-center justify-center gap-3">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    <div>
                                        <p className="font-medium text-green-900">{selectedFile.name}</p>
                                        <p className="text-sm text-green-700">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <p className="mb-2 text-lg font-medium text-gray-900">
                                        Drop your file here, or <span className="text-indigo-600">browse</span>
                                    </p>
                                    <p className="text-sm text-gray-500">Supports Excel (.xlsx, .xls) and CSV (.csv) files</p>
                                </div>
                            )}
                        </div>

                        {/* Supported Formats */}
                        <div>
                            <h3 className="mb-3 text-sm font-medium text-gray-700">Supported Formats</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {supportedFormats.map((format, index) => {
                                    const Icon = format.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                            <Icon className={`h-5 w-5 ${format.color}`} />
                                            <div>
                                                <span className="font-medium text-gray-900">{format.extension}</span>
                                                <p className="text-sm text-gray-600">{format.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Required Columns */}
                        <div>
                            <h3 className="mb-3 text-sm font-medium text-gray-700">Required Columns</h3>
                            <div className="rounded-lg bg-gray-50 p-4">
                                <ul className="space-y-1 text-sm text-gray-600">
                                    {requiredColumns.map((column, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                            {column}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Import Result */}
                        {importResult && (
                            <div
                                className={`rounded-lg p-4 ${
                                    importResult.success ? 'border border-green-200 bg-green-50' : 'border border-red-200 bg-red-50'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    {importResult.success ? (
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
                                    ) : (
                                        <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                                    )}
                                    <div className="flex-1">
                                        <h3 className={`font-medium ${importResult.success ? 'text-green-900' : 'text-red-900'}`}>
                                            {importResult.success ? 'Import Successful!' : 'Import Failed'}
                                        </h3>

                                        {importResult.success && (
                                            <p className="mt-1 text-sm text-green-700">
                                                Successfully imported {importResult.validRows} of {importResult.totalRows} records.
                                            </p>
                                        )}

                                        {importResult.errors && importResult.errors.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-sm font-medium text-red-700">Errors found:</p>
                                                <ul className="mt-1 max-h-32 space-y-1 overflow-y-auto text-sm text-red-600">
                                                    {importResult.errors.slice(0, 10).map((error, index) => (
                                                        <li key={index} className="flex items-start gap-1">
                                                            <span className="text-red-400">•</span>
                                                            {error}
                                                        </li>
                                                    ))}
                                                    {importResult.errors.length > 10 && (
                                                        <li className="text-red-500 italic">... and {importResult.errors.length - 10} more errors</li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-6">
                        <div className="text-sm text-gray-500">{selectedFile ? `File: ${selectedFile.name}` : 'No file selected'}</div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleClose}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            {selectedFile && !importResult?.success && (
                                <button
                                    onClick={handleImport}
                                    disabled={isImporting}
                                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2 text-sm font-medium text-white transition-all hover:from-green-700 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isImporting ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Importing...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="h-4 w-4" />
                                            Import Data
                                        </>
                                    )}
                                </button>
                            )}
                            {importResult?.success && (
                                <button
                                    onClick={handleClose}
                                    className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-medium text-white transition-all hover:from-indigo-700 hover:to-purple-700"
                                >
                                    Done
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportModal;
