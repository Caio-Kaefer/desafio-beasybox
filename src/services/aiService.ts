import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG } from './config';

class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!AI_CONFIG.apiKey) {
      throw new Error('API key não encontrada. Verifique o arquivo .env');
    }
    this.genAI = new GoogleGenerativeAI(AI_CONFIG.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: AI_CONFIG.modelName });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      if (!message.trim()) {
        throw new Error('Mensagem vazia');
      }

      const contextualizedMessage = `Como um assistente da Taurus, especialista em soluções de IA para automação e otimização de processos empresariais, responda de forma profissional e amigável em português: ${message}`;

      const result = await this.model.generateContent(contextualizedMessage);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error('Resposta vazia da API');
      }

      return text;
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      
      if (error.message?.includes('API key')) {
        throw new Error('Erro de autenticação. Verifique sua chave API.');
      }
      
      throw new Error(
        error.message || 'Não foi possível processar sua mensagem no momento.'
      );
    }
  }
}

export const aiService = new AIService();