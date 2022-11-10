const { faker } = require('@faker-js/faker');
const fs = require('fs');
const Papa = require("papaparse");

const reader = require('xlsx')

faker.locale = 'pt_BR';
  
// Reading our test file
const file = reader.readFile('./exemplo.xlsx')
  
let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}

const fakerData = data.map((item) => {
    return {
        ...item,
        Nome: faker.name.firstName(), 
        Sobrenome: faker.name.lastName(),
        'E-mail': faker.internet.email(),
    }
} )

const items = {
    users: fakerData
   }

   
   const csv = Papa.unparse(items.users, {
    header: true,
   } )
   console.log(csv);

   fs.writeFile('Contatos-teste.csv', csv, (err) => {    
    if (err) throw err;  
    console.log('O arquivo foi criado!');
});

    //fs.writeFileSync('db.json', JSON.stringify(items), (err) => {
    //  if (err) throw new err;
    //});