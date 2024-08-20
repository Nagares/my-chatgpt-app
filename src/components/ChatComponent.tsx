import React, { useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";

const ChatComponent = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setLoading(true);
    const userMessage = input;
    setMessages([...messages, `You: ${userMessage}`]);

    try {
      const response = await fetch("http://localhost:3002/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "Your initial prompt",
          transcription: userMessage,
          systemPrompt: "Your system prompt",
        }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        `ChatGPT: ${data.response}`,
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        "ChatGPT: Error occurred",
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <ChakraProvider>
      <Box
        maxW="1200px"
        p={4}
        m="auto"
        bg="gray.100"
        borderRadius="lg"
        boxShadow="lg"
        color={"gray.800"}
      >
        <VStack spacing={4}>
          <Box
            w="100%"
            h="400px"
            bg="white"
            borderRadius="lg"
            p={4}
            overflowY="auto"
          >
            {messages.map((message, index) => (
              <Text key={index}>{message}</Text>
            ))}
          </Box>
          <Input
            bg="white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message..."
            isDisabled={loading}
          />
          <Button
            onClick={handleSendMessage}
            colorScheme="blue"
            isLoading={loading}
          >
            Send
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default ChatComponent;
