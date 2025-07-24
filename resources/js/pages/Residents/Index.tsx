import ExportModal from '@/components/export-modal';
import ImportModal from '@/components/import-modal';
import Table from '@/components/table';
import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem, type Residents } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Download, Plus, Upload, Users } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Residents',
        href: '/residents',
    },
];

// Konfigurasi kolom untuk residents table
const residentsColumns = [
    {
        name: 'nik',
        label: 'NIK',
        renderCell: (row: Residents) => <div className="font-mono text-sm text-gray-900">{row.nik}</div>,
    },
    {
        name: 'nama_lengkap',
        label: 'Resident Details',
        renderCell: (row: Residents) => (
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white">
                    {row.nama_lengkap.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="font-semibold text-gray-900">{row.nama_lengkap}</div>
                </div>
            </div>
        ),
    },
    {
        name: 'jenis_kelamin',
        label: 'Gender',
        renderCell: (row: Residents) => (
            <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    row.jenis_kelamin === 'L' ? 'border border-blue-200 bg-blue-50 text-blue-700' : 'border border-pink-200 bg-pink-50 text-pink-700'
                }`}
            >
                <div className={`h-1.5 w-1.5 rounded-full ${row.jenis_kelamin === 'L' ? 'bg-blue-500' : 'bg-pink-500'}`} />
                {row.jenis_kelamin === 'L' ? 'Male' : 'Female'}
            </span>
        ),
    },
    {
        name: 'alamat',
        label: 'Address',
        renderCell: (row: Residents) => (
            <div className="max-w-xs">
                <div className="truncate text-sm text-gray-900">{row.alamat}</div>
                <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">RT {row.rt}</span>
                    <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">RW {row.rw}</span>
                </div>
            </div>
        ),
    },
    {
        name: 'pendidikan_terakhir',
        label: 'Last Education',
        renderCell: (row: Residents) => {
            return (
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-semibold text-gray-900">{row.pendidikan_terakhir}</div>
                    </div>
                </div>
            );
        },
    },
];

export default function Dashboard() {
    const { residents } = usePage<PageProps>().props;
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    // Calculate statistics
    const totalResidents = residents.length;
    const maleCount = residents.filter((r) => r.jenis_kelamin === 'L').length;
    const femaleCount = residents.filter((r) => r.jenis_kelamin === 'P').length;

    const handleImportSuccess = (data: any[]) => {
        // Here you would typically send the data to your backend
        console.log('Imported data:', data);
        // You might want to refresh the page or update the state
        // window.location.reload(); // Simple approach
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resident Management" />

            <div className="space-y-6 px-5">
                {/* Action Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Resident Management</h1>
                        <p className="text-white">Manage and view all registered residents in the system</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-all duration-200 hover:border-green-300 hover:bg-green-100 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                        >
                            <Upload className="h-4 w-4" />
                            Import Data
                        </button>
                        <button
                            onClick={() => setShowExportModal(true)}
                            className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                        >
                            <Download className="h-4 w-4" />
                            Export Data
                        </button>
                        <button className="">
                            <Link
                                href="/residents/create"
                                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                            >
                                <Plus className="h-4 w-4" />
                                Add Resident
                            </Link>
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-indigo-100">Total Residents</p>
                                <p className="text-3xl font-bold">{totalResidents.toLocaleString()}</p>
                            </div>
                            <div className="rounded-lg bg-white/20 p-3">
                                <Users className="h-6 w-6" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-100">Male Residents</p>
                                <p className="text-3xl font-bold">{maleCount.toLocaleString()}</p>
                            </div>
                            <div className="rounded-lg bg-white/20 p-3">
                                <Users className="h-6 w-6" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-pink-100">Female Residents</p>
                                <p className="text-3xl font-bold">{femaleCount.toLocaleString()}</p>
                            </div>
                            <div className="rounded-lg bg-white/20 p-3">
                                <Users className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Residents Table */}
                <Table<Residents>
                    columns={residentsColumns}
                    rows={residents}
                    getRowDetailsUrl={(row) => route('residents.edit', row.id)}
                    title="Resident Directory"
                    description="Manage and view all registered residents in the system"
                />
            </div>

            {/* Modals */}
            <ExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} residents={residents} />
            <ImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} onImportSuccess={handleImportSuccess} />
        </AppLayout>
    );
}
