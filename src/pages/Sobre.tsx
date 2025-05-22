import { Container, Typography, Paper } from '@mui/material';
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

const Sobre = () => {
  return (
    <StyledContainer maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Sobre Nós
        </Typography>
        <Typography variant="body1">
          Somos uma empresa dedicada a revolucionar a comunicação através da inteligência artificial.
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Sobre;