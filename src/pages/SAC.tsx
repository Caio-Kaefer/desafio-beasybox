import { Container, Typography, Paper, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#4A4A4A',
  color: '#fff',
}));

const SAC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowSuccess(true);
    setNome('');
    setMensagem('');
  };

  return (
    <StyledContainer maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Serviço de Atendimento ao Cliente
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Seu Nome"
            variant="outlined"
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              },
              '& .MuiInputLabel-root': { color: '#fff' },
            }}
          />
          <TextField
            fullWidth
            label="Sua Mensagem"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              },
              '& .MuiInputLabel-root': { color: '#fff' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#FF6B00',
              '&:hover': { backgroundColor: '#e66000' },
            }}
          >
            Enviar Mensagem
          </Button>
        </Box>
      </StyledPaper>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Mensagem enviada com sucesso!
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default SAC;