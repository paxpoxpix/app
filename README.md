
# Narrativai - AI-Powered Conversational Web Application

Narrativai is a web application that enables users to have interactive conversations with AI-powered characters. Users can choose from a variety of characters and engage in real-time conversations. The AI responses are generated using OpenAI's language model, accessed through a custom endpoint.

## Technologies Used
- Backend: Express.js (TypeScript)
- Frontend: React (TypeScript)
- Database: SQLite (sqlite3 library)
- Real-time communication: Socket.IO
- AI integration: OpenAI (Custom endpoint: "https://api.deepinfra.com/v1/openai")

## Routes
- `/api/auth/register` (POST): User registration
- `/api/auth/login` (POST): User login
- `/api/characters` (GET): Retrieve available characters
- `/api/conversations` (POST): Start a new conversation
- `/api/conversations/:conversationId` (GET): Retrieve conversation history
- `/api/conversations/:conversationId/messages` (POST): Send a message to the AI character

## Database
The application uses SQLite database to store user information, character details, and conversation history. The following tables are created:
- `users`: Stores user information (id, username, password)
- `characters`: Stores character details (id, name, description)
- `conversations`: Stores conversation history (id, userId, characterId, timestamp)
- `messages`: Stores individual messages within a conversation (id, conversationId, sender, content, timestamp)

## Socket.IO
Socket.IO is used for real-time communication between the server and the frontend. It enables instant message exchange during conversations with AI characters.

## Running the Application
To run the application, use the following command:
```
bun server/run.ts
```
This will start the server on port 8001. Open http://localhost:8001 in your browser to access the application.

