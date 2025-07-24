import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Bell, CheckCircle, Clock, FileText, Shield, Users } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: FileText,
            title: 'Pengajuan Surat Online',
            description: 'Ajukan berbagai jenis surat secara online kapan saja, tanpa perlu datang ke kantor desa.',
            color: 'from-green-500 to-emerald-600',
        },
        {
            icon: Clock,
            title: 'Tracking Status Real-time',
            description: 'Pantau status pengajuan surat Anda secara real-time dengan sistem notifikasi yang akurat.',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: Users,
            title: 'Database Penduduk Terintegrasi',
            description: 'Sistem terintegrasi dengan database penduduk untuk validasi data yang lebih akurat.',
            color: 'from-purple-500 to-purple-600',
        },
        {
            icon: Bell,
            title: 'Notifikasi Otomatis',
            description: 'Terima notifikasi otomatis setiap ada perubahan status pada pengajuan surat Anda.',
            color: 'from-orange-500 to-orange-600',
        },
    ];

    return (
        <>
            <Head title="Sistem Informasi Surat Menyurat - Desa Tapakrejo" />

            <div className="min-h-screen bg-white">
                {/* Navbar */}
                <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Desa Tapakrejo</h1>
                                    <p className="text-xs text-gray-500">Surat Menyurat Digital</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="hidden items-center space-x-8 md:flex">
                                <a href="#beranda" className="font-medium text-gray-700 transition-colors duration-200 hover:text-green-600">
                                    Beranda
                                </a>
                                <a href="#layanan" className="font-medium text-gray-700 transition-colors duration-200 hover:text-green-600">
                                    Layanan
                                </a>
                                <a href="#tentang" className="font-medium text-gray-700 transition-colors duration-200 hover:text-green-600">
                                    Tentang
                                </a>
                                <a href="#tentang" className="font-medium text-gray-700 transition-colors duration-200 hover:text-green-600">
                                    Lacak Surat
                                </a>
                                <a href="#tentang" className="font-medium text-gray-700 transition-colors duration-200 hover:text-green-600">
                                    Ajukan Surat
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section
                    id="beranda"
                    className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-green-400 blur-3xl"></div>
                        <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-emerald-400 blur-3xl"></div>
                    </div>

                    <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center space-x-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                                        <Shield className="h-4 w-4" />
                                        <span>Sistem Terpercaya & Aman</span>
                                    </div>
                                    <h1 className="text-4xl leading-tight font-bold text-gray-900 lg:text-6xl">
                                        Sistem Informasi
                                        <span className="block bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                                            Surat Menyurat
                                        </span>
                                        <span className="mt-2 block text-2xl font-normal text-gray-600 lg:text-3xl">Desa Tapakrejo</span>
                                    </h1>
                                    <p className="max-w-lg text-lg text-gray-600">
                                        Kelola surat masuk, surat keluar, dan permohonan surat warga secara digital. Proses yang lebih cepat,
                                        transparan, dan efisien untuk pelayanan masyarakat.
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    <div className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm">
                                        <div className="text-2xl font-bold text-green-600">500+</div>
                                        <div className="text-sm text-gray-500">Surat Diproses</div>
                                    </div>
                                    <div className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm">
                                        <div className="text-2xl font-bold text-emerald-600">24/7</div>
                                        <div className="text-sm text-gray-500">Akses Online</div>
                                    </div>
                                    <div className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm">
                                        <div className="text-2xl font-bold text-blue-600">3 Hari</div>
                                        <div className="text-sm text-gray-500">Rata-rata Proses</div>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <Link
                                        href={auth.user ? route('dashboard') : route('login')}
                                        className="group rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-center font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <span>{auth.user ? 'Masuk ke Dashboard' : 'Ajukan Surat Sekarang'}</span>
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                    <button className="rounded-lg border border-gray-200 bg-white px-8 py-4 font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
                                        Lihat Panduan
                                    </button>
                                </div>
                            </div>

                            {/* Right Content - Dashboard Preview */}
                            <div className="relative">
                                <div className="relative z-10 rounded-2xl bg-white p-8 shadow-2xl">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900">Dashboard Surat</h3>
                                            <div className="flex space-x-2">
                                                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3 rounded-lg bg-green-50 p-3">
                                                <FileText className="h-5 w-5 text-green-600" />
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-900">Surat Keterangan Domisili</div>
                                                    <div className="text-xs text-gray-500">Diajukan 2 hari yang lalu</div>
                                                </div>
                                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">Selesai</span>
                                            </div>

                                            <div className="flex items-center space-x-3 rounded-lg bg-blue-50 p-3">
                                                <Clock className="h-5 w-5 text-blue-600" />
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-900">Surat Keterangan Usaha</div>
                                                    <div className="text-xs text-gray-500">Diajukan 1 hari yang lalu</div>
                                                </div>
                                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">Proses</span>
                                            </div>

                                            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                                                <FileText className="h-5 w-5 text-gray-600" />
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-900">Surat Keterangan Tidak Mampu</div>
                                                    <div className="text-xs text-gray-500">Diajukan hari ini</div>
                                                </div>
                                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">Menunggu</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 opacity-20"></div>
                                <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 opacity-20"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="layanan" className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">Layanan & Fitur Unggulan</h2>
                            <p className="mx-auto max-w-3xl text-lg text-gray-600">
                                Nikmati berbagai fitur canggih yang memudahkan pengurusan surat menyurat di desa. Sistem yang user-friendly dan
                                terintegrasi untuk pelayanan terbaik.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group relative rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
                                >
                                    <div
                                        className={`h-12 w-12 bg-gradient-to-r ${feature.color} mb-4 flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                                    <p className="leading-relaxed text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Letter Types */}
                        <div className="mt-16 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-8 lg:p-12">
                            <div className="grid items-center gap-8 lg:grid-cols-2">
                                <div>
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">Jenis Surat yang Tersedia</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-gray-700">Surat Keterangan Domisili</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-gray-700">Surat Keterangan Usaha</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-gray-700">Surat Keterangan Tidak Mampu</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-gray-700">Surat Keterangan Kelahiran</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-gray-700">Surat Keterangan Kematian</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-gray-700">Dan masih banyak lagi...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center lg:text-right">
                                    <div className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg">
                                        <FileText className="h-16 w-16 text-green-600" />
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        Lebih dari <span className="font-bold text-green-600">15 jenis surat</span>
                                        dapat diajukan secara online
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="tentang" className="bg-gradient-to-br from-gray-50 to-white py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">Tentang Desa Tapakrejo</h2>
                            <p className="mx-auto max-w-3xl text-lg text-gray-600">
                                Desa Tapakrejo berkomitmen memberikan pelayanan terbaik kepada warga melalui inovasi teknologi dan sistem informasi
                                yang modern.
                            </p>
                        </div>

                        {/* Statistics */}
                        <div className="mb-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold text-green-600 lg:text-4xl">1,200+</div>
                                <div className="font-medium text-gray-600">Warga Terdaftar</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold text-green-600 lg:text-4xl">500+</div>
                                <div className="font-medium text-gray-600">Surat Diproses</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold text-green-600 lg:text-4xl">24/7</div>
                                <div className="font-medium text-gray-600">Layanan Online</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold text-green-600 lg:text-4xl">99%</div>
                                <div className="font-medium text-gray-600">Kepuasan Warga</div>
                            </div>
                        </div>

                        {/* Vision & Mission */}
                        <div className="mb-16 grid gap-12 lg:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                                <div className="mb-6 flex items-center space-x-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    Menjadi desa yang maju, sejahtera, dan modern dengan memanfaatkan teknologi informasi untuk memberikan pelayanan
                                    terbaik kepada masyarakat dalam pengurusan administrasi surat menyurat yang efisien, transparan, dan akuntabel.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                                <div className="mb-6 flex items-center space-x-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
                                </div>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start space-x-2">
                                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                        <span>Memberikan pelayanan administrasi yang cepat dan akurat</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                        <span>Meningkatkan transparansi dalam proses pengurusan surat</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                        <span>Mengoptimalkan penggunaan teknologi untuk efisiensi</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                        <span>Membangun kepercayaan masyarakat melalui pelayanan prima</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {/* Brand */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                                        <FileText className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold">Desa Tapakrejo</h1>
                                        <p className="text-sm text-gray-400">Surat Menyurat Digital</p>
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed text-gray-400">
                                    Sistem informasi surat menyurat yang modern dan efisien untuk pelayanan masyarakat yang lebih baik.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Navigasi Cepat</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#beranda" className="text-gray-400 transition-colors hover:text-white">
                                            Beranda
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#layanan" className="text-gray-400 transition-colors hover:text-white">
                                            Layanan
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#tentang" className="text-gray-400 transition-colors hover:text-white">
                                            Tentang
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Kontak Kami</h3>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <p>Jl. Tapakrejo</p>
                                    <p>Desa Tapakrejo, Kec. Kesamben</p>
                                    <p>Kabupaten Blitar, 12345</p>
                                    <p className="mt-2">
                                        Email: info@tapakrejo.desa.id
                                        <br />
                                        Telp: (021) 123-4567
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
                            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Desa Tapakrejo. Semua hak dilindungi.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
