import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import DashHeader from 'components/headers/DashHeader';
import { Route, Switch } from "react-router-dom";
import { DashProvider } from "Dashboard/DasbhoardContext"

const SearchButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Heading = tw.h1`sm:text-4xl text-2xl font-black  mb-4 text-primary-500`;
const Description = tw.p`lg:w-2/3 mx-auto leading-relaxed text-base`;
const Header = tw.header`flex flex-col text-center w-full mb-4`;
const Container = tw.div`container py-12 md:py-40  mx-auto`;
const Row = tw.div`lg:w-1/2 md:w-2/3 mx-auto`;
const FormField = tw.div`p-2 w-full mb-4`;
const Section = tw.section`text-gray-600 relative`;
// const CardIcon = tw(FiFileText)`text-primary-500 object-cover object-center w-12 h-12 sm:w-14 sm:h-14 mr-4`;
// const Card = tw.div`mt-8 h-full flex items-center border-gray-200 border p-4 shadow-md rounded-lg`;
// const CardBody = tw.div`flex-grow`;
// const CardTitle = tw.span`text-gray-900 font-medium`;
// const CardInfo = tw.p`text-gray-500`;


const DashboardPage = () => {

    return (
        <DashProvider>
            <DashHeader />
            <AnimationRevealPage>
                <Section>
                    <Container>
                        <Header>
                            <Heading>Dashboard</Heading>
                            <Description>Mock dashboard</Description>
                        </Header>
                        <Row>
                            <div tw="flex flex-wrap -m-2">
                                <FormField>
                                    <SearchButton type="submit">
                                        &nbsp; Logout
                                        </SearchButton>
                                </FormField>
                            </div>
                        </Row>
                    </Container>
                </Section>

                <Switch>
                    <Route path="/dashboard">

                    </Route>
                </Switch>
            </AnimationRevealPage>
        </DashProvider>
    )
}
export default DashboardPage;