import { useState }          from 'react';
import { useNavigate, useLoaderData, Link } from 'react-router-dom';
import { Flex, 
         Heading, 
         Text, 
         Select,
         Checkbox,
         CheckboxGroup,
         Stack 
        }                    from '@chakra-ui/react';
import { FormInput } from '../components/FormInput';

export const loader = async () =>
{
    const users =      await fetch("http://localhost:3000/users");
    const categories =  await fetch("http://localhost:3000/categories");

    return { users: await users.json(), categories: await categories.json() };
}


export const NewEventPage = () =>
{
    const navigate = useNavigate();

    const { users, categories }             = useLoaderData();

    const [isLoading, setIsLoading] = useState(false);
    const noErrorState = { happened: false, msg: "" };
    const [error, setError] = useState(noErrorState);

    const [title, setTitle]             = useState("");
    const [createdBy, setCreatedBy]     = useState(1);
    const [description, setDescription] = useState("");
    const [image, setImage]             = useState("");
    const [categoryIds, setCategoryIds] = useState([]);
    const [location, setLocation]       = useState("");
    const [startTime, setStartTime]     = useState("");
    const [endTime, setEndTime]         = useState("");

    const handleSubmit = event =>
    {
        event.preventDefault();
        createEvent( { title, createdBy, description, image, categoryIds, location, startTime, endTime } );
        console.log("title: ", title);
        console.log("createdBy: ", createdBy);
        console.log("description: ", description);
        console.log("image: ", image);
        console.log("categoryIds: ", categoryIds);
        console.log("location: ", location);
        console.log("startTime: ", startTime);
        console.log("endTime: ", endTime);
    }

    
    const createEvent = async ( event ) =>
    {
        let ignore = false;
        setIsLoading(true);
        setError(noErrorState);
        let response;

        try
        {
            response = await fetch("http://localhost:3000/events",
            {
                method: "POST",
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

        alert("The Event was successfully created!");
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
                    border="2px solidg rgb(0, 52, 140)"
                >
                    <Heading size="md" color="rgb(0, 52, 140)">We failed to create your Event</Heading>
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

                <Heading color="rgb(252, 252, 230)">New Event</Heading>

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
                        
                        <FormInput
                            label = "Event Title"
                            id = "eventTitle"
                            type = "text"
                            placeholder = "Event Title"
                            defaultValue={title}
                            state={setTitle}
                            required="required"
                        />

                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center" 
                        >
                            <Text color="rgb(50, 125, 252)" >Creator</Text>
                            <Select
                                name="userIDs" 
                                onChange={e => { setCreatedBy(parseInt(e.target.value)); }} 
                                mt="5px" 
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(0, 52, 140)"
                                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                                borderWidth="2px"
                                borderColor="rgb(50, 125, 252)"
                                focusBorderColor="rgb(84, 144, 247)" 
                            >
                                { users.map( (user) => 
                                    ( 
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    )
                                )} 
                            </Select>
                        </Flex>

                        <FormInput
                            label = "Description"
                            id = "description"
                            type = "textarea"
                            placeholder = "Event Description"
                            defaultValue={description}
                            state={setDescription}
                            required="required"
                        />

                        <FormInput
                            label = "Image URL"
                            id = "image"
                            type = "url"
                            placeholder = "Image URL"
                            defaultValue={image}
                            state={setImage}
                            required="required"
                        />

                        <CheckboxGroup value={categoryIds}>
                            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                { categories.map( (category) => 
                                    ( 
                                        <Checkbox key={category.id} size='lg' value={category.id} onChange={e => 
                                            {
                                                const newArray = [...categoryIds];
                                                const index = newArray.indexOf(parseInt(e.target.value));

                                                if (index !== -1)
                                                {
                                                    newArray.splice(index, 1);
                                                    setCategoryIds(newArray);
                                                }
                                                else
                                                {
                                                    newArray.push(parseInt(e.target.value));
                                                    newArray.sort();
                                                    setCategoryIds(newArray);
                                                }
                                            }}
                                            >
                                            {category.name}
                                        </Checkbox>
                                    )
                                )} 
                            </Stack>
                        </CheckboxGroup>

                        <FormInput
                            label = "Location"
                            id = "location"
                            type = "text"
                            placeholder = "Location"
                            defaultValue={location}
                            state={setLocation}
                            required="required"
                        />

                        <FormInput
                            label = "Start Time"
                            id = "startTime"
                            type = "datetime-local"
                            placeholder = "Start Time"
                            defaultValue={startTime}
                            state={setStartTime}
                            required="required"
                        />

                        <FormInput
                            label = "End Time"
                            id = "endTime"
                            type = "datetime-local"
                            placeholder = "End Time"
                            defaultValue={endTime}
                            state={setEndTime}
                            required="required"
                        />
                    
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
                            {isLoading ? <button>ADDING NEW EVENT...</button> : <button type="submit">ADD NEW EVENT</button>}
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