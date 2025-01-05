// StoreExcel.jsx
import * as XLSX from 'xlsx';

export const saveToExcel = async (data, existingFilePath) => {
  try {
    // Load existing workbook if it exists
    let workbook;
    try {
      workbook = XLSX.readFile(existingFilePath);
    } catch {
      // If file doesn't exist, create new workbook
      workbook = XLSX.utils.book_new();
    }

    // Get existing worksheet or create new one
    let worksheet = workbook.Sheets['Bookings'];
    if (!worksheet) {
      // Initialize with headers if it's a new worksheet
      worksheet = XLSX.utils.aoa_to_sheet([['Name', 'Email', 'Date', 'Time']]);
    }

    // Convert worksheet to array of arrays
    let wsData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Add new row
    const newRow = [
      data.name,
      data.email,
      data.date,
      `${data.hour}:${data.minute} ${data.period}`
    ];
    wsData.push(newRow);

    // Convert back to worksheet
    const newWorksheet = XLSX.utils.aoa_to_sheet(wsData);

    // Replace worksheet in workbook
    workbook.Sheets['Bookings'] = newWorksheet;

    // Write to file
    XLSX.writeFile(workbook, existingFilePath);

    return true;
  } catch (error) {
    console.error('Error saving to Excel:', error);
    return false;
  }
};