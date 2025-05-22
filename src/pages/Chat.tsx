import { Box, Container, Paper, Typography, TextField, IconButton, List, ListItem, ListItemText, ListItemButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  height: 'calc(100vh - 128px)',
  display: 'flex',
  gap: theme.spacing(2),
  fontFamily: '"Poppins", sans-serif',
}));

const SidebarContainer = styled(Paper)(({ theme }) => ({
  width: '260px',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  backgroundColor: '#4A4A4A',
  color: '#fff',
}));

const ChatContainer = styled(Paper)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: '#4A4A4A',
  color: '#fff',
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  backgroundColor: '#4A4A4A',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: '#4A4A4A',
  borderRadius: theme.spacing(1),
}));

const MessageBubble = styled(Paper)<{ isUser: boolean }>(({ theme, isUser }) => ({
  padding: theme.spacing(2),
  maxWidth: '80%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backgroundColor: isUser ? '#FF6B00' : '#555555',
  color: '#fff',
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const NewChatButton = styled(ListItemButton)(({ theme }) => ({
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: theme.spacing(1),
  height: '50px',
  maxHeight: '50px',
  minHeight: '30px !important',
  padding: '0 8px',
  backgroundColor: 'rgba(255,107,0,0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255,107,0,0.2)',
    borderColor: '#FF6B00',
  },
}));

const ChatListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  '&.Mui-selected': {
    backgroundColor: 'rgba(255,107,0,0.3)',
    '&:hover': {
      backgroundColor: 'rgba(255,107,0,0.4)',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
}));

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, title: 'Novo Chat', messages: [] }
  ]);
  const [activeChat, setActiveChat] = useState<number>(1);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { id: Date.now(), text: message, isUser: true },
              { id: Date.now() + 1, text: 'Esta é uma resposta automática de exemplo.', isUser: false }
            ]
          };
        }
        return chat;
      });
    });
    setMessage('');
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: 'Novo Chat',
      messages: []
    };
    setChats(prev => [...prev, newChat]);
    setActiveChat(newChat.id);
  };

  const currentChat = chats.find(chat => chat.id === activeChat);

  return (
    <StyledContainer maxWidth="xl">
      <SidebarContainer elevation={3}>
        <NewChatButton onClick={handleNewChat}>
          <AddIcon sx={{ mr: 1, fontSize: '16px' }} />
          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Novo Chat</Typography>
        </NewChatButton>
        <List sx={{ flex: 1, overflowY: 'auto', pl: 0 }}>
          {chats.map((chat) => (
            <ListItem 
              key={chat.id}
              disablePadding
            >
              <ChatListItem 
                selected={activeChat === chat.id}
                onClick={() => setActiveChat(chat.id)}
              >
                <ChatIcon sx={{ mr: 1, fontSize: '20px' }} />
                <ListItemText 
                  primary={chat.title} 
                  primaryTypographyProps={{ 
                    variant: 'body2',
                    sx: { color: '#fff' }
                  }}
                />
              </ChatListItem>
            </ListItem>
          ))}
        </List>
      </SidebarContainer>

      <ChatContainer elevation={0}>
        <MessageContainer>
          {currentChat?.messages.map((msg) => (
            <MessageBubble key={msg.id} isUser={msg.isUser} elevation={1}>
              <Typography sx={{ 
                fontSize: '0.95rem',
                fontWeight: msg.isUser ? 500 : 400 
              }}>
                {msg.text}
              </Typography>
            </MessageBubble>
          ))}
        </MessageContainer>

        <InputContainer>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#555555',
                color: '#fff',
                '& fieldset': {
                  borderColor: 'rgba(255,107,0,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: '#FF6B00',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6B00',
                },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'rgba(255,255,255,0.5)',
              },
            }}
          />
          <IconButton 
            color="primary" 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            sx={{ 
              backgroundColor: '#FF6B00',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#e66000',
              },
              '&.Mui-disabled': {
                backgroundColor: '#4A4A4A',
                color: '#fff',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </InputContainer>
      </ChatContainer>
    </StyledContainer>
  );
};

export default Chat;