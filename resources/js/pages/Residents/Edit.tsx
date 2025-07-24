import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem, type Residents } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, MapPin, Save, Trash2, User } from 'lucide-react';

interface EditPageProps extends PageProps {
    resident: Residents;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Residents',
        href: '/residents',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function Edit() {
    const { resident } = usePage<EditPageProps>().props;

    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        nik: resident.nik || '',
        nama_lengkap: resident.nama_lengkap || '',
        jenis_kelamin: resident.jenis_kelamin || '',
        alamat: resident.alamat || '',
        rt: resident.rt || '',
        rw: resident.rw || '',
        pendidikan_terakhir: resident.pendidikan_terakhir || '',
        agama: resident.agama || '',
        no_kk: resident.no_kk || '',
        status_dalam_keluarga: resident.status_dalam_keluarga || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('residents.update', resident.id));
    };

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route('residents.delete', resident.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${resident.nama_lengkap}`} />

            <div className="mx-5 max-w-7xl space-y-6">
                {/* Header */}
                <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                            <User className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{resident.nama_lengkap}</h1>
                            <p className="text-indigo-100">NIK: {resident.nik}</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Edit Resident Information</h2>
                        <p className="mt-1 text-sm text-gray-600">Update the resident's personal and contact information</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 p-6">
                        {/* Personal Information Section */}
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-indigo-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="nik" className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                        NIK <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nik"
                                        value={data.nik}
                                        onChange={(e) => setData('nik', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                            errors.nik
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                        }`}
                                        placeholder="Enter NIK"
                                    />
                                    {errors.nik && (
                                        <div className="flex items-center gap-1 text-sm text-red-600">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.nik}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="nama_lengkap" className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_lengkap"
                                        value={data.nama_lengkap}
                                        onChange={(e) => setData('nama_lengkap', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                            errors.nama_lengkap
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                        }`}
                                        placeholder="Enter full name"
                                    />
                                    {errors.nama_lengkap && (
                                        <div className="flex items-center gap-1 text-sm text-red-600">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.nama_lengkap}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="jenis_kelamin" className="text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <select
                                        id="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        onChange={(e) => setData('jenis_kelamin', e.target.value as 'L' | 'P')}
                                        className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                            errors.jenis_kelamin
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                        }`}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="L">Male</option>
                                        <option value="P">Female</option>
                                    </select>
                                    {errors.jenis_kelamin && (
                                        <div className="flex items-center gap-1 text-sm text-red-600">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.jenis_kelamin}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="pendidikan_terakhir" className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                        Last Education <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="pendidikan_terakhir"
                                        value={data.pendidikan_terakhir}
                                        onChange={(e) => setData('pendidikan_terakhir', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                            errors.pendidikan_terakhir
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                        }`}
                                        placeholder="Enter full name"
                                    />
                                    {errors.pendidikan_terakhir && (
                                        <div className="flex items-center gap-1 text-sm text-red-600">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.pendidikan_terakhir}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="agama" className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                        Religion <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="agama"
                                        value={data.agama}
                                        onChange={(e) => setData('agama', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                            errors.agama
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                        }`}
                                        placeholder="Enter religion"
                                    />
                                    {errors.agama && (
                                        <div className="flex items-center gap-1 text-sm text-red-600">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.agama}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="no_kk" className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                        Family Card Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="no_kk"
                                        value={data.no_kk}
                                        onChange={(e) => setData('no_kk', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                            errors.no_kk
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                        }`}
                                        placeholder="Enter family card number"
                                    />
                                    {errors.no_kk && (
                                        <div className="flex items-center gap-1 text-sm text-red-600">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.no_kk}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="status_dalam_keluarga" className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                        Family Status <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="status_dalam_keluarga"
                                        value={data.status_dalam_keluarga}
                                        onChange={(e) => setData('status_dalam_keluarga', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                            errors.status_dalam_keluarga
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                        }`}
                                        placeholder="Enter family status"
                                    />
                                    {errors.status_dalam_keluarga && (
                                        <div className="flex items-center gap-1 text-sm text-red-600">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.status_dalam_keluarga}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Address Information Section */}
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-indigo-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="alamat" className="text-sm font-medium text-gray-700">
                                        Street Address
                                    </label>
                                    <textarea
                                        id="alamat"
                                        value={data.alamat}
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        rows={3}
                                        className={`w-full resize-none rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                            errors.alamat
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                        }`}
                                        placeholder="Enter street address"
                                    />
                                    {errors.alamat && (
                                        <div className="flex items-center gap-1 text-sm text-red-600">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.alamat}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="rt" className="text-sm font-medium text-gray-700">
                                            RT (Neighborhood Unit)
                                        </label>
                                        <input
                                            type="text"
                                            id="rt"
                                            value={data.rt}
                                            onChange={(e) => setData('rt', e.target.value)}
                                            className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                                errors.rt
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                            }`}
                                            placeholder="Enter RT"
                                        />
                                        {errors.rt && (
                                            <div className="flex items-center gap-1 text-sm text-red-600">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.rt}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="rw" className="text-sm font-medium text-gray-700">
                                            RW (Community Unit)
                                        </label>
                                        <input
                                            type="text"
                                            id="rw"
                                            value={data.rw}
                                            onChange={(e) => setData('rw', e.target.value)}
                                            className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                                                errors.rw
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                                            }`}
                                            placeholder="Enter RW"
                                        />
                                        {errors.rw && (
                                            <div className="flex items-center gap-1 text-sm text-red-600">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.rw}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-6 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Resident
                            </button>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Update Resident
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
