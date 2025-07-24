import { Residents } from '@/types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

export interface ExportOptions {
    format: 'excel' | 'csv' | 'pdf';
    filename?: string;
    includeColumns?: string[];
}

// Format data for export
const formatResidentData = (residents: Residents[], includeColumns?: string[]) => {
    const defaultColumns = ['nik', 'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'alamat', 'rt', 'rw', 'status_pernikahan'];

    const columnsToInclude = includeColumns || defaultColumns;

    return residents.map((resident) => {
        const formattedResident: any = {};

        columnsToInclude.forEach((column) => {
            switch (column) {
                case 'nik':
                    formattedResident['NIK'] = resident.nik;
                    break;
                case 'nama_lengkap':
                    formattedResident['Nama Lengkap'] = resident.nama_lengkap;
                    break;
                case 'jenis_kelamin':
                    formattedResident['Jenis Kelamin'] = resident.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan';
                    break;
                case 'alamat':
                    formattedResident['Alamat'] = resident.alamat;
                    break;
                case 'rt':
                    formattedResident['RT'] = resident.rt;
                    break;
                case 'rw':
                    formattedResident['RW'] = resident.rw;
                    break;
                case 'pendidikan_terakhir':
                    formattedResident['Pendidikan Terakhir'] = resident.pendidikan_terakhir;
                    break;
                default:
                    if (resident[column as keyof Residents]) {
                        formattedResident[column] = resident[column as keyof Residents];
                    }
            }
        });

        return formattedResident;
    });
};

// Export to Excel
export const exportToExcel = (residents: Residents[], options: ExportOptions) => {
    const formattedData = formatResidentData(residents, options.includeColumns);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    // Set column widths
    const columnWidths = [
        { wch: 20 }, // NIK
        { wch: 25 }, // Nama Lengkap
        { wch: 15 }, // Tempat Lahir
        { wch: 15 }, // Tanggal Lahir
        { wch: 15 }, // Jenis Kelamin
        { wch: 30 }, // Alamat
        { wch: 5 }, // RT
        { wch: 5 }, // RW
        { wch: 15 }, // Status Pernikahan
    ];
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Penduduk');

    const filename = options.filename || `data-penduduk-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
};

// Export to CSV
export const exportToCSV = (residents: Residents[], options: ExportOptions) => {
    const formattedData = formatResidentData(residents, options.includeColumns);
    const csv = Papa.unparse(formattedData);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', options.filename || `data-penduduk-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Export to PDF
export const exportToPDF = (residents: Residents[], options: ExportOptions) => {
    const doc = new jsPDF();
    const formattedData = formatResidentData(residents, options.includeColumns);

    // Add title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Data Penduduk', 14, 22);

    // Add date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Dicetak pada: ${new Date().toLocaleDateString('id-ID')}`, 14, 30);

    // Prepare table data
    const headers = Object.keys(formattedData[0] || {});
    const rows = formattedData.map((item) => headers.map((header) => item[header] || ''));

    // Add table
    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 35,
        styles: {
            fontSize: 8,
            cellPadding: 2,
        },
        headStyles: {
            fillColor: [79, 70, 229], // Indigo color
            textColor: 255,
            fontStyle: 'bold',
        },
        alternateRowStyles: {
            fillColor: [249, 250, 251], // Light gray
        },
        margin: { top: 35 },
    });

    const filename = options.filename || `data-penduduk-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
};

// Main export function
export const exportResidents = (residents: Residents[], options: ExportOptions) => {
    switch (options.format) {
        case 'excel':
            exportToExcel(residents, options);
            break;
        case 'csv':
            exportToCSV(residents, options);
            break;
        case 'pdf':
            exportToPDF(residents, options);
            break;
        default:
            throw new Error('Unsupported export format');
    }
};
