import { Link }                   from 'react-router-dom';
import { Tag }                    from './Tag';
import { Flex, 
         Image, 
         Text, 
         Heading 
        }                         from '@chakra-ui/react';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';


export const EventBadge = ( {event, categories} ) =>
{
    const date  = event.startTime.split("T")[0];
    const start = event.startTime.split("T")[1].slice(0, 5);
    const end   = event.endTime.split("T")[1].slice(0, 5);

    return (
        <Flex 
            w="300px" 
            bg="rgb(252, 252, 230)" 
            borderWidth="2px" 
            borderColor="rgb(50, 125, 252)" 
            borderRadius="lg" 
            overflow="hidden" 
            direction="column" 
            align="center" 
            textAlign="center"
            boxShadow="lg" 
            _hover=
            {{ 
                borderColor: "rgb(0, 52, 140)", 
                boxShadow: "xl",
            }}
        >

            <Link to={`/event/${event.id}`}>

                <Heading 
                    fontSize="1.3em" 
                    color="rgb(252, 252, 230)" 
                    bg="rgb(0, 52, 140)"
                    textShadow="0.5px 0.5px rgb(114, 163, 247)"
                    p="5px 0px 10px 0px"
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

                <Text fontSize="1.2em" color="rgb(0, 52, 140)">
                    { event.description }
                </Text>

                <Flex direction="row" justify="space-around">
                    <Text color="rgb(50, 125, 252)"><CalendarIcon color="rgb(50, 125, 252)"/> {date}</Text>
                    <Text color="rgb(50, 125, 252)"><TimeIcon color="rgb(50, 125, 252)"/> {start} - {end}</Text>
                </Flex>

                <Flex direction="row" justify="center" gap ={4}>
                    { event.categoryIds.map((entry) => 
                    ( 
                        <Tag key={entry} label={categories.find(category => category.id === entry).name.toUpperCase()} bgcolor="rgb(158, 211, 255)" color="rgb(50, 125, 252)" />
                    ))}
                </Flex>

            </Link>
        </Flex>
    )
}