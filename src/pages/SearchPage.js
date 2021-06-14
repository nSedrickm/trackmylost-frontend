import React, { useReducer, useEffect } from "react";
import tw from "twin.macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { searchItem, getRecentItems } from "services/api.service";
import {
    Container, Row, CreditCardIcon, DriverLicenseIcon, PassportIcon, IdCardIcon, Card, CardItem,
    CardTitle, CardInfo, CardButton, FormField, SearchButton, Form, Input, SearchHeader, Heading,
    MobilePagination, DetailsModal, ItemDetails, Description, Section, ItemGrid
} from "components/General";
import { filterData, paginateData } from "helpers";

import toast from 'react-hot-toast';
import AnimateLoader from "components/Loaders/AnimateLoader";

function reducer(state, action) {
    switch (action.type) {
        case 'setData':
            return {
                ...state,
                data: action.payload
            };
        case 'setRecent':
            return {
                ...state,
                recentItems: action.payload
            };
        case 'changeLength':
            return {
                ...state,
                page: 1,
                displayLength: action.payload
            };
        case 'changePage':
            return {
                ...state,
                page: action.payload
            };
        case 'paginate':
            const start = state.displayLength * (state.page - 1);
            const end = start + state.displayLength;
            let filteredData = paginateData(state.data, start, end);
            return {
                ...state,
                tableData: filteredData
            };
        case 'filter':
            let filtered = filterData(state.data, action.payload);
            return {
                ...state,
                tableData: filtered,
                loading: !state.loading
            };
        case 'toggleFilter':
            return {
                ...state,
                filter: action.payload,
            };
        case 'showDetails':
            return {
                ...state,
                modal: action.payload.modal,
                item: action.payload.item
            };
        case 'addItem':
            return {
                ...state,
                addItem: action.payload
            };
        case 'editItem':
            return {
                ...state,
                editItem: action.payload.editItem,
                item: action.payload.item
            };
        case 'loading':
            return {
                ...state,
                loading: action.payload
            };
        default:
            throw new Error();
    }
}
const SearchPage = () => {

    const [state, dispatch] = useReducer(reducer, {
        data: [],
        tableData: [],
        recentItems: [],
        displayLength: 10,
        page: 1,
        modal: false,
        item: {},
        loading: false
    });

    const { data, tableData, recentItems, page, loading } = state;

    useEffect(() => {
        dispatch({ type: "loading", payload: true });
        getRecentItems()
            .then(response => {
                toast.success(`We found some recently lost documents`);
                dispatch({ type: "setRecent", payload: response.data });
                dispatch({ type: "loading", payload: false });
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("We could not check for recent documents. Please check your network and try again");
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("We could not check for recent documents. Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("We could not check for recent documents. Please check your network and try again");
                }
                dispatch({ type: "loading", payload: false });
            });
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let formData = {
            name: evt.target.elements.search?.value
        }

        dispatch({ type: "loading", payload: true })
        searchItem(formData)
            .then(response => {
                toast.success(`Search successfull`);
                dispatch({ type: "setData", payload: response.data });
                dispatch({ type: "paginate" });
                dispatch({ type: "loading", payload: false })
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("No items found");
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occurred Please check your network and try again");
                }
                dispatch({ type: "loading", payload: false })
            });
    }

    const toggleIcon = (item) => {
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
            default:
                icon = <IdCardIcon />
        }
        return icon;
    }

    //always clear the search data on page load

    if (loading) {
        return <AnimateLoader />
    }

    if (data?.length) {
        return (
            <AnimationRevealPage>
                <Container tw="mt-12 md:my-12">
                    <SearchHeader>
                        <Heading>We found "{data?.length}" item(s)</Heading>
                        <Description>We currently have these items</Description>


                        <FormField tw="mt-4">
                            <SearchButton
                                tw="px-4 py-2"
                                onClick={() => dispatch({ type: "setData", payload: {} })}
                            >
                                <FiSearch /> &nbsp; search again
                            </SearchButton>
                        </FormField>
                    </SearchHeader>

                    <Row>
                        {loading ? (
                            <AnimateLoader />
                        ) : (
                            <>
                                <div tw="my-2 flex items-center">
                                    <MobilePagination
                                        prev
                                        last
                                        next
                                        first
                                        size="md"
                                        pages={data.length > 10 ? data.length / 10 : data.length}
                                        activePage={page}
                                        maxButtons={4}
                                        boundaryLinks
                                        onSelect={(evt) => {
                                            dispatch({ type: "changePage", payload: evt })
                                            dispatch({ type: "paginate" })
                                        }}
                                    />
                                </div>
                                {tableData.map((item) => {

                                    let icon = toggleIcon(item);

                                    return (
                                        <Card key={item.id}>
                                            {icon}
                                            <CardItem>
                                                <CardTitle>{item.first_name} &nbsp; {item.other_names}</CardTitle>
                                                <CardInfo>{item.document_type}</CardInfo>
                                                <CardButton
                                                    onClick={() => dispatch({
                                                        type: "showDetails",
                                                        payload: {
                                                            modal: true,
                                                            item: item
                                                        }
                                                    })}
                                                >
                                                    Details &nbsp; <FiArrowRight size={16} />
                                                </CardButton>
                                            </CardItem>
                                        </Card>)
                                })}


                                <DetailsModal
                                    size="xs"
                                    show={state.modal}
                                    onHide={() => dispatch({
                                        type: "showDetails",
                                        payload: {
                                            modal: false,
                                            item: {}
                                        }
                                    })}
                                >
                                    <DetailsModal.Header>
                                        <DetailsModal.Title>Document details</DetailsModal.Title>
                                    </DetailsModal.Header>
                                    <DetailsModal.Body>
                                        <ItemDetails>Name: {state.item.first_name} &nbsp; {state.item.other_names}</ItemDetails>
                                        <ItemDetails>Type: {state.item.document_type}</ItemDetails>
                                        <ItemDetails>Created: {new Date(state.item.created_at).toLocaleString()}</ItemDetails>
                                        <ItemDetails>Updated: {new Date(state.item.updated_at).toLocaleString()}</ItemDetails>
                                        <ItemDetails>Contact: {state.item.phone_number}</ItemDetails>
                                    </DetailsModal.Body>
                                    <DetailsModal.Footer>
                                    </DetailsModal.Footer>
                                </DetailsModal>
                            </>
                        )}
                    </Row>
                </Container>
            </AnimationRevealPage>
        )
    }
    return (
        <AnimationRevealPage>
            <Section>
                <Container tw="mt-12 md:mt-36">
                    <SearchHeader tw="mb-8">
                        <Heading tw="mb-4">Search for missing documents</Heading>
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

                    <Container tw="my-24">
                        <SearchHeader>
                            <Heading>Recently Found Items</Heading>
                        </SearchHeader>

                        <ItemGrid>
                            {recentItems.map((item) => {
                                let icon = toggleIcon(item);
                                return (
                                    <Card key={item.id} >
                                        {icon}
                                        <CardItem>
                                            <CardTitle>{item.first_name} &nbsp; {item.other_names}</CardTitle>
                                            <CardInfo>{item.document_type}</CardInfo>
                                            <CardButton
                                                onClick={() => dispatch({
                                                    type: "showDetails",
                                                    payload: {
                                                        modal: true,
                                                        item: item
                                                    }
                                                })}
                                            >
                                                Details &nbsp; <FiArrowRight size={16} />
                                            </CardButton>
                                        </CardItem>
                                    </Card>)
                            })}
                        </ItemGrid>

                        <DetailsModal
                            size="xs"
                            show={state.modal}
                            onHide={() => dispatch({
                                type: "showDetails",
                                payload: {
                                    modal: false,
                                    item: {}
                                }
                            })}
                        >
                            <DetailsModal.Header>
                                <DetailsModal.Title>Document details</DetailsModal.Title>
                            </DetailsModal.Header>
                            <DetailsModal.Body>
                                <ItemDetails>Name: {state.item.first_name} &nbsp; {state.item.other_names}</ItemDetails>
                                <ItemDetails>Type: {state.item.document_type}</ItemDetails>
                                <ItemDetails>Created: {new Date(state.item.created_at).toLocaleString()}</ItemDetails>
                                <ItemDetails>Updated: {new Date(state.item.updated_at).toLocaleString()}</ItemDetails>
                                <ItemDetails>Contact: {state.item.phone_number}</ItemDetails>
                            </DetailsModal.Body>
                            <DetailsModal.Footer>
                            </DetailsModal.Footer>
                        </DetailsModal>
                    </Container>
                </Container>
            </Section>
        </AnimationRevealPage>
    )
}
export default SearchPage;