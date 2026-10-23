import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Tutor Chat Route
app.post('/api/ai/ask-tutor', async (req, res) => {
  try {
    const { question, context, history = [] } = req.body;

    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Pergunta é obrigatória' });
      return;
    }

    if (!apiKey) {
      res.json({
        answer:
          'Olá! O Tutor IA está quase pronto. Para me ativar completamente, certifique-se de que a chave do Gemini esteja configurada no ambiente. Enquanto isso, continue praticando os exercícios com calma!',
      });
      return;
    }

    const systemInstruction = `Você é o Tutor Estudaí, um orientador escolar carinhoso, didático e motivador voltado a estudantes do ensino fundamental e médio no Brasil.
Seu estilo é:
- Acolhedor e descomplicado: explique como se estivesse ao lado do aluno com um caderno e lápis.
- Evite jargões intimidador ou fórmulas soltas sem explicação do "porquê".
- Use metáforas do dia a dia (fatias de pizza, chocolates, jogos, situações reais).
- Formate a resposta com passos claros, usando tópicos simples ou destaques em negrito.
- Finalize sempre com uma frase curta e encorajadora.
Contexto atual da matéria: ${context || 'Reforço escolar geral'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const answer = response.text || 'Não consegui formular uma resposta no momento. Pode tentar perguntar de outra forma?';
    res.json({ answer });
  } catch (error: any) {
    console.error('Erro na rota /api/ai/ask-tutor:', error);
    res.status(500).json({
      error: 'Erro ao consultar o Tutor IA',
      details: error?.message || 'Erro desconhecido',
    });
  }
});

// AI Exercise Generator Route (Adaptive according to student's progress)
app.post('/api/ai/generate-exercises', async (req, res) => {
  try {
    const {
      topic = 'Frações e equivalência',
      count = 3,
      difficulty = 'médio',
      studentAccuracy,
      studentName = 'Estudante',
      adaptiveGoal = 'prática',
    } = req.body;

    if (!apiKey) {
      res.status(503).json({ error: 'GEMINI_API_KEY não configurada' });
      return;
    }

    const accuracyNote = studentAccuracy !== undefined ? `Precisão recente do aluno neste assunto: ${studentAccuracy}%.` : '';
    const adaptiveInstruction = adaptiveGoal === 'reforço' || (studentAccuracy !== undefined && studentAccuracy < 70)
      ? 'O aluno precisa de REFORÇO: formule questões com enunciados acolhedores, problemas do dia a dia, modelos visuais e números amigáveis para recuperar a confiança.'
      : adaptiveGoal === 'desafio' || (studentAccuracy !== undefined && studentAccuracy >= 85)
      ? 'O aluno já domina os conceitos básicos: formule questões de DESAFIO estimulantes, envolvendo raciocínio crítico, contexto do cotidiano e pequenas tomadas de decisão.'
      : 'Formule questões de nível padrão equilibradas para consolidação do conteúdo.';

    const prompt = `Você é o Tutor IA do Estudaí. Crie exatamente ${count} exercícios inéditos de múltipla escolha para o estudante ${studentName} sobre o tema "${topic}" (nível: ${difficulty}).
${accuracyNote}
${adaptiveInstruction}

Cada questão deve conter:
- category: subtópico ou habilidade (ex: Identificação de Proporção, Aplicação no Cotidiano)
- prompt: enunciado claro, acolhedor e contextualizado
- options: exatamente 4 alternativas (com id "A", "B", "C", "D" e text)
- correctOptionId: letra da alternativa correta ("A", "B", "C" ou "D")
- explanation: explicação passo a passo acolhedora ensinando como chegar na resposta certa
- tutorTip: uma dica rápida memorável para guardar no coração
- bnccCode: código de referência da BNCC pertinente (ex: BNCC EF06MA07, BNCC EF07CI02, BNCC EF08HI01, etc.)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  prompt: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        text: { type: Type.STRING },
                      },
                      required: ['id', 'text'],
                    },
                  },
                  correctOptionId: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  tutorTip: { type: Type.STRING },
                  bnccCode: { type: Type.STRING },
                },
                required: ['category', 'prompt', 'options', 'correctOptionId', 'explanation', 'tutorTip', 'bnccCode'],
              },
            },
          },
          required: ['exercises'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{"exercises": []}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Erro na rota /api/ai/generate-exercises:', error);
    res.status(500).json({
      error: 'Erro ao gerar exercícios com IA',
      details: error?.message || 'Erro desconhecido',
    });
  }
});

// AI Error Diagnostic Route
app.post('/api/ai/explain-error', async (req, res) => {
  try {
    const { questionPrompt, studentAnswerText, correctAnswerText, topic } = req.body;

    if (!apiKey) {
      res.json({
        analysis: 'Errar faz parte natural do aprendizado! Ao comparar sua resposta com a correta, observe o passo em que a regra foi aplicada de forma diferente.',
        practicalTip: 'Revise o conceito dividindo o raciocínio em partes menores.',
      });
      return;
    }

    const prompt = `Um estudante estava resolvendo a seguinte questão sobre "${topic || 'o conteúdo'}":
Questão: "${questionPrompt}"
O estudante escolheu a alternativa: "${studentAnswerText}"
A alternativa correta era: "${correctAnswerText}"

Por favor, faça um diagnóstico pedagógico acolhedor:
1. Explique por que o estudante provavelmente pensou nessa resposta (qual foi o equívoco comum ou confusão conceitual).
2. Mostre o raciocínio correto de forma simples, sem julgamento, como um professor paciente.
3. Dê uma dica prática memorável.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.STRING,
              description: 'Diagnóstico acolhedor do motivo do erro e explicação correta',
            },
            practicalTip: {
              type: Type.STRING,
              description: 'Dica curta e prática para não errar mais',
            },
          },
          required: ['analysis', 'practicalTip'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Erro na rota /api/ai/explain-error:', error);
    res.status(500).json({
      error: 'Erro ao diagnosticar o erro',
      details: error?.message,
    });
  }
});

// AI Dynamic Lesson Generator Route (e.g. for Ciências, História, etc.)
app.post('/api/ai/generate-lesson', async (req, res) => {
  try {
    const { topicTitle = 'Ciências Naturais' } = req.body;

    if (!apiKey) {
      res.status(503).json({ error: 'GEMINI_API_KEY não configurada' });
      return;
    }

    const prompt = `Crie uma aula completa, didática e envolvente sobre "${topicTitle}" para a plataforma de reforço escolar Estudaí.
A aula deve conter:
- title: Título atrativo
- subtitle: Resumo de 1 frase acolhedora
- readingTime: Ex: "Leitura de 4 minutos"
- unitBadge: Ex: "Módulo Temático Estudaí"
- blocks: Lista de 3 ou 4 blocos explicativos contendo:
  - stepNumber: número do passo (1, 2, 3...)
  - title: Título do bloco
  - explanation: Explicação fluida, clara e empolgante
  - visualHint: Sugestão de elemento visual ou comparativo
  - practicalExample: objeto opcional com { question: string, answer: string, stepByStep: string }
- quickRecap: lista de 3 lembretes rápidos tipo "Lembrete do Tutor"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            readingTime: { type: Type.STRING },
            unitBadge: { type: Type.STRING },
            blocks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  visualHint: { type: Type.STRING },
                  practicalExample: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      answer: { type: Type.STRING },
                      stepByStep: { type: Type.STRING },
                    },
                    required: ['question', 'answer', 'stepByStep'],
                  },
                },
                required: ['stepNumber', 'title', 'explanation'],
              },
            },
            quickRecap: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['title', 'subtitle', 'readingTime', 'blocks', 'quickRecap'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Erro na rota /api/ai/generate-lesson:', error);
    res.status(500).json({
      error: 'Erro ao gerar aula com IA',
      details: error?.message,
    });
  }
});

// AI Adaptive Recommendation Route based on Student's Ongoing Performance
app.post('/api/ai/adaptive-recommendation', async (req, res) => {
  try {
    const { studentName = 'Lucas', subjectsSummary = {} } = req.body;

    if (!apiKey) {
      res.json({
        recommendedTopic: 'Ortografia e Pontuação',
        subjectId: 'portugues',
        reason: 'Identificamos que você está com 60% nesta matéria. Um pequeno reforço prático com novas frases vai consolidar sua segurança!',
        studyTip: 'Faça pausas respiratórias e leia as frases em voz alta para sentir onde a vírgula cabe naturalmente.',
        difficulty: 'reforço',
      });
      return;
    }

    const prompt = `Você é o Orientador Pedagógico Inteligente da plataforma Estudaí.
Analise os dados reais de progresso do aluno ${studentName}:
Desempenho por disciplina: ${JSON.stringify(subjectsSummary)}

Objetivo:
1. Recomende o próximo assunto que o aluno deve estudar para maximizar seu aprendizado e confiança.
2. Pode ser um "reforço" (se a taxa de acertos for menor que 70%), uma "prática" (se estiver em andamento) ou um "desafio" (se já tirou nota alta ou concluiu o módulo).
3. Escolha uma das 4 matérias: 'matematica', 'portugues', 'ciencias' ou 'historia'.
4. Dê uma justificativa acolhedora, afetuosa e motivadora e uma dica prática de ouro.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedTopic: { type: Type.STRING },
            subjectId: {
              type: Type.STRING,
              enum: ['matematica', 'portugues', 'ciencias', 'historia'],
            },
            reason: { type: Type.STRING },
            studyTip: { type: Type.STRING },
            difficulty: {
              type: Type.STRING,
              enum: ['reforço', 'prática', 'desafio'],
            },
          },
          required: ['recommendedTopic', 'subjectId', 'reason', 'studyTip', 'difficulty'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Erro na rota /api/ai/adaptive-recommendation:', error);
    res.status(500).json({
      error: 'Erro ao gerar recomendação adaptativa',
      details: error?.message,
    });
  }
});

// Setup Vite middleware in dev or static files in production
const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

async function startServer() {
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Estudaí Server rodando na porta ${port}`);
  });
}

startServer();
