import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, Image, Stack, Heading, Text } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router";


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
      <Heading size='lg'>{name}</Heading>
      <Heading size='md'>{author}</Heading>

      <Text py='2'>
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
