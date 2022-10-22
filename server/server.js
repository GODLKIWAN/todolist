// D:\Code\egoing\express_test\server> node app.js
const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors')
app.use(morgan('tiny'));
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

let id = 4
const todoList = [{
    id: 1,
    title: "new todolist open",
    date: '2022-10-22',
    checked: true,
},{
    id: 2,
    title: "todolist 1",
    date: '2022-10-22',
    checked: true,
},{
    id: 3,
    title: "todolist 2",
    date: '2022-10-23',
    checked: true,
}]
app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/todo/', (req, res) => {
    res.json(todoList)
})
app.get('/todo/:date', (req, res) => {
    let list = []
    todoList.forEach(e=>{
        if(e.date=== req.params.date){
            list.push(e)
        }
    })
    res.json(list)
})
app.post('/todo/', (req, res) => {
    console.log('req.body', req.body); //데이터 전송 확인
    const {title,date,checked} = req.body;
    todoList.push({
            id: id++,
            title,
            checked,
            date,
        }
    )
    return res.send('success')
})


app.listen(4000, () => {
    console.log("server start!")
})