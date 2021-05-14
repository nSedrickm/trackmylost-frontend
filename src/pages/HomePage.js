import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithVerticalPadding } from "components/misc/Layouts.js";
import { FiCheckCircle as CheckboxIcon, FiSearch, FiCrosshair, FiBell } from "react-icons/fi";
import { ReactComponent as QuotesLeftIconBase } from "images/quotes-l.svg"
import { ReactComponent as SvgDecoratorBlob1 } from "images/dot-pattern.svg"
import AnimationRevealPage from "helpers/AnimationRevealPage";

const Row = tw.div`flex flex-col lg:flex-row justify-between items-center lg:pt-8 max-w-screen-2xl mx-auto sm:px-8`;
const Column = tw.div``;
const TextColumn = tw(Column)`mr-auto lg:mr-0 max-w-lg lg:max-w-xl xl:max-w-2xl`;
const Heading = tw(SectionHeading)`text-left text-primary-500 leading-snug xl:text-5xl mb-6`;
const Description = tw(SectionDescription)`lg:text-base text-gray-700 max-w-lg`;
const FeatureList = tw.ul`leading-loose`;
const Feature = tw.li`flex items-center`;
const FeatureIcon = tw(CheckboxIcon)`w-5 h-5 text-primary-500`;
const FeatureText = tw.p`ml-2 font-medium text-gray-700`;
const ImageColumn = tw(Column)`ml-auto lg:mr-0 relative mt-16 lg:mt-0 lg:ml-32`;
const ImageContainer = tw.div`relative z-40 transform xl:-translate-x-24 xl:-translate-y-16`;
const Image = tw.img`max-w-full w-96 rounded-t-xl md:rounded-xl relative z-20`;
const Offsetbackground = tw.div`absolute inset-0 bg-gray-300 rounded xl:-mb-8 rounded-xl md:shadow-xl`
const ImageDecoratorBlob = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none z-10 absolute right-0 bottom-0 transform translate-x-10 translate-y-10 h-32 w-32 opacity-25 text-gray-900 fill-current`}
`;
const Testimonial = tw.div`max-w-sm rounded-b-xl md:rounded-lg md:shadow-2xl relative sm:absolute bottom-0 inset-x-0 z-20 px-8 py-6 sm:px-10 sm:py-8 bg-primary-500 text-gray-100 font-medium transform md:-translate-x-32 text-sm leading-relaxed md:-mr-16 xl:mr-0`
const QuotesLeftIcon = tw(QuotesLeftIconBase)`w-16 h-16 md:w-12 md:h-12 absolute top-0 left-0 text-gray-100 md:text-red-500 transform translate-x-1 md:-translate-x-1/2 md:-translate-y-5 opacity-10 md:opacity-100`
const Quote = tw.blockquote``
const CustomerName = tw.p`mt-4 font-bold`
const CustomerCompany = tw.p`mt-1 text-sm`


const HomePage = ({
    heading = "You lose , We care",
    description = "We have put smiles on Faces! TrackMyLost reunites you with your lost documents ",
    imageSrc = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    imageDecoratorBlob = true,
    features = ["ID Cards", "Passports", "Driver License", "Credit Cards"],
    testimonial = {
        quote: "TRACKMYLOST reunites you with your lost documents",
        customerName: "Charlotte Ndam",
        customerCompany: "Bamenda"
    }
}) => {
    return (
        <>
            <AnimationRevealPage>
                <Container>
                    <ContentWithVerticalPadding>
                        <Row>
                            <TextColumn>
                                <Heading>{heading}</Heading>
                                <Description>{description}</Description>
                                <br />
                                <FeatureList>
                                    <Feature key="1">
                                        <FiSearch tw="w-5 h-5 text-primary-500" />
                                        <FeatureText>Lost something? <a tw="text-primary-500" href="/search">search now</a></FeatureText>
                                    </Feature>

                                    <Feature key="1">
                                        <FiCrosshair tw="w-5 h-5 text-primary-500" />
                                        <FeatureText>Found something? <a tw="text-primary-500" href="/report-item">register</a></FeatureText>
                                    </Feature>

                                    <Feature key="1">
                                        <FiBell tw="w-5 h-5 text-primary-500" />
                                        <FeatureText>Wish to get notified ? <a tw="text-primary-500" href="/alert-me">set alert</a></FeatureText>
                                    </Feature>
                                </FeatureList>
                                <br />
                                <Description tw="mb-2">We support the following items</Description>
                                <FeatureList>
                                    {features.map((feature, index) => (
                                        <Feature key={index}>
                                            <FeatureIcon />
                                            <FeatureText>{feature}</FeatureText>
                                        </Feature>
                                    ))}
                                </FeatureList>
                            </TextColumn>
                            <ImageColumn>
                                <ImageContainer>
                                    <Image src={imageSrc} />
                                    {imageDecoratorBlob && <ImageDecoratorBlob />}
                                    <Testimonial>
                                        <QuotesLeftIcon />
                                        <Quote>{testimonial.quote}</Quote>
                                        <CustomerName>{testimonial.customerName}</CustomerName>
                                        <CustomerCompany>{testimonial.customerCompany}</CustomerCompany>
                                    </Testimonial>
                                </ImageContainer>
                                <Offsetbackground />
                            </ImageColumn>
                        </Row>
                    </ContentWithVerticalPadding>
                </Container>
            </AnimationRevealPage>
        </>
    );
};

export default HomePage;