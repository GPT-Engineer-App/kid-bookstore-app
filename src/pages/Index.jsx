import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, Box, HStack, Image, IconButton, Badge } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash, FaCreditCard } from "react-icons/fa";

const books = [
  { id: 1, title: "Book One", price: 10, description: "A great book for kids.", image: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxraWRzJTIwYm9vayUyMG9uZXxlbnwwfHx8fDE3MTc3NTQyMTJ8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, title: "Book Two", price: 15, description: "Another great book for kids.", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxraWRzJTIwYm9vayUyMHR3b3xlbnwwfHx8fDE3MTc3NTQyMTN8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, title: "Book Three", price: 20, description: "Yet another great book for kids.", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxraWRzJTIwYm9vayUyMHRocmVlfGVufDB8fHx8MTcxNzc1NDIxM3ww&ixlib=rb-4.0.3&q=80&w=1080" },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState([]);

  const handleLogin = () => {
    if (username === "user" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter((book) => book.id !== bookId));
  };

  const totalAmount = cart.reduce((total, book) => total + book.price, 0);

  if (!isLoggedIn) {
    return (
      <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Login</Text>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={4}>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="2xl">Book Store</Text>
        <IconButton aria-label="Cart" icon={<FaShoppingCart />} size="lg" onClick={() => alert("Cart clicked")} />
      </HStack>
      <VStack spacing={4} align="stretch">
        {books.map((book) => (
          <Box key={book.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <HStack>
              <Image boxSize="100px" src={book.image} alt={book.title} />
              <VStack align="start">
                <Text fontSize="xl">{book.title}</Text>
                <Text>{book.description}</Text>
                <Badge colorScheme="green">${book.price}</Badge>
                <Button onClick={() => addToCart(book)}>Add to Cart</Button>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
      <Box mt={8}>
        <Text fontSize="2xl">Shopping Cart</Text>
        {cart.length === 0 ? (
          <Text>No items in cart</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {cart.map((book) => (
              <HStack key={book.id} justifyContent="space-between">
                <Text>{book.title}</Text>
                <HStack>
                  <Badge colorScheme="green">${book.price}</Badge>
                  <IconButton aria-label="Remove" icon={<FaTrash />} onClick={() => removeFromCart(book.id)} />
                </HStack>
              </HStack>
            ))}
            <Text fontSize="xl">Total: ${totalAmount}</Text>
            <Button leftIcon={<FaCreditCard />} colorScheme="teal" onClick={() => alert("Payment successful!")}>
              Pay Now
            </Button>
          </VStack>
        )}
      </Box>
    </Container>
  );
};

export default Index;
