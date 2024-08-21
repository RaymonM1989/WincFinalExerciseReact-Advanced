import { Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


export const Button = ( { link, label } ) =>
{
    return (
        <Flex 
            m="10px 10px 20px 10px" 
            p="5px 10px" 
            justify="center" 
            align="center" 
            color="rgb(000, 020, 040)" 
            borderRadius="lg" 
            border="2px solid rgb(000, 130, 180)"
            boxShadow='lg'
            _hover={{border: "2px solid rgb(000, 020, 040)", bg: "rgb(160, 220, 250)" }}
        >
            
            <Link to={link}>{label}</Link>

        </Flex>
    );
};