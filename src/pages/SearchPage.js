import React, { useState } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { searchItem } from "services/api.service";
import {
    Container, Row, CreditCardIcon,
    DriverLicenseIcon, PassportIcon, IdCardIcon, Card, CardItem, CardTitle, CardInfo,
    CardButton, FormField, SearchButton, Form, Input, SearchHeader, Heading, Description, Section
} from "components/General";

import toast from 'react-hot-toast';
import AnimateLoader from "components/Loaders/AnimateLoader";

// const SearchButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;

const SearchPage = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let formData = {
            name: evt.target.elements.search?.value
        }

        setLoading(true);
        searchItem(formData)
            .then(response => {
                toast.success(`Search successfull`);
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

    //always clear the search data on page load

    if (loading) {
        return (
            <AnimateLoader />
        );
    }

    if (data.length) {
        return (
            <AnimationRevealPage>
                <Container tw="mt-12">
                    <SearchHeader>
                        <Heading>We found {data.length} item(s)</Heading>
                        <Description>We currently have these items</Description>


                        <FormField tw="mt-4">
                            <SearchButton 
                            tw="px-4 py-2"
                            onClick={() => window.location.reload()}>
                                <FiSearch /> &nbsp; search again
                            </SearchButton>
                        </FormField>
                    </SearchHeader>

                    <Row>
                        {data.map((item) => {
                            let icon
                            switch (item.document_type) {
                                case "credit-card":
                                    icon = <CreditCardIcon />
                                    break;
                                case "driver-license":
                                    icon = <DriverLicenseIcon />
                                    break;
                                case "passport":
                                    icon = <PassportIcon />
                                    break
                                default: {
                                    icon = <IdCardIcon />
                                }

                            }

                            return (
                                <Card key={item.id}>
                                    {icon}
                                    <CardItem>
                                        <CardTitle>{item.first_name} &nbsp; {item.other_names}</CardTitle>
                                        <CardInfo>{item.document_type}</CardInfo>
                                        <CardButton
                                        // onClick={() => dispatch({
                                        //     type: "showDetails",
                                        //     payload: {
                                        //         modal: true,
                                        //         item: item
                                        //     }
                                        // })}
                                        >
                                            Details &nbsp; <FiArrowRight size={16} />
                                        </CardButton>
                                    </CardItem>
                                </Card>)
                        })}
                    </Row>
                </Container>
            </AnimationRevealPage>
        )
    }
    return (
        <AnimationRevealPage>
            <Section>
                <Container tw="mt-12">
                    <SearchHeader>
                        <Heading>Search for missing documents</Heading>
                        <Description>We have put smiles on Faces! TrackMyLost reunites you with your lost documents</Description>
                    </SearchHeader>
                    <Row>
                        <Form onSubmit={(evt) => handleSubmit(evt)}>
                            <div tw="flex flex-wrap -m-2">
                                <FormField>
                                    <div tw="relative">
                                        <Input required
                                            type="search"
                                            name="search"
                                            placeholder="e.g First name on document"
                                        />
                                    </div>
                                </FormField>
                                <FormField>
                                    <SearchButton type="submit">
                                        <FiSearch /> &nbsp; search
                                        </SearchButton>
                                </FormField>
                            </div>
                        </Form>
                    </Row>
                </Container>
            </Section>
        </AnimationRevealPage>
    )
}
export default SearchPage;