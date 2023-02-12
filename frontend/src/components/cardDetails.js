import React, { useState } from "react";
import "../css/cardDetails.css";
import { Input, FormLabel, FormControl, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router";

// Book Card Details
const CardDetails = ({type,name,author,genre,url,onFormSubmit}) => {
  const [selectbookname, setSelectBookname] = useState(name);
  const [selectauthorname, setSelectAuthorname] = useState(author);
  const [selectgenre, setSelectGenre] = useState(genre);
  const [selecturl, setSelectUrl] = useState(url);
  const navigate = useNavigate();
    // console.log(name,author,genre,url);
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
        <Button colorScheme="green" mr="1" isDisabled={!(selectbookname!=="" && selectauthorname!=="" && selectgenre!=="" && selecturl!=="")}
          onClick={(e) => {
            const data = {
                name:selectbookname,
                author:selectauthorname,
                genre:selectgenre,
                url:selecturl
            }
            console.log("onEdit",data)
            onFormSubmit(data);
            navigate("/dashboard");
          }}
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
