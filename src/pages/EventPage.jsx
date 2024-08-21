import { useLoaderData, useNavigate, useParams }  from 'react-router-dom';
import { Tag }                                    from '../components/Tag';
import { Button }                                 from '../components/Button';
import { EventForm }                              from '../components/EventForm';
import { Flex, 
         Heading, 
         Text, 
         Box, 
         Image, 
         Grid, 
         GridItem, 
         Modal, 
         ModalOverlay, 
         ModalContent, 
         ModalCloseButton, 
         useDisclosure }                          from '@chakra-ui/react';
import { CalendarIcon, TimeIcon }                 from '@chakra-ui/icons';



export const loader = async ( { params } ) =>
  {
    try
    {
      const event =      await fetch(`http://localhost:3000/events/${params.eventId}`);

      if (!event.ok)
      {
        throw new Error('Something went wrong while trying to fetch the Event')
      }

      const users =      await fetch("http://localhost:3000/users");

      if (!users.ok)
      {
        throw new Error('Something went wrong while trying to fetch the Users')
      }

      const categories = await fetch("http://localhost:3000/categories");

      if (!categories.ok)
      {
        throw new Error('Something went wrong while trying to fetch the Categories')
      }
  
      return { 
        event: await event.json(), 
        users: await users.json(), 
        categories: await categories.json() };
    }
    catch (error)
    {
      console.error(error);
      return { error: error.message };
    }
  }


export const EventPage = (  ) => 
{
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { event, users, categories } = useLoaderData();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const dateStart  = event.startTime.split("T")[0];
  const dateEnd  = event.endTime.split("T")[0];
  const timeStart = event.startTime.split("T")[1].slice(0, 5);
  const timeEnd   = event.endTime.split("T")[1].slice(0, 5);


  const deleteEvent = async eventId => {
    if (confirm("Are you sure you want to delete this event?")) 
    {
      const eventResponse = await fetch(`http://localhost:3000/events/${eventId}`, { method: 'DELETE' });

      if (eventResponse.ok) 
      {
        alert("The Event was successfully deleted!");
        navigate(`/`);
      } 
      else 
      {
        alert("There was an error while deleting your Event");
      }
    }}


  return (
  <Flex 
    direction="column" 
    width="100%" 
    minHeight="100vh" 
    padding="40px" 
    bgGradient="linear(blue.100, white, blue.100)" 
    justify="flex-start" 
    align="center">

      <Flex direction="column" width="100%" align="center">

        <Flex position="absolute" top="40px" left="30px">
          <Button  link="/" label="BACK" /> 
        </Flex>

        <Heading color="rgb(000, 020, 040)">{event.title}</Heading>

        <Grid 
          width="100%" 
          mt="20px" 
          overflow="hidden" 
          bg="rgb(200, 230, 240)" 
          border="2px solid rgb(000, 130, 180)" 
          borderRadius="lg" 
          boxShadow="lg" 
          templateAreas=
          {{ base:
          ` "description"
            "image"
            "buttons"
          `,
          md:
          ` "description image"
            "buttons image"
          `}}
          gridTemplateRows={{base: "auto 1fr auto", md: "1fr 1fr"}}
          gridTemplateColumns={{base: "1fr", md: "1fr 1fr"}}
        >
            <GridItem area={"description"}>
              <Flex 
                textAlign="center" 
                p="20px" 
                width="100%" 
                height="100%" 
                direction="column" 
                justify="space-around" 
                align="center" 
                gap="20px"
              >

                <Heading size={{base: "md", md: "lg"}} color="rgb(000, 080, 100)">{event.description}</Heading>

                {dateStart == dateEnd ?  
                (
                  <Flex direction="column">
                    <Text color="rgb(000, 080, 100)"><CalendarIcon color="rgb(000, 080, 100)"/> {dateStart}</Text>
                    <Text color="rgb(000, 080, 100)"><TimeIcon color="rgb(000, 080, 100)"/> {timeStart} - {timeEnd}</Text>
                  </Flex>
                ) : (
                  <Flex direction="column" align="center" color="rgb(000, 080, 100)">
                    <Text>FROM</Text>
                    <Text color="rgb(000, 080, 100)"> {dateStart} ~ {timeStart}</Text>
                    <Text>TO</Text>
                    <Text color="rgb(000, 080, 100)"> {dateEnd} ~ {timeEnd}</Text>
                  </Flex>
                )}

                <Flex direction="row" justify="center" gap="20px" >
                  { event.categoryIds.map((entry) => 
                  ( 
                      <Tag 
                        key={entry} 
                        label={categories.find((category) => category.id === entry).name.toUpperCase()}  
                      />
                  ))}
                </Flex>
              </Flex>
            </GridItem>

            <GridItem area={"image"}>
              <Flex 
                width="100%" 
                height="100%" 
                justify="center" 
                align="center"
              >
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  m="10px"
                  width="100%"  
                  borderRadius="lg" 
                  border="2px solid rgb(000, 130, 180)"
                  boxShadow="lg"
                />
              </Flex>
            </GridItem>

            <GridItem area={"buttons"}>
              <Flex 
                textAlign="center" 
                p="20px" 
                width="100%" 
                height="100%" 
                direction="column" 
                justify="space-around" 
                align="center" 
                gap="20px"
              >
                <Flex 
                  direction="row" 
                  minWidth="150px" 
                  justify="space-between" 
                  align="center" 
                  bg="rgb(160, 220, 250)" 
                  color="rgb(000, 080, 100)"
                  borderRadius="50px"
                  border="2px solid rgb(000, 130, 180)" 
                  boxShadow="md"
                >
                  <Box 
                    m="5px" 
                    overflow="hidden"  
                    borderRadius="100%" 
                    border="2px solid rgb(252, 252, 230)"
                  >
                    <Image 
                      src={users.find((user) => user.id === event.createdBy).image} 
                      alt="User Portrait" 
                      width="40px" 
                      height="40px"
                    />
                  </Box>
                  <Text m="0px 15px">{users.find((user) => user.id === event.createdBy).name} </Text>
                </Flex>
                
                <Flex direction="row" justify="center" gap="20px" >

                  <Flex 
                    m="10px 0px 20px 0px" 
                    p="5px 10px" 
                    justify="center" 
                    align="center" 
                    color="rgb(000, 020, 040)" 
                    borderRadius="lg" 
                    border="2px solid rgb(000, 130, 180)"
                    boxShadow='lg'
                    _hover={{border: "2px solid rgb(000, 020, 040)", bg: "rgb(160, 220, 250)" }}
                  >
                    <Text cursor="pointer" onClick={onOpen} > UPDATE EVENT </Text>
                  </Flex>

                  <Flex 
                    m="10px 0px 20px 0px" 
                    p="5px 10px" 
                    justify="center" 
                    align="center" 
                    color="rgb(000, 020, 040)" 
                    borderRadius="lg" 
                    border="2px solid rgb(000, 130, 180)"
                    boxShadow='lg'
                    _hover={{border: "2px solid rgb(000, 020, 040)", bg: "rgb(160, 220, 250)" }}
                  >
                    <Text cursor="pointer" onClick={() => deleteEvent(eventId)} > DELETE EVENT </Text>
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>
          </Grid>
      </Flex>

      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <EventForm callerID="2"/>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
