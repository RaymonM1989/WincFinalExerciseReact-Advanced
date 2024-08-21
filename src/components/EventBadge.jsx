import { Link }                     from 'react-router-dom';
import { Tag }                      from './Tag';
import { Flex, 
         Image, 
         Text, 
         Heading }                  from '@chakra-ui/react';
import { CalendarIcon, TimeIcon }   from '@chakra-ui/icons';


export const EventBadge = ( {event, categories} ) =>
{
    const date  = event.startTime.split("T")[0];
    const start = event.startTime.split("T")[1].slice(0, 5);
    const end   = event.endTime.split("T")[1].slice(0, 5);

    return (
        <Flex 
            role="group"
            w="300px" 
            bg="rgb(200, 230, 240)" 
            border="2px solid rgb(000, 130, 180)" 
            borderRadius="lg" 
            overflow="hidden" 
            direction="column" 
            align="center" 
            textAlign="center"
            boxShadow="lg" 
            _hover=
            {{ 
                borderColor: "rgb(000, 020, 040)", 
                boxShadow: "xl",
            }}
        >

            <Link to={`/event/${event.id}`}>

                <Heading 
                    fontSize="1.3em" 
                    color="rgb(000, 020, 040)" 
                    textShadow="0.5px 0.5px rgb(114, 163, 247)"
                    p="5px 0px 10px 0px"
                    _groupHover={{bg: "rgb(160, 220, 250)"}}
                >
                    {event.title}
                </Heading>

                <Image 
                    src={ event.image } 
                    alt={ event.title } 
                    minW="100%" 
                    h="250px"
                    objectFit="cover"
                    boxShadow='md' 
                />

                <Text fontSize="1.2em" color="rgb(000, 020, 040)" m="5px 0px">
                    { event.description }
                </Text>

                <Flex direction="row" justify="space-around" width="300px">
                    <Text color="rgb(000, 080, 100)"><CalendarIcon color="rgb(000, 080, 100)"/> {date}</Text>
                    <Text color="rgb(000, 080, 100)"><TimeIcon color="rgb(000, 080, 100)"/> {start} - {end}</Text>
                </Flex>

                <Flex 
                    direction="row" 
                    justify="center" 
                    width="300px" 
                    gap={1}
                >
                    { event.categoryIds.map((entry) => 
                    ( 
                        <Tag key={entry} label={categories.find(category => category.id === entry).name.toUpperCase()} />
                    ))}
                </Flex>

            </Link>

        </Flex>
    );
};