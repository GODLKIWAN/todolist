import {useState, useEffect} from 'react'

function App() {
    const fetchData = (date) => {
        fetch(`http://localhost:4000/todo/${date}`)
            .then(res => res.json())
            .then((data) => setTodolist(data))
    }
    const [date, setDate] = useState('');
    const [text, setText] = useState('');
    const [todolist, setTodolist] = useState(null);
    useEffect(() => {
        fetchData('')
    }, [])
    const onHome =() =>{
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
        fetch(`http://localhost:4000/todo`,{
            method:'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: text,
                checked: true,
                date
            })
        }).then(()=>fetchData(date))

    }
    return (
        <div>
            <h1 onClick={onHome}>TODOLIST</h1>
            <input type='text' onChange={(e)=>setText(e.target.value)}/>
            <input type='date'
                   onChange={onDate}/><br/>
            <button onClick={onSearch}>search</button>
            <button onClick={onPost}>post</button>
            <h4>{date !== '' ? date : ''}</h4>
            {todolist === null ? <hr/> : todolist.map((todo) =>
                <div key={todo.id} style={{border: "2px black solid", margin: '2px'}}>
                    <div>{todo.title}</div>
                    <div>{todo.date}</div>
                </div>
            )}
        </div>
    );
}

export default App;
