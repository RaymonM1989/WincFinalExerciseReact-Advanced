import { useState }                                 from 'react';
import { useLoaderData, useParams, useNavigate }    from 'react-router-dom';
import { FormInput }                                from '../components/FormInput';
import { Button }                                   from '../components/Button';
import { Flex, 
         Text, 
         Select, 
         CheckboxGroup, 
         Checkbox, 
         Heading }                                  from '@chakra-ui/react';


export const loader = async ( { params } ) =>
{
    try
    {
        const event =      await fetch(`http://localhost:3000/events/${params.eventId}`);

        const users =      await fetch("http://localhost:3000/users");

        if (!users.ok)
        {
            throw new Error('Something went wrong while trying to fetch the Users')
        }

        const categories =  await fetch("http://localhost:3000/categories");

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


export const EventForm = ( callerID ) =>
{
    const { event, users, categories }  = useLoaderData();
    const eventId                       = useParams().eventId;
    const navigate                      = useNavigate();

    const [isLoading, setIsLoading]     = useState(false);
    const noErrorState                  = { happened: false, msg: "" };
    const [error, setError]             = useState(noErrorState);

    const [title, setTitle]             = useState(event ? (event.title)        :(""));
    const [createdBy, setCreatedBy]     = useState(event ? (event.createdBy)    :(0));
    const [description, setDescription] = useState(event ? (event.description)  :(""));
    const [image, setImage]             = useState(event ? (event.image)        :(""));
    const [categoryIds, setCategoryIds] = useState(event ? (event.categoryIds)  :([]));
    const [location, setLocation]       = useState(event ? (event.location)     :(""));
    const [startTime, setStartTime]     = useState(event ? (event.startTime)    :(""));
    const [endTime, setEndTime]         = useState(event ? (event.endTime)      :(""));
    

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
        navigate(`/`);

        setIsLoading(false);

        return () => { ignore = true; }
    }


    const handleSubmit = event =>
    {
        event.preventDefault();

        if (callerID.callerID === "1")
        {
            createEvent({ title, createdBy, description, image, categoryIds, location, startTime, endTime });
        }
        if (callerID.callerID === "2")
        {
            editEvent({ title, createdBy, description, image, categoryIds, location, startTime, endTime });
        }
    };


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
            
            <Flex direction="column" width="100%" align="center">

                {callerID.callerID == "1" &&
                    <Flex position="absolute" top="40px" left="30px">
                        <Button  link="/" label="BACK" />
                    </Flex> 
                }
                
                <Heading color="rgb(000, 020, 040)">{callerID.callerID == "1" ? "Create Event" : "Update Event"}</Heading>

                <form width="100%" onSubmit={handleSubmit}>
                    
                    <Flex
                        direction={{base: "column", md: "row"}}
                        wrap="wrap"
                        width="100%" 
                        minH="74vh" 
                        mt="20px" 
                        overflow="hidden" 
                        bg="rgb(200, 230, 240)" 
                        border="2px solid rgb(000, 130, 180)" 
                        borderRadius="lg" 
                        boxShadow="lg"
                        justify="space-around"
                        align="center"
                    >
                        
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
                            width={{base: "80%", md: "40%"}}
                        >
                            <Text color="rgb(000, 020, 040)" >Creator</Text>
                            <Select
                                defaultValue={createdBy}
                                name="userIDs" 
                                onChange={e => { setCreatedBy(parseInt(e.target.value)); }} 
                                mt="5px" 
                                size={{ base: "sm", md: "lg" }} 
                                boxShadow='lg'
                                color="rgb(000, 020, 040)"
                                _placeholder={{ opacity: 0.6, color: "rgb(000, 020, 040)" }}
                                border="2px solid rgb(000, 130, 180)"
                                _hover={{ border: "2px solid rgb(000, 080, 100)", bg: "rgb(160, 220, 250)" }}
                                _focus={{ border: "2px solid rgb(000, 020, 040)", bg: "rgb(160, 220, 250)" }}
                            >
                                <option hidden key="0" value="0">Pick a Creator</option>

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

                        <Flex  
                            direction="Column" 
                            m="20px"
                            align="center"
                            width={{base: "80%", md: "40%"}}
                            height="75px"
                        >
                            <Text mb="10px" color="rgb(000, 020, 040)">Categories</Text>

                            <CheckboxGroup value={categoryIds}>
                                <Flex 
                                    direction={{base: "column", sm: "row", md: "row"}} 
                                    width="100%" 
                                    justify="space-around" 
                                    wrap="wrap"
                                >
                                    { categories.map( (category) => 
                                    ( 
                                        <Checkbox 
                                            color="rgb(000, 080, 100)" 
                                            borderColor="rgb(000, 130, 180)" 
                                            key={category.id} size='lg' 
                                            value={category.id} 
                                            onChange={e => 
                                            {
                                                let newArray = [];

                                                if (categoryIds)
                                                {
                                                    newArray = [...categoryIds];
                                                }
                                                
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
                                </Flex>
                            </CheckboxGroup>
                        </Flex>

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

                    </Flex>

                    <Flex justify="center">
                        <Flex 
                            m="10px 0px 20px 0px" 
                            p="5px 10px"
                            bg="rgb(200, 230, 240)"
                            width="15ch" 
                            justify="center" 
                            align="center" 
                            color="rgb(000, 020, 040)" 
                            borderRadius="lg" 
                            border="2px solid rgb(000, 130, 180)"
                            boxShadow='lg'
                            _hover={{border: "2px solid rgb(000, 020, 040)", bg: "rgb(160, 220, 250)" }}
                        >
                            {isLoading ? <button>{callerID.callerID == "1" ? "CREATING EVENT..." : "UPDATING EVENT..."}</button> : <button type="submit">{callerID.callerID == "1" ? "CREATE EVENT" : "UPDATE EVENT"}</button>}
                        </Flex>
                    </Flex>
                </form>
            </Flex>
        </Flex>
    );
};