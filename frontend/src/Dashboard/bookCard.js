import React from "react";
import { Button, Card, CardBody, CardFooter, Image, Stack, Heading, Text } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router";

// Card component for displaying a single book's information 
function BookCard({name, author, genre, url, id, onDeleteFunction}) {
  // Function to navigate to the edit page for the book
  const onEdit = () => {
    navigate(`/editcard/${id}`);
  };

  // Function to delete the book
  const onDelete = async () => {
    try {
      // Get the JWT token from local storage
      const jwtToken = localStorage.getItem("authtoken");

      // Make a DELETE request to the API to delete the book
      const response = await axios.delete(`http://localhost:8000/book/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // Call the onDeleteFunction prop to update the parent component
      onDeleteFunction(response.data);
    } catch (error) {
      // Show an error message if the delete request fails
      alert(error.message);
    }
  };

  // Hook to navigate between pages
  const navigate = useNavigate();

  return (
    <div>
      <Card margin="2" direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
        <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={url} alt='Book Cover' />
        <Stack>
          <CardBody>
            <Heading fontWeight="semibold" margin="2" size='lg'>{name}</Heading>
            <Heading fontStyle="italic" margin="3" size='md'>{author}</Heading>
            <Text fontWeight="medium" color="HighlightText" margin="4" py='2'>{genre}</Text>
          </CardBody>
          <CardFooter>
            <Button mr="1" onClick={onEdit} variant='solid' colorScheme='blue'>Edit</Button>
            <Button onClick={onDelete} variant='solid' colorScheme='blue'>Delete</Button>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

export default BookCard;
