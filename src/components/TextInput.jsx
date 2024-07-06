import { InputGroup, 
         Input, 
         InputRightElement 
        } from '@chakra-ui/react';

        
export const TextInput = ( { placeholder, width, onChange, addon }) =>
{
    return (
        <InputGroup 
            width={width}
            m="20px" 
            size={{ base: "sm", md: "lg" }} 
            boxShadow='lg'
        >
            <Input 
                placeholder={placeholder} 
                _placeholder={{ opacity: 0.6, color: "rgb(0, 52, 140)" }} 
                color="rgb(252, 252, 230)"
                border="2px solid rgb(50, 125, 252)"
                focusBorderColor="rgb(252, 252, 230)"
                onChange={onChange} 
            />

            <InputRightElement h="full" mr="10px" >
                {addon}
            </InputRightElement> 

        </InputGroup>
    );
};


