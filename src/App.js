import React, { useState, useEffect } from "react";
import './index.scss';

export const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [isGlutenFree, setIsGlutenFree] = useState('');
  const get = async () => {
    const response = await fetch('http://192.168.0.12:5000/pizza/');
    console.log(await response);
    const result = await response.json()
      .catch(e => console.log(e.message))
    setData(result);
    console.log(result);
  }
  const create = async () => {
    console.log(name,  isGlutenFree)
    fetch('http://192.168.0.12:5000/pizza/', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({'name': name, 'isGlutenFree': isGlutenFree})
    }).then((res => console.log(res))).catch(e => console.log(e))
}


useEffect(() => {
  get();
}, [])
console.log(name)
return (
  <div className="App">
    <button onClick={get} className="get-data">Получить данные</button>
    <div className="items">
      {data.map((item) => (
        <div key={item.name}>
          <span>{item.id}. </span>{item.name}
        </div>))}
    </div>
    <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} />
    <input type="text" onChange={(e) => { setIsGlutenFree(e.target.value) }} value={isGlutenFree} />
    <button onClick={create}>Добавить</button>
  </div>
);
}