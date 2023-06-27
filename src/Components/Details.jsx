import React, { useState } from 'react';
import { Input, Box, Button, Heading, Table, Thead, Tr, Th, Tbody, Td, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import API from "../Utils/axios";
import Swal from "sweetalert2";

export const Details = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [userData, setUserData] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [isProjectManager, setIsProjectManager] = useState(false);
    const [inputText, setInputText] = useState("");
    const [chatResponse, setChatResponse] = useState("");

    async function getUser(token) {
        try {
            let res = await API.get('/getuser');

            setData(res.data);
            if (res.role === "project manager") {
                console.log("Hello");
                setIsProjectManager(true);
                getUsersData(token);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleLogout = () => {
        sessionStorage.removeItem('kafkaPulse');

        navigate("/login");
    }
    const getUsersData = async (token) => {
        try {
            let res = await API.get('/get-tickets');
            res = res.data;
            console.log(res);
            setTickets(res);
            // setUserData(res);
        } catch (error) {
            console.log(error);
        }
    }
    async function chat(message) {
        try {
            let res = await API.post("/send-message", { message });
            setChatResponse(res.data.result);
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }

    React.useEffect(() => {
        let token = sessionStorage.getItem('kafkaPulse');

        if (!token)
            navigate("/login");
        else {
            getUser(token);
        }
    }, []);
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                chat(inputText);
            }}>
                <Box width="40%" margin="40px auto" position="relative">
                    <Button position="absolute" right="0" top="0" colorScheme="red" onClick={handleLogout}>Logout</Button>
                    <Heading size="lg" color="#256D85">{`Name:    ${data?.name || ""}`}</Heading>
                    <Heading size="lg" color="#256D85">{`Age:    ${data?.age || ""}`}</Heading>
                    <Heading size="lg" color="#256D85">{`Gender:    ${data?.gender || ""}`}</Heading>
                    <Heading size="lg" color="#256D85">{`Role:    ${data?.role || ""}`}</Heading>
                    <Heading size="lg" color="#256D85">{`Email:    ${data?.email || ""}`}</Heading>

                </Box>
                <Box width="40%" margin="40px auto" boxShadow='lg' p='6' rounded='md' bg='#d9d9d9'>
                    <Input value={inputText} onChange={(e) => setInputText(e.target.value)} type='text' placeholder='Enter your query here' bg="white" />
                    <Button colorScheme="green" type="submit">
                        Send
                    </Button>
                </Box>
                <Box width="60%" m="auto"><Text fontSize='xl'>{chatResponse}</Text></Box>

                {isProjectManager && <Box width="80%" margin="40px auto">
                    <Table colorScheme="facebook" variant="striped" >
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Age</Th>
                                <Th>Gender</Th>
                                <Th>Role</Th>
                                <Th>Email</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {userData.map((ele, index) => {
                                return (<Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{ele.name}</Td>
                                    <Td>{ele.age}</Td>
                                    <Td>{ele.gender}</Td>
                                    <Td>{ele.role}</Td>
                                    <Td>{ele.email}</Td>
                                </Tr>)
                            })}
                        </Tbody>
                    </Table>
                </Box>}
            </form>
        </>
    )
}