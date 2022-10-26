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
let todoList = [{
    id: 1,
    title: "new todolist open",
    date: '2022-10-22',
}, {
    id: 2,
    title: "todolist 1",
    date: '2022-10-22',
}, {
    id: 3,
    title: "todolist 2",
    date: '2022-10-23',
}]


app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/todo/', (req, res) => {
    todoList.sort((a, b) => a.id - b.id)
    res.json(todoList)
})
app.get('/todo/:date', (req, res) => {
    let list = []
    todoList.forEach(e => {
        if (e.date === req.params.date) {
            list.push(e)
        }
    })
    res.json(list)
})
app.post('/todo/', (req, res) => {
    console.log('req.body', req.body); //데이터 전송 확인
    const {title, date} = req.body;
    todoList.push({
            id: id++,
            title,
            date,
        }
    )
    return res.send('success')
})
app.get('/todo/id/:id', (req, res) => {
    let list = []
    console.log(req.params.id)
    todoList.forEach(e => {
        if (e.id === Number(req.params.id)) {
            list.push(e)
        }
    })
    res.json(list)
})
app.delete('/todo/delete/:id', (req, res) => {
    let count = 0;
    let temp = 0;
    todoList.forEach(e => {
        if (e.id === Number(req.params.id)) {
            temp = count
        }
        count++;
    })
    todoList[temp].id = todoList.length;
    todoList.sort((a, b) => a.id - b.id);
    todoList.pop()
    res.json(todoList)
})

app.post('/todo/edit/:id/', (req, res) => {
    let count = 0;
    let temp = 0;
    let id = '';
    todoList.forEach(e => {
        if (e.id === Number(req.params.id)) {
            temp = count
        }
        count++;
    })
    id = todoList[temp].id;

    todoList[temp].id = todoList.length;
    todoList.pop()

    const {title, date} = req.body;
    todoList.push({
        id,
        title,
        date,
    })
    todoList.sort((a, b) => a.id - b.id);
    res.json(todoList)
})

app.listen(4000, () => {
    console.log("server start!")
})