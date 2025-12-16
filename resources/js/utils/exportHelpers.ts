/**
 * Convert an array of objects to CSV format
 */
export function arrayToCSV(data: any[], headers: string[]): string {
    if (data.length === 0) return '';

    const csvRows = [];

    // Add header row
    csvRows.push(headers.join(','));

    // Add data rows
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header];
            // Escape quotes and wrap in quotes if contains comma, newline, or quote
            const escaped = String(value || '').replace(/"/g, '""');
            return /[,"\n]/.test(escaped) ? `"${escaped}"` : escaped;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

/**
 * Download CSV file
 */
export function downloadCSV(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Export data to CSV with automatic download
 */
export function exportToCSV(data: any[], headers: string[], filename: string): void {
    const csv = arrayToCSV(data, headers);
    downloadCSV(csv, `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
}
