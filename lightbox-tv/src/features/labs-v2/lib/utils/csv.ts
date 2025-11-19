import Papa from 'papaparse';

export interface CSVExportOptions {
  filename?: string;
  headers?: boolean;
}

export const exportToCSV = <T extends Record<string, unknown>>(
  data: T[],
  options: CSVExportOptions = {}
): void => {
  const { filename = 'export.csv', headers = true } = options;
  
  const csv = Papa.unparse(data, {
    header: headers,
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const parseCSV = <T>(csvString: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(csvString, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};


