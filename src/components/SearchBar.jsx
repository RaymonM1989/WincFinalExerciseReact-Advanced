import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';

        
export const SearchBar = ({ placeholder, width, onChange, addon }) =>
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
                _placeholder={{ opacity: 0.6, color: "rgb(000, 020, 040)" }} 
                color="rgb(000, 020, 040)"
                border="2px solid rgb(000, 130, 180)"
                _hover={{ border: "2px solid rgb(000, 080, 100)", bg: "rgb(160, 220, 250)" }}
                _focus={{ border: "2px solid rgb(000, 020, 040)", bg: "rgb(160, 220, 250)" }}
                onChange={onChange} 
            />

            <InputRightElement h="full" mr="10px" >
                {addon}
            </InputRightElement> 

        </InputGroup>
    );
};


