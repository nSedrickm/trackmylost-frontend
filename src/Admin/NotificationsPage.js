import React, { useReducer, useEffect } from "react";
import tw from "twin.macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiX, FiArrowRight } from "react-icons/fi";
import { getRecentItems, deleteNotification } from "services/api.service";
import {
    Container, CreditCardIcon, DriverLicenseIcon, PassportIcon, IdCardIcon, SearchHeader, Heading,
    DetailsModal, ItemDetails, Section, CardButton
} from "components/General";
import { filterData, paginateData } from "helpers";

import toast from 'react-hot-toast';
import AnimateLoader from "components/Loaders/AnimateLoader";

const NotificationCard = tw.div`mt-6 md:w-1/3 mx-auto h-full flex relative items-center border-gray-200 border p-4 shadow-lg rounded-lg bg-white`;
const CardItem = tw.div`flex-grow`;
const CardTitle = tw.span`text-gray-900 font-medium`;
const CardInfo = tw.p`text-gray-500`;
const CardCloseButton = tw(FiX)`absolute top-0 right-0 h-8 w-8 text-white bg-red-500 items-center cursor-pointer`;


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

const NotificationsPage = () => {

    const [state, dispatch] = useReducer(reducer, {
        data: [],
        recentItems: [],
        displayLength: 10,
        page: 1,
        modal: false,
        item: {},
        loading: false
    });

    const { recentItems, loading } = state;

    useEffect(() => {
        dispatch({ type: "loading", payload: true });
        getRecentItems()
            .then(response => {
                toast.success(`Load complete`);
                dispatch({ type: "setRecent", payload: response.data });
                dispatch({ type: "loading", payload: false });
            })
            .catch(error => {
                if (error.response) {
                    toast.error("We could not check for notifications. Please check your network and try again");
                } else if (error.request) {
                    toast.error("We could not check for notifications. Please check your network and try again");
                } else {
                    toast.error("We could not check for notifications. Please check your network and try again");
                }
                dispatch({ type: "loading", payload: false });
            });
    }, [])

    const handleDelete = (id) => {

        dispatch({ type: "loading", payload: true })
        deleteNotification(id)
            .then(response => {
                toast.success(`Search successfull`);
                dispatch({ type: "setData", payload: response.data });
                dispatch({ type: "paginate" });
                dispatch({ type: "loading", payload: false })
            })
            .catch(error => {
                if (error.response) {
                    toast.error("No notifications found");
                } else if (error.request) {
                    toast.error("An error occurred Please check your network and try again");
                } else {
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

    if (loading) {
        return <AnimateLoader />
    }

    return (
        <AnimationRevealPage disabled>
            <Section tw="py-12 md:py-24 bg-white md:-mx-24 md:-my-16">
                <SearchHeader tw="mb-8">
                    <Heading>Notifications</Heading>
                </SearchHeader>

                <Container>
                    {recentItems.map((item) => {
                        let icon = toggleIcon(item);
                        return (
                            <NotificationCard key={item.id} >
                                <CardCloseButton onClick={() => handleDelete()} />
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
                            </NotificationCard>)
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
                            <DetailsModal.Title>notifications details</DetailsModal.Title>
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
            </Section>
        </AnimationRevealPage>
    )
}
export default NotificationsPage;