import React, { useState }  from 'react';
import { useLoaderData }    from 'react-router-dom';
import { Button }           from '../components/Button';
import { SearchBar }        from '../components/SearchBar';
import { RadioButtons }     from '../components/RadioButtons';
import { EventBadge }       from '../components/EventBadge';
import { Flex, Heading }    from '@chakra-ui/react';
import { SearchIcon }       from '@chakra-ui/icons';


export const loader = async () =>
{
  try
  {
    const events = await fetch("http://localhost:3000/events");

    if (!events.ok)
    {
      throw new Error('Something went wrong while trying to fetch the Events')
    }

    const categories =  await fetch("http://localhost:3000/categories");

    if (!categories.ok)
    {
      throw new Error('Something went wrong while trying to fetch the Categories')
    }

    return { 
      events: await events.json(), 
      categories: await categories.json() };
  }
  catch (error)
  {
    console.log(error);
    return { error: error.message };
  }
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
      direction="column" 
      width="100%" 
      minHeight="100vh" 
      padding="40px" 
      bgGradient="linear(blue.100, white, blue.100)" 
      justify="flex-start" 
      align="center"
    >

      <Heading color="rgb(000, 020, 040)">All our Events</Heading>

      <SearchBar 
        width="100%" 
        placeholder="Filter Events" 
        onChange={(event) => {setSearchField(event.target.value)}} 
        addon={<SearchIcon color="rgb(000, 130, 180)" />} 
      />

      <RadioButtons categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

      <Button link="/event/new" label="ADD NEW EVENT" />

      <Flex 
        w="100%" 
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
  );
};
