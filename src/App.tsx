import React, { useState } from "react";
import { Box, VStack, Input, Button, Text, Flex, useColorModeValue } from "@chakra-ui/react";

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    
    // Пример добавления ответа от ChatGPT (мока)
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: "Это ответ от ChatGPT." }]);
    }, 1000);
  };

  return (
    <Flex direction="column" h="100vh">
      <Box flex="1" p={4} overflowY="auto" bg={useColorModeValue("gray.100", "gray.700")}>
        <VStack spacing={4} align="start">
          {messages.map((message, index) => (
            <Box
              key={index}
              alignSelf={message.from === "user" ? "flex-end" : "flex-start"}
              bg={message.from === "user" ? "blue.500" : "green.500"}
              color="white"
              p={3}
              borderRadius="md"
              maxW="80%"
            >
              <Text>{message.text}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Flex as="footer" p={4} bg={useColorModeValue("gray.100", "gray.900")}>
        <Input
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          mr={2}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button colorScheme="blue" onClick={handleSendMessage}>
          Отправить
        </Button>
      </Flex>
    </Flex>
  );
};

export default App;
