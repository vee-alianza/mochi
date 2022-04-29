import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Container,
} from '@chakra-ui/react'


const StoryFormPage = () => {
    return (
        <Container>
            <FormControl isRequired>
                <FormLabel htmlFor="title">
                    Title
                </FormLabel>
                <Input id="title" type="text" />
                <FormHelperText></FormHelperText>
            </FormControl>
        </Container>
    );
};

export default StoryFormPage;
