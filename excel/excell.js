const XLSX = require("xlsx");

const workbook = XLSX.readFile("contatos.xlsx");
const worksheet = workbook.Sheets["pessoas"];
//pegando numero de linhas e colunas
const range = XLSX.utils.decode_range(worksheet["!ref"]);

// Loop over every row/student in our worksheet
for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    const coluna = worksheet[XLSX.utils.encode_cell({ r: rowNum, c:0 })].v;
  
    // Give extra 30 points to Test 2 for students of Lead Paint HS
    if (coluna.length) {
        worksheet[XLSX.utils.encode_cell({ r: rowNum, c:1 })].v += " @ ";
  }
}
  
  const newWb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWb, worksheet, "Pessoas1");
  XLSX.writeFile(newWb, "contatos1.xlsx");