import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#4A4A4A',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  height: '30px',
  minHeight: '30px',
  padding: '0 16px',
  backgroundColor: 'transparent',
  fontSize: '0.75rem',
  textTransform: 'none',
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(255,107,0,0.2)',
  },
  '&.active': {
    backgroundColor: 'rgba(255,107,0,0.3)',
  },
}));

const Header = () => {
  const navigate = useNavigate();

  const menuItems = [{ label: 'Chat', path: '/chat' }, { label: 'Sobre Nós', path: '/sobre' }, { label: 'SAC', path: '/sac' }, { label: 'Produto', path: '/produto' }];

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ 
        gap: 1, 
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {menuItems.map((item) => (
            <StyledButton 
              key={item.path}
              color="inherit" 
              onClick={() => navigate(item.path)}
              className={window.location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </StyledButton>
          ))}
        </Box>
        <Box 
          sx={{ 
            cursor: 'pointer',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }} 
          onClick={() => navigate('/')}
        >
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 500,
              fontSize: '1.25rem',
            }} 
          >
            <Box component="span" sx={{ color: '#FF6B00' }}>TAURUS</Box> Chat
          </Typography>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;