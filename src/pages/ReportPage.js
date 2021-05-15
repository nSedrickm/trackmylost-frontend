import React from 'react';
import tw from 'twin.macro';
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiSave, FiChevronDown } from "react-icons/fi";


const SubmitButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Input = tw.input`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out rounded-4xl placeholder-gray-400`;
const Checkbox = tw(Input)`inline-block h-5 w-5 checked:bg-primary-500 checked:border-transparent`;
const Label = tw.label`leading-7 text-sm text-gray-600`;
const Column = tw.div`p-4 md:w-1/2 w-full`;
const Row = tw.div`flex flex-wrap -m-4 md:px-24`;
const Form = tw.form`mx-auto md:border border-primary-500 md:p-8 rounded-2xl`;
const StepsContainer = tw.div`mx-auto flex flex-wrap md:p-8`;
const SubHeading = tw.h2`sm:text-3xl text-2xl font-medium mb-4 text-primary-500`;
const Description = tw.p`mb-4 lg:text-2xl text-gray-700 font-medium`;
const Select = tw.select`block appearance-none w-full bg-gray-100  bg-opacity-50 border border-gray-300 text-gray-600 py-3 px-4 pr-8 rounded-4xl leading-tight focus:outline-none focus:bg-white focus:border-primary-500`;
const SelectToggle = tw.div`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`;

const handleSubmit = (evt) => {
    evt.preventDefault();

    let formData = {
        type: evt.target.elements.document_type?.value,
        first_name: evt.target.elements.first_name?.value,
        other_names: evt.target.elements.other_names?.value,
        phone_number: evt.target.elements.phone_number?.value,
        reward: evt.target.elements.reward?.checked ? "yes" : "no"
    }
    console.log(formData);
}

const ReportPage = () => {
    return (
        <AnimationRevealPage>
            <section tw="text-gray-600 relative">
                <div tw="container py-12 mx-auto">
                    <div tw="flex flex-col text-center w-full mb-12">
                        <h1 tw="sm:text-4xl text-2xl font-black mb-4 text-primary-500">Found a lost document?</h1>
                        <p tw="lg:w-2/3 mx-auto leading-relaxed text-base">Register it below</p>
                    </div>

                    <Row>
                        <Column>
                            <StepsContainer>
                                <Description>How it works</Description>
                                <div tw="flex flex-wrap w-full">
                                    <div>
                                        <div tw="flex relative pb-12">
                                            <div tw="h-full w-10 absolute inset-0 flex items-center justify-center">
                                                <div tw="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                            </div>
                                            <div tw="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500 inline-flex items-center justify-center text-white relative z-10">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" tw="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                                </svg>
                                            </div>
                                            <div tw="flex-grow pl-4">
                                                <h2 tw="font-medium text-sm text-gray-900 mb-1 tracking-wider">STEP 1</h2>
                                                <p tw="leading-relaxed">Fill out the form</p>
                                            </div>
                                        </div>
                                        <div tw="flex relative pb-12">
                                            <div tw="h-full w-10 absolute inset-0 flex items-center justify-center">
                                                <div tw="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                            </div>
                                            <div tw="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500 inline-flex items-center justify-center text-white relative z-10">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" tw="w-5 h-5" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="5" r="3"></circle>
                                                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                                                </svg>
                                            </div>
                                            <div tw="flex-grow pl-4">
                                                <h2 tw="font-medium text-sm text-gray-900 mb-1 tracking-wider">STEP 2</h2>
                                                <p tw="leading-relaxed">Confirm you Phone number.</p>
                                            </div>
                                        </div>
                                        <div tw="flex relative pb-12">
                                            <div tw="h-full w-10 absolute inset-0 flex items-center justify-center">
                                                <div tw="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                            </div>
                                            <div tw="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500 inline-flex items-center justify-center text-white relative z-10">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" tw="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                            </div>
                                            <div tw="flex-grow pl-4">
                                                <h2 tw="font-medium text-sm text-gray-900 mb-1 tracking-wider">STEP 4</h2>
                                                <p tw="leading-relaxed">Wait for the owner to call you</p>
                                            </div>
                                        </div>
                                        <div tw="flex relative">
                                            <div tw="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500 inline-flex items-center justify-center text-white relative z-10">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" tw="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                                    <path d="M22 4L12 14.01l-3-3"></path>
                                                </svg>
                                            </div>
                                            <div tw="flex-grow pl-4">
                                                <h2 tw="font-medium text-sm text-gray-900 mb-1 tracking-wider">FINISH</h2>
                                                <p tw="leading-relaxed">We will send you a MOMO gift</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </StepsContainer>
                        </Column>

                        <Column>
                            <Form onSubmit={(evt) => handleSubmit(evt)}>
                                <SubHeading>Register</SubHeading>
                                <div tw="flex flex-wrap -m-2">
                                    <div tw="p-2 w-full">
                                        <Label htmlFor="document_type">
                                            Document type
                                        </Label>
                                        <div tw="relative">
                                            <Select
                                                id="document_type"
                                                name="document_type"
                                                required>
                                                <option value="" hidden>Please Choose document type</option>
                                                <option value="id-card">ID Card</option>
                                                <option value="passport">Passport</option>
                                                <option value="driver-license">Driver License</option>
                                                <option value="credit-card">Credit Card</option>
                                            </Select>
                                            <SelectToggle>
                                                <FiChevronDown />
                                            </SelectToggle>
                                        </div>
                                    </div>
                                    <div tw="p-2 w-full">
                                        <div tw="relative">
                                            <Label htmlFor="first_name">First Name</Label>
                                            <Input required type="text" id="first_name" name="first_name" placeholder="First name on item" />
                                        </div>
                                    </div>
                                    <div tw="p-2 w-full">
                                        <div tw="relative">
                                            <Label htmlFor="other_names">Other Names</Label>
                                            <Input
                                                required
                                                type="text"
                                                id="other_names"
                                                name="other_names"
                                                placeholder="Other names"
                                            />
                                        </div>
                                    </div>
                                    <div tw="p-2 w-full">
                                        <div tw="relative">
                                            <Label htmlFor="phone_number">Your Phone Number</Label>
                                            <Input
                                                required
                                                type="tel"
                                                id="phone_number"
                                                name="phone_number"
                                                placeholder="e.g 670020023"
                                                size="9"
                                                maxLength="9"
                                                minLength="9"
                                                pattern="(6|2)(2|3|[5-9])[0-9]{7}"
                                            //with areacode pattern="(\+237|237)\s(6|2)(2|3|[5-9])[0-9]{7}"
                                            />
                                        </div>
                                    </div>
                                    <div tw="p-2 w-full mt-3 ">
                                        <div tw="relative">
                                            <Label htmlFor="reward" tw="flex items-center justify-center">
                                                <Checkbox
                                                    type="checkbox"
                                                    name="reward"
                                                    value="yes"
                                                />
                                                <span tw="ml-2">Would you like a reward?</span>
                                            </Label>
                                        </div>

                                    </div>
                                    <div tw="p-2 w-full">
                                        <SubmitButton type="submit">
                                            <FiSave /> &nbsp; continue</SubmitButton>
                                    </div>
                                </div>
                            </Form>
                        </Column>
                    </Row>
                </div>
            </section>

        </AnimationRevealPage>
    )
};

export default ReportPage;