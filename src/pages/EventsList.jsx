import React, { useState }      from 'react';
import { useLoaderData, Link }  from 'react-router-dom';
import { TextInput }            from '../components/TextInput';
import { RadioButtons }         from '../components/RadioButtons';
import { EventBadge }           from '../components/EventBadge';
import { Flex, Heading }        from '@chakra-ui/react';
import { SearchIcon }           from '@chakra-ui/icons';


export const loader = async () =>
{
  const events =      await fetch("http://localhost:3000/events");
  const categories =  await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
}


export const EventsList = () => 
{
  const { events, categories }                    = useLoaderData();
  const [ searchField, setSearchField ]           = useState("");
  const [ selectedCategory, setSelectedCategory ] = useState("0");
  
  let filteredByCategory = events;

  if (selectedCategory !== "0")
  {
    filteredByCategory = filteredByCategory.filter( (event) =>
    {
      return event.categoryIds.includes(Number(selectedCategory));
    });
  }

  const matchedEvents = filteredByCategory.filter( (event) =>
  {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <Flex 
      width="100%" 
      minHeight="100vh" 
      pb="40px" 
      justify="center" 
      bg="rgb(84, 144, 247)"
    >

      <Flex 
        direction="column" 
        width="90%" 
        mt="20px" 
        align="center" 
      >

        <Heading color="rgb(252, 252, 230)">All our Events</Heading>
        
        <TextInput 
          width="80%" 
          placeholder="Filter Events" 
          onChange={(event) => {setSearchField(event.target.value)}} 
          addon={<SearchIcon color="rgb(0, 52, 140)" />} 
        />
        
        <RadioButtons selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

        <Flex 
          m="10px 0px 20px 0px" 
          p="5px 10px" 
          justify="center" 
          align="center" 
          bg="rgb(50, 125, 252)" 
          color="rgb(252, 252, 230)" 
          borderRadius="lg" 
          border="2px solid rgb(0, 52, 140)"
        >
          <Link to={`/event/new`}>ADD EVENT</Link>
        </Flex>

        <Flex 
          w="100%" 
          mb="40px" 
          flexWrap="wrap" 
          gap={10} 
          justify="center" 
          alignItems="center"
        >
          { matchedEvents.map( (event) => 
              ( 
                <EventBadge 
                  key={event.id} 
                  event={event} 
                  categories={categories}
                /> 
              )
          )} 
        </Flex>

      </Flex>

    </Flex>
  )
};
