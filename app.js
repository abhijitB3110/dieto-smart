const http = require('http')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

app.use(express.static('private'))
app.use('/values', express.static(__dirname + 'public/values'))

app.get('', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.listen(port, (error) => {
        if(error) {
            console.log('Something went wrong', error)
        } else {
            console.log('Server is listening on port ' + port)
        }
    })


// 'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs')

// const result = excelToJson({
//     source: fs.readFileSync('private/values/newFile.xlsx') // fs.readFileSync return a Buffer
// })

// const result = excelToJson({
//     sourceFile: ('private/values/newFile.xlsx'),
//     sheets: ['Sheet1'],
//     columns: {
//         A: '{{A1}}',
//         B: '{{B1}}',
//         C: '{{C1}}'
//     },
// });

// console.log(result.Sheet1);
    
const xlsx = require('xlsx')
const wb = xlsx.readFile('private/values/newFile.xlsx')

console.log(wb.SheetNames)

const ws = wb.Sheets['foodValues']
console.log(ws)

const data = xlsx.utils.sheet_to_json(ws)
console.log(data)

fs.writeFileSync('private/values/newjson.json', JSON.stringify(data, null, 2))