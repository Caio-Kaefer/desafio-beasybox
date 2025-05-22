import { Container, Typography, Paper, Box } from '@mui/material';
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

const FeaturesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid rgba(255,107,0,0.3)',
  borderRadius: theme.spacing(1),
  height: '100%',
  transition: 'transform 0.3s ease',
  flex: '1 1 calc(33.333% - 16px)',
  minWidth: '280px',
  '&:hover': {
    transform: 'translateY(-5px)',
    border: '1px solid #FF6B00',
  },
}));

const Produto = () => {
  return (
    <StyledContainer maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom align="center">
          Recursos do Taurus Chat
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Conheça as principais funcionalidades do nosso chatbot inteligente
        </Typography>
        
        <FeaturesContainer>
          <FeatureBox>
            <Typography variant="h6" gutterBottom color="#FF6B00">
              Respostas Inteligentes
            </Typography>
            <Typography variant="body2">
              Nosso chatbot utiliza IA avançada para fornecer respostas precisas e contextualizadas, 
              compreendendo naturalmente suas perguntas e oferecendo soluções relevantes.
            </Typography>
          </FeatureBox>

          <FeatureBox>
            <Typography variant="h6" gutterBottom color="#FF6B00">
              Conversas Contínuas
            </Typography>
            <Typography variant="body2">
              Mantém o contexto da conversa, permitindo diálogos naturais e fluidos. 
              O chatbot lembra detalhes anteriores para oferecer respostas mais precisas.
            </Typography>
          </FeatureBox>

          <FeatureBox>
            <Typography variant="h6" gutterBottom color="#FF6B00">
              Disponibilidade 24/7
            </Typography>
            <Typography variant="body2">
              Atendimento instantâneo a qualquer momento, sem tempo de espera. 
              Sempre pronto para ajudar com suas dúvidas e necessidades.
            </Typography>
          </FeatureBox>

          <FeatureBox>
            <Typography variant="h6" gutterBottom color="#FF6B00">
              Interface Amigável
            </Typography>
            <Typography variant="body2">
              Design intuitivo e responsivo que torna a interação simples e agradável, 
              adaptando-se perfeitamente a qualquer dispositivo.
            </Typography>
          </FeatureBox>

          <FeatureBox>
            <Typography variant="h6" gutterBottom color="#FF6B00">
              Processamento de Linguagem
            </Typography>
            <Typography variant="body2">
              Entende diferentes formas de expressão e gírias, tornando a comunicação 
              mais natural e próxima da conversa humana.
            </Typography>
          </FeatureBox>

          <FeatureBox>
            <Typography variant="h6" gutterBottom color="#FF6B00">
              Histórico de Conversas
            </Typography>
            <Typography variant="body2">
              Acesso fácil ao histórico completo de conversas, permitindo 
              consultar informações anteriores quando necessário.
            </Typography>
          </FeatureBox>
        </FeaturesContainer>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Produto;