import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


export default function UserMsgs({socket, userId}) {
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    React.useEffect(() => {
        socket.on("newMsg", (msg) => {
            setMessages([...messages, msg]);
        })
    }, [messages]);

    return (
        <>

            <Stack spacing={2} >
                <Box
                >
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        socket.emit('msg', {id:userId , msg:message});
                        setMessages([...messages, message])
                        setMessage('');
                    }}>
                        <TextField value={message} fullWidth label="Enter Your Message Here ..." id="fullWidth"
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </form>
                </Box>


                <List dense sx={{ width: '100%', bgcolor: 'lightGray' }}>
                    {messages.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem
                                key={Math.ceil(Math.random() * 100000)}
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={value} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Stack>
        </>
    );
}
