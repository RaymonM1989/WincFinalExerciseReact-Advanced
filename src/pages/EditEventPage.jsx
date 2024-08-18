import { useState, useEffect }          from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Flex, Heading, Text, Input }   from '@chakra-ui/react';


export const EditEventPage = () =>
{

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const noErrorState = { happened: false, msg: "" };
    const [error, setError] = useState(noErrorState);

    const eventId = useParams().eventId;

    const [title, setTitle]             = useState("");
    const [createdBy, setCreatedBy]     = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage]             = useState("");
    const [categoryIds, setCategoryIds] = useState("");
    const [location, setLocation]       = useState("");
    const [startTime, setStartTime]     = useState("");
    const [endTime, setEndTime]         = useState("");


    const handleSubmit = event =>
    {
        event.preventDefault();
        editEvent( { title, createdBy, description, image, categoryIds, location, startTime, endTime } );
    }

    useEffect( () =>
    {
        async function fetchEvent()
        {
            const response = await fetch(`http://localhost:3000/events/${eventId}`);
            const fetchedEvent = await response.json();
            setTitle(fetchedEvent.title);
            setCreatedBy(fetchedEvent.createdBy);
            setDescription(fetchedEvent.description);
            setImage(fetchedEvent.image);
            setCategoryIds(fetchedEvent.categoryIds);
            setLocation(fetchedEvent.location);
            setStartTime(fetchedEvent.startTime);
            setEndTime(fetchedEvent.endTime);
        }
        fetchEvent();
    }, []);    

    
    const editEvent = async ( event ) =>
    {
        let ignore = false;
        setIsLoading(true);
        setError(noErrorState);
        let response;

        try
        {
            response = await fetch(`http://localhost:3000/events/${eventId}`,
            {
                method: "PUT",
                body: JSON.stringify(event),
                headers: { "Content-Type": "application/json;charset=utf-8" },
            });
        }

        catch (error)
        {
            setError({ happened: true, msg: error.message })
            setIsLoading(false);
            return;
        }

        if (ignore) { return; }

        if (!response.ok) 
        { 
            setError({ happened: true, msg: `${response.status}: ${response.statusText}`});
            setIsLoading(false);
            return;
        }

        event.id = (await response.json()).id;

        alert("The Event was successfully edited!");
        navigate(`/event/${event.id}`);
        setIsLoading(false);

        return () => { ignore = true; }
    }


    if (error.happened)
    {
        return (
            <Flex 
                direction="column" 
                width="100%" 
                minHeight="100vh" 
                pb="40px" 
                align="center" 
                bg="rgb(84, 144, 247)"
            >

                <Flex 
                    direction="column" 
                    mt="20px" 
                    p="20px" 
                    justify="center" 
                    align="center" 
                    bg="rgb(252, 252, 230)" 
                    borderRadius="lg" 
                    border="2px solid rgb(0, 52, 140)"
                >
                    <Heading size="md" color="rgb(0, 52, 140)">We failed to edit your Event</Heading>
                    <Heading size="lg" color="rgb(168, 0, 60)">{ error.msg}</Heading>
                </Flex>

                <Flex 
                    m="20px 0px 20px 0px" 
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
        )
    }

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

                <Heading color="rgb(252, 252, 230)">Edit Event</Heading>

                <Flex 
                    w="100%"
                    minH="80vh" 
                    bg="rgb(252, 252, 230)" 
                    borderWidth="2px" 
                    borderColor="rgb(50, 125, 252)" 
                    borderRadius="lg" 
                    overflow="hidden" 
                    direction="column" 
                    align="center"
                    justify="center"
                    boxShadow="lg"
                    mt="20px"
                >

                    <form onSubmit={handleSubmit}>
                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center" 
                        >
                            <Text color="rgb(50, 125, 252)" >Event Title</Text>
                            <Input
                                type="text"
                                mt="5px" 
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(0, 52, 140)"
                                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                                borderWidth="2px"
                                borderColor="rgb(50, 125, 252)"
                                focusBorderColor="rgb(84, 144, 247)"
                                required="required"
                                placeholder="Event Title"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                            />
                        </Flex>
                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center" 
                        >
                            <Text color="rgb(50, 125, 252)" >User ID</Text>
                            <Input
                                type="text"
                                mt="5px" 
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(0, 52, 140)"
                                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                                borderWidth="2px"
                                borderColor="rgb(50, 125, 252)"
                                focusBorderColor="rgb(84, 144, 247)"
                                required="required"
                                placeholder="Your User ID"
                                onChange={e => setCreatedBy(e.target.value)}
                                value={createdBy}
                            />
                        </Flex>
                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center" 
                        >
                            <Text color="rgb(50, 125, 252)" >Description</Text>
                            <Input
                                type="text"
                                mt="5px" 
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(0, 52, 140)"
                                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                                borderWidth="2px"
                                borderColor="rgb(50, 125, 252)"
                                focusBorderColor="rgb(84, 144, 247)"
                                placeholder="Event Description"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            />
                        </Flex>
                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center" 
                        >
                            <Text color="rgb(50, 125, 252)" >Image URL</Text>
                            <Input
                                type="text"
                                mt="5px" 
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(0, 52, 140)"
                                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                                borderWidth="2px"
                                borderColor="rgb(50, 125, 252)"
                                focusBorderColor="rgb(84, 144, 247)"
                                placeholder="Image URL"
                                onChange={e => setImage(e.target.value)}
                                value={image}
                            />
                        </Flex>
                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center" 
                        >
                            <Text color="rgb(50, 125, 252)" >Category ID</Text>
                            <Input
                                type="text"
                                mt="5px" 
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(0, 52, 140)"
                                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                                borderWidth="2px"
                                borderColor="rgb(50, 125, 252)"
                                focusBorderColor="rgb(84, 144, 247)"
                                placeholder="Categories"
                                onChange={e => setCategoryIds(e.target.value)}
                                value={categoryIds}
                            />
                        </Flex>
                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center" 
                        >
                            <Text color="rgb(50, 125, 252)" >Location</Text>
                            <Input
                                type="text"
                                mt="5px" 
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(0, 52, 140)"
                                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                                borderWidth="2px"
                                borderColor="rgb(50, 125, 252)"
                                focusBorderColor="rgb(84, 144, 247)"
                                required="required"
                                placeholder="Location"
                                onChange={e => setLocation(e.target.value)}
                                value={location}
                            />
                        </Flex>
                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center" 
                        >
                            <Text color="rgb(50, 125, 252)" >Start Time</Text>
                            <Input
                                type="text"
                                mt="5px" 
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(0, 52, 140)"
                                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                                borderWidth="2px"
                                borderColor="rgb(50, 125, 252)"
                                focusBorderColor="rgb(84, 144, 247)"
                                required="required"
                                placeholder="Start Time"
                                onChange={e => setStartTime(e.target.value)}
                                value={startTime}
                            />
                        </Flex>
                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center" 
                        >
                            <Text color="rgb(50, 125, 252)" >End Time</Text>
                            <Input
                                type="text"
                                mt="5px"
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(0, 52, 140)"
                                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                                borderWidth="2px"
                                borderColor="rgb(50, 125, 252)"
                                focusBorderColor="rgb(84, 144, 247)"
                                placeholder="End Time"
                                onChange={e => setEndTime(e.target.value)}
                                value={endTime}
                            />
                        </Flex>

                        <Flex 
                            m="20px 0px" 
                            p="5px 10px" 
                            justify="center" 
                            align="center" 
                            bg="rgb(50, 125, 252)" 
                            color="rgb(252, 252, 230)" 
                            borderRadius="lg" 
                            border="2px solid rgb(0, 52, 140)"
                        >
                            {isLoading ? <button>EDITING EVENT...</button> : <button type="submit">EDIT EVENT</button>}
                        </Flex>
                        
                    </form>

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
                        <Link to={'/'}>BACK</Link>
                    </Flex>
                
                </Flex>
            </Flex>
        </Flex>
    )
}