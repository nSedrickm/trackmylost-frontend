import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiFileText, FiLoader } from "react-icons/fi";
import { getAlerts } from "services/api.service";
import { Loader } from "rsuite";

import toast from 'react-hot-toast';

const SearchButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Heading = tw.h1`sm:text-4xl text-2xl font-black  mb-4 text-primary-500`;
const LoadingContainer = tw.div`h-screen text-center`;
const Description = tw.p`lg:w-2/3 mx-auto leading-relaxed text-base`;
const Header = tw.header`flex flex-col text-center w-full mb-4`;
const Container = tw.div`container py-12 md:py-24 mx-auto`;
const Row = tw.div`lg:w-1/2 md:w-2/3 mx-auto`;
const FormField = tw.div`p-2 w-full mb-4`;
const CardIcon = tw(FiFileText)`text-primary-500 object-cover object-center w-12 h-12 sm:w-14 sm:h-14 mr-4`;
const Card = tw.div`mt-8 h-full flex items-center border-gray-200 border p-4 shadow-md rounded-lg`;
const CardBody = tw.div`flex-grow`;
const CardTitle = tw.span`text-gray-900 font-medium`;
const CardInfo = tw.p`text-gray-500`;

const AlertsPage = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const handleGetItems = () => {
        setLoading(true);
        getAlerts()
            .then(response => {
                toast.success(`Fetch complete`);
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx

                    toast.error("No items found");
                    setLoading(false);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
                }
            });
    }

    useEffect(() => {
        handleGetItems();
    }, []);


    if (loading) {
        return (
            <LoadingContainer>
                <Loader backdrop size="md" content="processing please wait" vertical />
            </LoadingContainer>
        );
    }

    if (data.length) {
        return (
            <AnimationRevealPage>
                <Container>
                    <Header>
                        <Heading>Registered Alerts</Heading>
                        <Description>The following alerts have been set</Description>
                    </Header>

                    <Row>
                        {data.map((item) => (
                            <Card key={item.id}>
                                <CardIcon />
                                <CardBody>
                                    <CardTitle>{item.first_name} &nbsp; {item.other_names}</CardTitle>
                                    <CardInfo>{item.document_type}</CardInfo>
                                </CardBody>
                            </Card>
                        ))}
                        <FormField tw="mt-8">
                            <SearchButton onClick={() => handleGetItems()}>
                                <FiLoader /> &nbsp; refresh
                         </SearchButton>
                        </FormField>
                    </Row>
                </Container>
            </AnimationRevealPage>
        )
    }

    return (
        <AnimationRevealPage>
            <Container>
                <Header>
                    <Heading>No Alerts Found</Heading>
                    <Description>It seems no alerts have been set yet</Description>
                </Header>

                <Row>
                    <FormField tw="mt-8">
                        <SearchButton onClick={() => handleGetItems()}>
                            <FiLoader /> &nbsp; refresh
                         </SearchButton>
                    </FormField>
                </Row>
            </Container>
        </AnimationRevealPage>
    );
}
export default AlertsPage;