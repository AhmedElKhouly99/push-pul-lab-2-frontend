import * as React from 'react';
import { io } from 'socket.io-client';

import Users from './Users';

const socket = io("http://localhost:3020/");

export default function WhatsApp() {
    const [users, setUsers] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {

        socket.on("allUsers", (newUsers) => {
            setUsers(newUsers);
        })
    }, []);
    

    return (
        <>
        <Users users={users?users:null} socket={socket} />
        
        </>
    );
}
