import { Residents } from '@/types';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface ImportResult {
    success: boolean;
    data?: Partial<Residents>[];
    errors?: string[];
    totalRows?: number;
    validRows?: number;
}

export interface ImportOptions {
    validateData?: boolean;
    skipEmptyRows?: boolean;
}

// Validate resident data
const validateResidentData = (data: any): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Required fields validation
    if (!data.nik || data.nik.toString().trim() === '') {
        errors.push('NIK is required');
    }

    if (!data.nama_lengkap || data.nama_lengkap.toString().trim() === '') {
        errors.push('Nama Lengkap is required');
    }

    // NIK format validation (should be 16 digits)
    if (data.nik && !/^\d{16}$/.test(data.nik.toString().replace(/\s/g, ''))) {
        errors.push('NIK must be 16 digits');
    }

    // Gender validation
    if (data.jenis_kelamin && !['L', 'P', 'Laki-laki', 'Perempuan'].includes(data.jenis_kelamin)) {
        errors.push('Jenis Kelamin must be L/P or Laki-laki/Perempuan');
    }

    // Date validation
    if (data.tanggal_lahir) {
        const date = new Date(data.tanggal_lahir);
        if (isNaN(date.getTime())) {
            errors.push('Tanggal Lahir format is invalid');
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

// Normalize imported data
const normalizeResidentData = (rawData: any): Partial<Residents> => {
    const normalized: Partial<Residents> = {};

    // Map common column variations
    const fieldMappings: { [key: string]: keyof Residents } = {
        nik: 'nik',
        NIK: 'nik',
        nama_lengkap: 'nama_lengkap',
        NAMA: 'nama_lengkap',
        nama: 'nama_lengkap',
        Nama: 'nama_lengkap',
        jenis_kelamin: 'jenis_kelamin',
        'JENIS KELAMIN': 'jenis_kelamin',
        alamat: 'alamat',
        ALAMAT: 'alamat',
        rt: 'rt',
        RT: 'rt',
        rw: 'rw',
        RW: 'rw',
        pendidikan_terakhir: 'pendidikan_terakhir',
        'PENDIDIKAN TERAKHIR': 'pendidikan_terakhir',
        agama: 'agama',
        AGAMA: 'agama',
        no_kk: 'no_kk',
        'NO KK': 'no_kk',
        status_dalam_keluarga: 'status_dalam_keluarga',
        HUBUNGAN: 'status_dalam_keluarga',
    };

    // Map fields
    Object.keys(rawData).forEach((key) => {
        const mappedField = fieldMappings[key];
        if (mappedField && rawData[key] !== null && rawData[key] !== undefined) {
            let value = rawData[key];

            // Special handling for specific fields
            switch (mappedField) {
                case 'jenis_kelamin':
                    if (value === 'LAKI-LAKI') value = 'L';
                    if (value === 'PEREMPUAN') value = 'P';
                    break;
                // case 'tanggal_lahir':
                //     if (value) {
                //         const date = new Date(value);
                //         if (!isNaN(date.getTime())) {
                //             value = date;
                //         }
                //     }
                //     break;
                case 'nik':
                    value = value.toString().replace(/\s/g, '');
                    break;
            }

            normalized[mappedField] = value;
        }
    });

    return normalized;
};

// Import from Excel
export const importFromExcel = (file: File, options: ImportOptions = {}): Promise<ImportResult> => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                const result = processImportedData(jsonData, options);
                resolve(result);
            } catch (error) {
                resolve({
                    success: false,
                    errors: [`Error reading Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`],
                });
            }
        };

        reader.readAsArrayBuffer(file);
    });
};

// Import from CSV
export const importFromCSV = (file: File, options: ImportOptions = {}): Promise<ImportResult> => {
    return new Promise((resolve) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: options.skipEmptyRows !== false,
            complete: (results) => {
                if (results.errors.length > 0) {
                    resolve({
                        success: false,
                        errors: results.errors.map((error) => `Row ${error.row}: ${error.message}`),
                    });
                    return;
                }

                const result = processImportedData(results.data, options);
                resolve(result);
            },
            error: (error) => {
                resolve({
                    success: false,
                    errors: [`Error reading CSV file: ${error.message}`],
                });
            },
        });
    });
};

// Process imported data
const processImportedData = (rawData: any[], options: ImportOptions): ImportResult => {
    const processedData: Partial<Residents>[] = [];
    const errors: string[] = [];
    let validRows = 0;

    rawData.forEach((row, index) => {
        try {
            const normalized = normalizeResidentData(row);

            if (options.validateData !== false) {
                const validation = validateResidentData(normalized);
                if (!validation.isValid) {
                    errors.push(`Row ${index + 1}: ${validation.errors.join(', ')}`);
                    return;
                }
            }

            processedData.push(normalized);
            validRows++;
        } catch (error) {
            errors.push(`Row ${index + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });

    return {
        success: errors.length === 0 || validRows > 0,
        data: processedData,
        errors: errors.length > 0 ? errors : undefined,
        totalRows: rawData.length,
        validRows,
    };
};

// Main import function
export const importResidents = (file: File, options: ImportOptions = {}): Promise<ImportResult> => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    switch (fileExtension) {
        case 'xlsx':
        case 'xls':
            return importFromExcel(file, options);
        case 'csv':
            return importFromCSV(file, options);
        default:
            return Promise.resolve({
                success: false,
                errors: ['Unsupported file format. Please use Excel (.xlsx, .xls) or CSV (.csv) files.'],
            });
    }
};
