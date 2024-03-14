
import { app, server, io } from './run_express';
import { initializeDatabase, seedDatabase } from './db';
import { registerUser, loginUser } from './auth';
import { getCharacters } from './characters';
import { startConversation, getConversationHistory, sendMessage } from './conversations';

initializeDatabase()
  .then(async (db) => {
    await seedDatabase(db);

    app.post('/api/auth/register', (req, res) => registerUser(db, req, res));
    app.post('/api/auth/login', (req, res) => loginUser(db, req, res));
    app.get('/api/characters', (req, res) => getCharacters(db, req, res));
    app.post('/api/conversations', (req, res) => startConversation(db, req, res));
    app.get('/api/conversations/:conversationId', (req, res) => getConversationHistory(db, req, res));
    app.post('/api/conversations/:conversationId/messages', (req, res) => sendMessage(db, req, res));

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
    process.exit(1);
  });

