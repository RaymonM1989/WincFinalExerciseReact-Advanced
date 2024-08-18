import { Flex, Text, Input } from '@chakra-ui/react';

export const FormInput = ( { label, id, type, state, defaultValue, placeholder, required } ) =>
{
    return (
        <Flex  
            direction="Column" 
            m="20px"
            align="center" 
        >
            <Text color="rgb(50, 125, 252)" >{ label }</Text>
            <Input
                type={type}
                id={id}
                required={required}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange = {e => {state(e.target.value)}}
                //value={state}

                mt="5px" 
                size={{ base: "sm", md: "lg" }} 
                boxShadow='lg'
                color="rgb(0, 52, 140)"
                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }}
                borderWidth="2px"
                borderColor="rgb(50, 125, 252)"
                focusBorderColor="rgb(84, 144, 247)" 
            />
        </Flex>
    )
}