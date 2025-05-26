import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseButton = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#4A4A4A',
  margin: 0,
  padding: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  animation: `${fadeIn} 0.8s ease-out`,
  '&:hover': {
    transform: 'translateY(-5px)',
    transition: 'transform 0.3s ease',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    width: '100%',
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    animation: `${pulseButton} 1s infinite`,
  },
}));

const Home = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth={false} disableGutters>
      <StyledPaper elevation={3}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#4A4A4A',
            fontWeight: 600,
            mb: 3,
          }}
        >
          Bem-vindo ao Taurus Chat
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4, 
            color: '#666666',
            fontSize: '1.1rem',
          }}
        >
          Seu assistente inteligente para todas as suas necessidades.
        </Typography>
        <AnimatedButton 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/chat')}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(255,107,0,0.3)',
          }}
        >
          Começar a Conversar
        </AnimatedButton>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Home;