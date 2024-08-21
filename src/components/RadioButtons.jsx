import { Flex } from '@chakra-ui/react';


const RadioButton = ( { group, id, checked, onChange, label }) =>
{
    return (
        <Flex
            direction="column"
            minWidth="15ch"
            width="24%" 
            mb="5px"
            p="5px"
            textAlign="center" 
            color="rgb(000, 020, 040)"
            border="2px solid rgb(000, 130, 180)"     
            borderRadius="lg"
            boxShadow='lg'
            _hover={{ border: "2px solid rgb(000, 080, 100)", bg: "rgb(160, 220, 250)"}}
        >
            <input
                type="radio"
                name={group}
                id={id}
                value={id}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </Flex>
    )
}


export const RadioButtons = ( { categories, selectedCategory, setSelectedCategory } ) =>
{
    return (
        <Flex width="100%" justify="space-around" wrap="wrap">

            <RadioButton
                key="0"
                group="category"
                id="0"
                checked={selectedCategory === "0"}
                onChange={(event) => {setSelectedCategory(event.target.value)}}
                label="ALL"
            /> 

            { categories.map( (category) => 
            ( 
                <RadioButton
                    key={category.id}
                    group="category"
                    id={category.id}
                    checked={selectedCategory === category.id.toString()}
                    onChange={(event) => {setSelectedCategory(event.target.value)}}
                    label={category.name.toUpperCase()}
                /> 
            )
            )} 
      </Flex>
    );
};