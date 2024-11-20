import { CSVLink } from "react-csv";
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
export const generateExcel = async (data,reportName) => {
    const workbook = new ExcelJS.Workbook();

    // Create a single worksheet
    const sheet = workbook.addWorksheet(reportName);

    // Auto fit columns based on content
    const autoFitColumns = (sheet) => {
        sheet.columns.forEach(column => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, cell => {
                const cellLength = cell.value ? cell.value.toString().length : 10;
                maxLength = Math.max(maxLength, cellLength);
            });
            column.width = maxLength + 2; // Adding some extra padding
        });
    };

    // Function to add data and style headers
    const addDataWithStyles = (sheet, data) => {
        if (data.length === 0) return; // Ensure data exists before proceeding

        // Extract headers from the first row of data
        const headers = Object.keys(data[0]);

        // Add header row
        const headerRow = sheet.addRow(headers);

        // Style the header
        headerRow.eachCell((cell) => {
            cell.font = { bold: true }; // Bold headers
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '00B050' } // Green background for header
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        // Add data rows with conditional styling
        data.forEach((item) => {
            const row = sheet.addRow(Object.values(item));

            row.eachCell((cell) => {
                // Add border to each data cell
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        // Auto adjust column width after data is inserted
        autoFitColumns(sheet);
    };

    // Helper function to remove 'SR_NO' field from each data object
    const removeSRNO = data => data.map(({ SR_NO, ...rest }) => rest);

    // Add data and styles to the sheet
    addDataWithStyles(sheet, removeSRNO(data));

    // Generate Excel file and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const excelBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, `${reportName}.xlsx`);
};