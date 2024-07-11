const express = require("express");
const router = express.Router();
const ConversationHistory = require("../database/models/chatHistory.js");
// Set up OpenAI API
const key = process.env.API_KEY;
const { OpenAI } = require("openai");
const { default: axios } = require("axios");
const openai = new OpenAI({
  apiKey: key,
});

//function to get room info
const getRooms = async () => {
  try {
    const { data } = await axios.get("https://bot9assignement.deno.dev/rooms");
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

//function to give price information
const givePrice = async (roomObj) => {
  try {
    const roomName = roomObj.roomName;
    const { data } = await axios.get("https://bot9assignement.deno.dev/rooms");
    const selectedRoom = data.find(
      (room) => room.name.toLowerCase() === roomName.toLowerCase(),
    );
    const toReturn = {
      description: selectedRoom.description,
      price: selectedRoom.price,
    };

    console.log(toReturn);
    return toReturn;
  } catch (err) {
    console.log(err.message);
  }
};

//function to simulate booking
const bookRoom = async (bookingParams) => {
  try {
    const { fullName, email, nights, roomName } = bookingParams;
    const { data } = await axios.get("https://bot9assignement.deno.dev/rooms");
    const selectedRoom = data.find(
      (room) => room.name.toLowerCase === roomName.toLowerCase,
    );
    const bookingObj = {
      roomId: selectedRoom.id,
      fullName: fullName,
      email: email,
      nights: nights,
    };
    console.log(bookingObj);
    const response = await axios.post(
      "https://bot9assignement.deno.dev/book",
      bookingObj,
    );
    const toReturn = await response.data;
    console.log(toReturn);
    return toReturn;
  } catch (err) {
    console.log(err.message);
  }
};

router.post("/chat", async (req, res) => {
  try {
    const { userId, query } = req.body;
    const messages = [
      {
        role: "user",
        content: query,
      },
    ];
    const tools = [
      {
        type: "function",
        function: {
          name: "get_rooms",
          description: "gives details of available rooms",
          parameters: {},
        },
      },
      {
        type: "function",
        function: {
          name: "book_room",
          description: "books a room given being told to book a room",
          parameters: {
            type: "object",
            properties: {
              roomName: {
                type: "string",
                description: "The name of the room to book",
              },
              fullName: {
                type: "string",
                description: "The full name of the person booking the room",
              },
              email: {
                type: "string",
                description: "The email of the person booking the room",
              },
              nights: {
                type: "number",
                description: "The number of nights to book the room for",
              },
            },
            required: ["roomName", "fullName", "email", "nights"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "get_room_info",
          description:
            "gets information about a particular room given its name",
          parameters: {
            type: "object",
            properties: {
              roomName: {
                type: "string",
                description: "The name of the room to get information about",
              },
            },
            required: ["roomName"],
          },
        },
      },
    ];
    //get response for the query given by the user
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      tools: tools,
      tool_choice: "auto",
    });
    const responseMessage = response.choices[0].message;
    const toolCalls = responseMessage.tool_calls;
    console.log(toolCalls);
    //if there is need to execute a function run this if block
    if (toolCalls) {
      const availableFunctions = {
        get_rooms: getRooms,
        book_room: bookRoom,
        get_room_info: givePrice,
      };
      messages.push(respogseMessage);
      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const functionResponse = await functionToCall(functionArgs); // Call the function without arguments

        messages.push({
          tool_call_id: toolCall.id,
          role: "tool",
          name: functionName,
          content: JSON.stringify(functionResponse),
        });
      }
      const secondResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      // Send back the content of the assistant's follow-up response
      const toSave = secondResponse.choices[0].message.content;
      console.log(toSave);
      //saving conversation history
      await ConversationHistory.create({ userId, query, response: toSave });
      res.json({ message: secondResponse.choices[0].message.content });
    } else {
      const toSave = responseMessage.content;
      await ConversationHistory.create({ userId, query, toSave });
      res.json({ message: responseMessage.content });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
