const { faker, Faker } = require('@faker-js/faker');
const fs = require('fs');
const Papa = require("papaparse");
const reader = require('xlsx')

faker.locale = 'pt_BR';
  
// Reading our test file
const file = reader.readFile('./contatos3.xlsx')
  
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
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const fullName = `${firstName.toLowerCase()}${lastName.toLowerCase()}`
    const number = faker.finance.account(10)
    const code = faker.finance.account(10)
    
    return {
        ...item,
        Nome:`${firstName}`.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
        Sobrenome:`${lastName}`.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
        'E-mail':`${fullName}`+`${number}`+'@example.com',
        'URL Linkedin':'http://www.linkedin.com/in/'+`${fullName}` + `${code}`
    }
    } )

const items = {
    users: fakerData
   }

   
   const csv = Papa.unparse(items.users, {
    header: true,
   } )
   console.log(csv);

   fs.writeFile('testnovo.csv', csv, (err) => {    
    if (err) throw err;  
});

    //fs.writeFileSync('db.json', JSON.stringify(items), (err) => {
    //  if (err) throw new err;
    //});