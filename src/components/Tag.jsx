import { Box, Text } from '@chakra-ui/react';


export const Tag = ( { label } ) =>
{
    return (
        <Box 
            m="10px" 
            p="1px 6px"
            bg="rgb(160, 220, 250)" 
            color="rgb(000, 080, 100)"
            borderRadius="md"
            boxShadow="md" 
        >
            <Text>{label}</Text> 
        </Box>
    );
};