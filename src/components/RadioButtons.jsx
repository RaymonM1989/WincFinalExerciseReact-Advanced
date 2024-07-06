import { Flex } from '@chakra-ui/react';


export const RadioButtons = ( { selectedCategory, setSelectedCategory } ) =>
{
    return (
        <Flex 
            width="80%" 
            bg= "rgb(50, 125, 252)" 
            justify="space-around" 
            mb="10px" 
            size={{ base: "sm", md: "lg" }} 
            boxShadow="lg"
            borderRadius="lg">
            
            <Flex 
                direction="column"
                width="24%"
                m="5px" 
                p="5px"
                textAlign="center" 
                color="rgb(0, 52, 140)"
                bg="rgb(84, 144, 247)" 
                border="2px"     
                borderRadius="lg"  
            >
                <input 
                    type="radio" 
                    name="category" 
                    id="0"
                    value="0" 
                    checked={selectedCategory === "0"} 
                    onChange={(event) => {setSelectedCategory(event.target.value)}} />
                <label htmlFor="0">ALL</label>
            </Flex>
            
            <Flex 
                direction="column"
                width="24%"
                m="5px" 
                p="5px"
                textAlign="center" 
                color="rgb(0, 52, 140)"
                bg="rgb(84, 144, 247)" 
                border="2px"     
                borderRadius="lg"  
            >
                <input 
                    type="radio" 
                    name="category" 
                    id="1"
                    value="1" 
                    checked={selectedCategory === "1"} 
                    onChange={(event) => {setSelectedCategory(event.target.value)}} />
                <label htmlFor="1">SPORTS</label>
            </Flex>

            <Flex 
                direction="column"
                width="24%"
                m="5px" 
                p="5px"
                textAlign="center" 
                color="rgb(0, 52, 140)"
                bg="rgb(84, 144, 247)" 
                border="2px"     
                borderRadius="lg"  
            >
                <input 
                    type="radio" 
                    name="category" 
                    id="2"
                    value="2" 
                    checked={selectedCategory === "2"} 
                    onChange={(event) => {setSelectedCategory(event.target.value)}} />
                <label htmlFor="2">GAMES</label>
            </Flex>

            <Flex 
                direction="column"
                width="24%"
                m="5px" 
                p="5px"
                textAlign="center" 
                color="rgb(0, 52, 140)"
                bg="rgb(84, 144, 247)" 
                border="2px"     
                borderRadius="lg"  
            >
                <input 
                    type="radio" 
                    name="category" 
                    id="3"
                    value="3" 
                    checked={selectedCategory === "3"} 
                    onChange={(event) => {setSelectedCategory(event.target.value)}} />
                <label htmlFor="3">RELAXATION</label>
            </Flex>
      
      </Flex>
    )
}