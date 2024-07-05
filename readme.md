**Simplified Hotel Booking Chatbot Assignment**

**Objective:**
Develop a RESTful API using Express.js that implements a chatbot capable of handling hotel booking queries. The chatbot will use OpenAI's API for natural language processing and maintain conversation history.

**Technical Requirements:**
1. Use `Express.js` as the framework for building the API.
2. Integrate OpenAI's API for natural language processing.
4. Implement conversation history storage using `sqlite` and `sequelize`
5. Implement `function calling` to get rooms data & simulate booking a room.

**Main Endpoint:**
- `POST /chat` - Handle user messages and return chatbot responses

**Chatbot Flow:**
1. User initiates a conversation about booking a resort room.
2. Bot fetches room options from an API and responds with a list of room options
3. User selects a room.
4. Bot provides pricing information.
5. User confirms they want to proceed with booking.
6. Bot makes a simulated API call to book the room and returns a booking confirmation with a booking ID.

**Skills to Test:**
1. Creating a RESTful API with Express.js
2. Integrating and using OpenAI's API for natural language processing
3. Maintaining conversation history throughout the chat session. 
4. Implementing function calling to simulate external API interactions (room booking)

**Bonus:**
- Implement basic error handling for invalid user inputs or API failures
- Add a simple frontend interface for interacting with the chatbot (e.g., using HTML, CSS, and JavaScript or react)

**Submission:**
Provide the source code for your application, a README with setup instructions (including how to set up the OpenAI API key), and example API requests and responses for testing the chatbot.

** API ** 


# Hotel Room Booking API Curl Commands

## 1. List Hotel Room Options

To get the list of available rooms at Bot9 Palace:

```bash
curl -X GET https://bot9assignement.deno.dev/rooms
```

## 2. Create a Booking

To create a new booking:

```bash
curl -X POST https://bot9assignement.deno.dev/book \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": 2,
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "nights": 3
  }'
```
