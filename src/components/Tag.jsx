import { Box, Text } from '@chakra-ui/react';


export const Tag = ( { label, bgcolor, color } ) =>
{
    return (
        <Box 
            m="10px" 
            p="1px 6px"
            bg={bgcolor} 
            color={color} 
            borderRadius="md"
            boxShadow="md" 
        >
            <Text>{label}</Text> 
        </Box>
    );
};