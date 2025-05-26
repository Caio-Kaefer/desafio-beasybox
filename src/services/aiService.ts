import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG } from './config';

class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chatHistory: { role: string; text: string }[] = [];

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

      // Adiciona a mensagem do usuário ao histórico
      this.chatHistory.push({ role: 'user', text: message });

      const contextualizedMessage = `Você é o assistente virtual da Taurus, especialista em soluções de IA. Mantenha suas respostas diretas e objetivas em português, sem saudações repetitivas ou despedidas. Considere o histórico da conversa a seguir:\n\n${this.chatHistory
        .map(msg => `${msg.role}: ${msg.text}`)
        .join('\n')}\n\nResponda considerando todo o contexto acima.`;

      const result = await this.model.generateContent(contextualizedMessage);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error('Resposta vazia da API');
      }

      // Adiciona a resposta da IA ao histórico
      this.chatHistory.push({ role: 'assistant', text });

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