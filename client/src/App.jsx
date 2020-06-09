import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { useCallback } from 'react';

function App() {

    const [data, setData] = useState([]);
    const nome = useRef(null);
    const email = useRef(null);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        
        const data = {
            nome: nome.current.value,
            email: email.current.value,
        };

        fetch('http://localhost:9000/cadastrar', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch(console.error);
    }, []);

    useEffect(() => {
        fetch('http://localhost:9000/listar')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch(console.error);
    }, []);

    return (
        <div id="app">
            <form onSubmit={handleSubmit} method="post">
                <div className="form-control">
                    <label htmlFor="nome">Nome: </label>
                    <input name="nome" id="nome" ref={nome} />
                </div>
                <div className="form-control">
                    <label htmlFor="email">E-mail: </label>
                    <input name="email" id="email" ref={email} />
                </div>
                <div className="form-control">
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((it) => (
                        <tr>
                            <td>{it.id}</td>
                            <td>{it.nome}</td>
                            <td>{it.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
