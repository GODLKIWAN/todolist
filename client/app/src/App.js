import {useState, useEffect} from 'react'
import './app.css'

function App() {
    const fetchData = (date) => {
        fetch(`http://localhost:4000/todo/${date}`)
            .then(res => res.json())
            .then((data) => setTodolist(data))
    }
    const [date, setDate] = useState(``);
    const [text, setText] = useState('');

    const [editId, setEditId] = useState(undefined);
    const [edit, setEdit] = useState(false);
    const [editDate, setEditDate] = useState(date);
    const [editText, setEditText] = useState(text);

    const [todolist, setTodolist] = useState(null);

    useEffect(() => {
        fetchData('')
    }, [])
    const onHome = () => {
        fetchData('')
    }
    const onDate = (e) => {
        setDate(e.target.value)
    }
    const onSearch = () => {
        fetchData(date)
    }
    const onPost = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/todo`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: text,
                date
            })
        }).then(() => fetchData(date))
    }
    const onDelete = (id) => {
        fetch(`http://localhost:4000/todo/delete/${id}`, {
            method: 'Delete',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: text,
                date
            })
        }).then(() => fetchData(date))
    }
    const onEdit = () => {
        fetch(`http://localhost:4000/todo/edit/${editId}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                title: editText,
                date: editDate
            })
        }).then(() => {
            setEdit(!edit);
            fetchData(date)
        })
    }
    const onEditCancel =()=>{
        setEdit(!edit);
    }
    return (
        <div>
            <div>
                <button onClick={onHome}>TODOLIST</button>
            </div>
            <input type='text' onChange={(e) => setText(e.target.value)}/><br/>
            <input type='date'
                   onChange={onDate}/><br/>
            <button onClick={onSearch}>search</button>
            <button onClick={onPost}>post</button>
            <h4>{date !== '' ? date : ''}</h4>
            {todolist === null ? <hr/> : todolist.map((todo) =>
                <div key={todo.id} style={{border: "2px black solid", margin: '2px', width: '200px'}}>
                    <span>{todo.title}</span>
                    <div>{todo.date}</div>
                    <button onClick={() => {
                        let id = todo.id;
                        onDelete(id)
                    }}>del
                    </button>
                    <button onClick={() => {
                        setEdit(!edit)
                        setEditId(todo.id);
                    }}>edit
                    </button>
                </div>
            )}
            {edit === true ? <div>
                <hr/>
                <input type='text' placeholder={text} onChange={(e) => setEditText(e.target.value)}></input><br/>
                <input type='date' placeholder={date} onChange={(e) => {
                    setEditDate(e.target.value)
                }}></input><br/>
                <button onClick={onEdit}>edit</button>
                <button onClick={onEditCancel}>cancel</button>
            </div> : <div></div>}
        </div>
    );
}

export default App;
