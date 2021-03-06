const http = require('http')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))

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
    
const xlsx = require('xlsx')
const wb = xlsx.readFile('private/values/newFile.xlsx')

// console.log(wb.SheetNames)

const ws = wb.Sheets['foodValues']
// console.log(ws)

const data = xlsx.utils.sheet_to_json(ws)
// console.log(data)

fs.writeFileSync('private/values/newjson.json', JSON.stringify(data, null, 2))