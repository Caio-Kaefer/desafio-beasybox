import { Box, Container, Paper, Typography, TextField, IconButton, List, ListItem, ListItemText, ListItemButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { aiService } from '../services/aiService';

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

const MAX_MESSAGE_LENGTH = 500; 
const MIN_MESSAGE_LENGTH = 2;   

const COMPANY_CONTEXT = {
  name: 'Taurus',
  description: 'Especialista em soluções para automação e otimização de processos empresariais',
  expertise: ['Automação de Processos', 'Análise de Dados', 'Consultoria'],
  tone: 'direto e profissional',
  language: 'pt-BR',
  responseStyle: 'objetivo'
};

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>(() => {
    const savedChats = localStorage.getItem('chats');
    return savedChats ? JSON.parse(savedChats) : [{ id: 1, title: 'Chat 1', messages: [] }];
  });
  const [activeChat, setActiveChat] = useState<number>(() => {
    const savedActiveChat = localStorage.getItem('activeChat');
    return savedActiveChat ? parseInt(savedActiveChat) : 1;
  });

  // Salvar chats no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  // Salvar chat ativo no localStorage
  useEffect(() => {
    localStorage.setItem('activeChat', activeChat.toString());
  }, [activeChat]);

  const handleSendMessage = async () => {
    if (message.length < MIN_MESSAGE_LENGTH) {
      setChats(prevChats => {
        return prevChats.map(chat => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [...chat.messages, { 
                id: Date.now(), 
                text: 'Por favor, digite uma mensagem mais longa.', 
                isUser: false 
              }]
            };
          }
          return chat;
        });
      });
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      setChats(prevChats => {
        return prevChats.map(chat => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [...chat.messages, { 
                id: Date.now(), 
                text: `Por favor, limite sua mensagem a ${MAX_MESSAGE_LENGTH} caracteres.`, 
                isUser: false 
              }]
            };
          }
          return chat;
        });
      });
      return;
    }

    const userMessage = { id: Date.now(), text: message, isUser: true };
    
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [...chat.messages, userMessage]
          };
        }
        return chat;
      });
    });
    
    setMessage('');

    try {
      const aiResponse = await aiService.sendMessage(message);
      
      setChats(prevChats => {
        return prevChats.map(chat => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [...chat.messages, { id: Date.now(), text: aiResponse, isUser: false }]
            };
          }
          return chat;
        });
      });
    } catch (error) {
      console.error('Erro:', error);
      // Adiciona mensagem de erro ao chat
      setChats(prevChats => {
        return prevChats.map(chat => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [...chat.messages, { 
                id: Date.now(), 
                text: 'Desculpe, ocorreu um erro ao processar sua mensagem.', 
                isUser: false 
              }]
            };
          }
          return chat;
        });
      });
    }
  };

  const handleNewChat = () => {
    const getNextChatNumber = () => {
      const numbers = chats.map(chat => {
        const match = chat.title.match(/Chat (\d+)/);
        return match ? parseInt(match[1]) : 0;
      });
      return Math.max(...numbers, 0) + 1;
    };
  
    const newChat: Chat = {
      id: Date.now(),
      title: `Chat ${getNextChatNumber()}`,
      messages: []
    };
    setChats(prev => [...prev, newChat]);
    setActiveChat(newChat.id);
  };

  const currentChat = chats.find(chat => chat.id === activeChat);

  const handleDeleteChat = (chatId: number) => {
    setChats(prev => {
      const newChats = prev.filter(chat => chat.id !== chatId);
      if (chatId === activeChat && newChats.length > 0) {
        setActiveChat(newChats[0].id);
      }
      return newChats;
    });
  };

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
              secondaryAction={
                chats.length > 1 && (
                  <IconButton 
                    edge="end" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    sx={{ 
                      color: '#fff',
                      '&:hover': {
                        color: '#FF6B00'
                      }
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                )
              }
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
            inputProps={{ maxLength: MAX_MESSAGE_LENGTH }}
            helperText={`${message.length}/${MAX_MESSAGE_LENGTH}`}
            FormHelperTextProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: '#FF6B00' },
                '&.Mui-focused fieldset': { borderColor: '#FF6B00' },
              },
              '& .MuiInputAdornment-root': {
                position: 'absolute',
                right: '8px',
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={handleSendMessage}
                  sx={{
                    backgroundColor: '#FF6B00',
                    color: '#fff',
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { backgroundColor: '#cc5500' },
                  }}
                >
                  <SendIcon sx={{ fontSize: '20px' }} />
                </IconButton>
              ),
            }}
          />
        </InputContainer>
      </ChatContainer>
    </StyledContainer>
  );
};

export default Chat;