import React, { useState } from "react";
import "../css/cardDetails.css";
import { Input, FormLabel, FormControl, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router";

// Book Card Details component
const CardDetails = ({ type, name, author, genre, url, onFormSubmit }) => {
  // State variables to store the book details
  const [selectbookname, setSelectBookname] = useState(name);
  const [selectauthorname, setSelectAuthorname] = useState(author);
  const [selectgenre, setSelectGenre] = useState(genre);
  const [selecturl, setSelectUrl] = useState(url);

  // `useNavigate` hook for programmatic navigation
  const navigate = useNavigate();

  // Handler function for the submit button
  const submitButton = (e) => {
    e.preventDefault();

    // Create an object to store the updated book details
    const data = {
      name: selectbookname,
      author: selectauthorname,
      genre: selectgenre,
      url: selecturl
    };

    // Call the `onFormSubmit` prop to pass the updated book details
    onFormSubmit(data);
  };

  return (
    <div className="container">
      <form>
        <FormControl isRequired className="form-group">
          <FormLabel>Book Name:</FormLabel>
          <Input
            type="text"
            id="bookname"
            value={selectbookname}
            onChange={(event) => setSelectBookname(event.target.value)}
          />
        </FormControl>
        <FormControl isRequired className="form-group">
          <FormLabel>Author name:</FormLabel>
          <Input
            type="text"
            id="authorname"
            value={selectauthorname}
            onChange={(event) => setSelectAuthorname(event.target.value)}
          />
        </FormControl>
        <FormControl isRequired className="form-group">
          <FormLabel>Genre:</FormLabel>
          <Input
            type="text"
            id="genre"
            value={selectgenre}
            onChange={(event) => setSelectGenre(event.target.value)}
          />
        </FormControl>
        <FormControl isRequired className="form-group">
          <FormLabel>URL:</FormLabel>
          <Input
            type="text"
            id="url"
            value={selecturl}
            onChange={(event) => setSelectUrl(event.target.value)}
          />
        </FormControl>
        <Button colorScheme="green" mr="1"
          // Disable the submit button if any of the book details are missing
          isDisabled={!(selectbookname !== "" && selectauthorname !== "" && selectgenre !== "" && selecturl !== "")}
          onClick={submitButton}
          type="submit"
        >
          {type}
        </Button>
        <Button colorScheme="green" onClick={() => {navigate("/dashboard")} }>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default CardDetails;
