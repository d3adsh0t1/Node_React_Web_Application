import React from "react";
import { Button, Card, CardBody, CardFooter, Image, Stack, Heading, Text } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router";

// Card Edit and Delete button 
function BookCard({name,author,genre,url,id,onDeleteFunction}) {
  const onEdit = () => {
    navigate(`/editcard/${id}`);
  }
  const onDelete = async () => {
    try {
      const jwtToken = localStorage.getItem("authtoken");
      const response = await axios.delete(`http://localhost:8000/book/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      onDeleteFunction(response.data);
      // console.log(response.data);
    } catch (error) {
      alert(error.message);
    }
  }

  const navigate = useNavigate();
  return (
    <div>
      <Card
      margin="2"
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={url}
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading fontWeight="semibold" margin="2" size='lg'>{name}</Heading>
      <Heading fontStyle="italic" margin="3" size='md'>{author}</Heading>

      <Text fontWeight="medium" color="HighlightText" margin="4" py='2'>
        {genre}
      </Text>
    </CardBody>

    <CardFooter>
      <Button mr="1" onClick={onEdit} variant='solid' colorScheme='blue'>
        Edit
      </Button>
      <Button onClick={onDelete} variant='solid' colorScheme='blue'>
        Delete
      </Button>
    </CardFooter>
  </Stack>
</Card>
    </div>
  );
}

export default BookCard;
