import { useLoaderData, 
         Link, 
         useNavigate, 
         useParams 
        }                         from 'react-router-dom';
import { Tag }                    from '../components/Tag';
import { Flex, 
         Heading, 
         Text, 
         Box, 
         Image 
        }                         from '@chakra-ui/react';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';


export const loader = async ( { params } ) =>
  {
    const event =      await fetch(`http://localhost:3000/events/${params.eventId}`);
    const users =      await fetch("http://localhost:3000/users");
    const categories = await fetch("http://localhost:3000/categories");
 
    return { event: await event.json(), users: await users.json(), categories: await categories.json() };
  }


export const EventPage = (  ) => 
{
  const { event, users, categories } = useLoaderData();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const date  = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end   = event.endTime.split("T")[1].slice(0, 5);


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

        <Heading color="rgb(252, 252, 230)">{event.title}</Heading>

        <Flex 
          direction="column"
          w="100%"
          minH="80vh"
          mt="20px"
          justify="center"
          align="center"
          overflow="hidden" 
          bg="rgb(252, 252, 230)" 
          border="2px solid rgb(50, 125, 252)" 
          borderRadius="lg" 
          boxShadow="lg"
        >

          <Heading size={{base: "md", md: "lg"}} color="rgb(0, 52, 140)">{event.description}</Heading>

          <Flex 
            direction={{base: "column", md: "row"}}
            w="100%" 
            m="20px 0px" 
            justify="space-around" 
            align="center"
          >
          
            <Flex 
              direction="column" 
              w={{base: "80%", md: "40%"}} 
              minH="25vw" 
              m="20px" 
              justify="space-between" 
              align="center"
            >

              <Flex 
                direction={{base: "column", md: "row"}} 
                w="90%" 
                justify="space-around" 
                align="center"
              >
                <Text color="rgb(50, 125, 252)"><CalendarIcon color="rgb(50, 125, 252)"/> {date}</Text>
                <Text color="rgb(50, 125, 252)"><TimeIcon color="rgb(50, 125, 252)"/> {start} - {end}</Text>
              </Flex>

              <Flex 
                direction="row" 
                minWidth="150px" 
                justify="space-between" 
                align="center" 
                bg="rgb(50, 125, 252)" 
                color="rgb(252, 252, 230)"
                borderRadius="50px"
                border="2px solid rgb(0, 52, 140)" 
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
            </Flex>
      
            <Flex direction="column" w={{base: "80%", md: "40%"}}>
              <Image 
                src={event.image} 
                alt={event.title} 
                width="100%" 
                height="100%" 
                borderRadius="lg" 
                border="2px solid rgb(0, 52, 140)"
              />

              <Flex direction="row" justify="center" gap ={4}>
                  { event.categoryIds.map((entry) => 
                  ( 
                      <Tag 
                        key={entry} 
                        label={categories.find((category) => category.id === entry).name.toUpperCase()} 
                        bgcolor="rgb(158, 211, 255)" 
                        color="rgb(50, 125, 252)" 
                      />
                  ))}
              </Flex>
            </Flex>
          </Flex>
          
          <Flex direction="row" gap={6}>

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
              <Link to={`/event/${event.id}/edit`}> EDIT EVENT </Link>
            </Flex>
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
              <Text cursor="pointer" onClick={() => deleteEvent(eventId)} > DELETE EVENT </Text>
            </Flex>

          </Flex>
        </Flex>

        <Flex 
          mt="20px" 
          p="5px 10px" 
          justify="center" 
          align="center" 
          bg="rgb(50, 125, 252)" 
          color="rgb(252, 252, 230)" 
          borderRadius="lg" 
          border="2px solid rgb(0, 52, 140)"
        >
            <Link to={'/'}>BACK</Link>
        </Flex>
      </Flex>
    </Flex>
  ) 
}
