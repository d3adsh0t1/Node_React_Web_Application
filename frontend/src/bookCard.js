import React from "react";
import { Button, Card, CardBody, CardFooter, Image, Stack, Heading, Text } from '@chakra-ui/react';

const onEdit = () => {

}
const onDelete = () => {

}

function BookCard({name,author,genre}) {

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
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
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
      <Button onClick={onEdit} variant='solid' colorScheme='blue'>
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
