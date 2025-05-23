export const AI_CONFIG = {
  apiKey: process.env.REACT_APP_GEMINI_API_KEY || '',
  modelName: 'gemini-2.0-flash'
};

// Verificação temporária
if (!AI_CONFIG.apiKey) {
  console.warn('Chave da API não encontrada! Verifique se o arquivo .env está configurado corretamente.');
}