import { Flex, Text, Input } from '@chakra-ui/react';


export const FormInput = ( { label, id, type, state, defaultValue, placeholder, required } ) =>
{
    return (
        <Flex  
            direction="Column" 
            m="20px"
            align="center"
            width={{base: "80%", md: "40%"}}
        >
            <Text color="rgb(000, 020, 040)" >{ label }</Text>
            <Input
                type={type}
                id={id}
                required={required}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange = {e => {state(e.target.value)}}

                mt="5px" 
                size={{ base: "sm", md: "lg" }} 
                boxShadow='lg'
                color="rgb(000, 020, 040)"
                _placeholder={{ opacity: 0.6, color: "rgb(000, 020, 040)" }}
                border="2px solid rgb(000, 130, 180)"
                _hover={{ border: "2px solid rgb(000, 080, 100)", bg: "rgb(160, 220, 250)" }}
                _focus={{ border: "2px solid rgb(000, 020, 040)", bg: "rgb(160, 220, 250)" }}
            />
        </Flex>
    );
};