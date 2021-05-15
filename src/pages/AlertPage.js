import React from 'react';
import tw from 'twin.macro';
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiBell, FiChevronDown } from "react-icons/fi";


const SubmitButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Input = tw.input`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out rounded-4xl placeholder-gray-400`;
const Label = tw.label`leading-7 text-xs text-gray-600 uppercase tracking-wide font-medium block mb-2`;
const Row = tw.div`flex flex-wrap -m-4 md:px-24`;
const Form = tw.form`mx-auto md:w-2/3 md:my-24 md:border border-primary-500 md:p-8 rounded-2xl`;
const SubHeading = tw.h2`sm:text-3xl text-2xl font-medium mb-4 text-primary-500`;
const Select = tw.select`block appearance-none w-full bg-gray-100  bg-opacity-50 border border-gray-300 text-gray-600 py-3 px-4 pr-8 rounded-4xl leading-tight focus:outline-none focus:bg-white focus:border-primary-500`;
const SelectToggle = tw.div`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`;

const AlertPage = () => {
    return (
        <AnimationRevealPage>
            <section tw="text-gray-600 relative">
                <div tw="container py-12 mx-auto">
                    <div tw="flex flex-col text-center w-full mb-12">
                        <h1 tw="sm:text-4xl text-2xl font-black mb-4 text-primary-500">Need to know when we find your item?</h1>
                        <p tw="lg:w-2/3 mx-auto leading-relaxed text-base">Set an alert below</p>
                    </div>

                    <Row>
                        <Form>
                            <SubHeading>Set alert</SubHeading>
                            <div tw="flex flex-wrap -m-2">
                                <div tw="p-2 w-full">
                                    <div tw="relative">
                                        <Label for="name">Full Names</Label>
                                        <Input required type="text" id="name" name="name" placeholder="First name on item" />
                                    </div>
                                </div>
                                <div tw="p-2 w-full">
                                    <Label for="document-type">
                                        Document type
                                     </Label>
                                    <div tw="relative">
                                        <Select id="document-type" required>
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
                                        <Label for="email">Email</Label>
                                        <Input
                                            required
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="e.g user@gmail.com"
                                        />
                                    </div>
                                </div>
                                <div tw="p-2 w-full">
                                    <div tw="relative">
                                        <Label for="phone-number">Your Phone Number</Label>
                                        <Input
                                            required
                                            type="tel"
                                            id="phone-number"
                                            name="phone-number"
                                            placeholder="e.g 670020023"
                                            size="9"
                                            maxLength="9"
                                            minLength="9"
                                            pattern="(6|2)(2|3|[5-9])[0-9]{7}"
                                        //with areacode pattern="(\+237|237)\s(6|2)(2|3|[5-9])[0-9]{7}"
                                        />
                                    </div>
                                </div>
                                <div tw="p-2 w-full">
                                    <SubmitButton type="submit">
                                        <FiBell /> &nbsp; continue</SubmitButton>
                                </div>
                            </div>
                        </Form>
                    </Row>
                </div>
            </section>
        </AnimationRevealPage>
    )
};

export default AlertPage;