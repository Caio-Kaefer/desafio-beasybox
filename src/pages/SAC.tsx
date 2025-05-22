import { Container, Typography, Paper, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  return (
    <StyledContainer maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Serviço de Atendimento ao Cliente
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Seu Nome"
            variant="outlined"
            margin="normal"
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
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              },
              '& .MuiInputLabel-root': { color: '#fff' },
            }}
          />
          <Button
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
    </StyledContainer>
  );
};

export default SAC;