import React, { useReducer } from "react";
import tw from "twin.macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiX, FiArrowRight, FiBellOff } from "react-icons/fi";
import { Container, CreditCardIcon, DriverLicenseIcon, PassportIcon, IdCardIcon, UserIcon, SearchHeader, Heading, DetailsModal, ItemDetails, Section, CardButton, Description } from "components/General";
import { useAdminContext } from "Admin/AdminContext";


const NotificationCard = tw.div`mt-6 md:w-1/3 mx-auto h-full flex relative items-center border-gray-200 border p-4 shadow-lg rounded-xl bg-white`;
const CardItem = tw.div`flex-grow`;
const CardTitle = tw.span`text-gray-900 font-medium`;
const CardInfo = tw.p`text-gray-500`;
const CardCloseButton = tw(FiX)`absolute top-0 right-0 h-8 w-8 text-white bg-red-500 items-center cursor-pointer rounded-tr-xl`;

function reducer(state, action) {
    switch (action.type) {
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

    const { state, handleDeleteNotification } = useAdminContext();

    const { notifications } = state;

    const [lstate, dispatch] = useReducer(reducer, {
        modal: false,
        item: {},
        loading: false
    });

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

    return(
        <AnimationRevealPage disabled>
        <Section tw="py-12 md:py-24 bg-white md:-mx-24 md:-my-16">
            <SearchHeader tw="mb-8">
                <Heading>Notifications</Heading>
            </SearchHeader>

            {notifications?.length ? (
                <Container>
                    {notifications?.map((item) => {
                        let icon = toggleIcon(item);
                        return (
                            <NotificationCard key={item.id}>
                                <CardCloseButton onClick={() => handleDeleteNotification(item.id)} />
                                {item.type === "item-found" && (
                                    <>
                                        {icon}
                                        <CardItem>
                                            <CardTitle>Item Found</CardTitle>
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
                                    </>
                                )}

                                {item.type === "agent-registered" && (
                                    <>
                                        <UserIcon />
                                        <CardItem>
                                            <CardTitle>New registration</CardTitle>
                                            <CardInfo>{item.phone_number}</CardInfo>
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
                                    </>
                                )}

                            </NotificationCard>
                        )
                    })}

                    <DetailsModal
                        size="xs"
                        show={lstate.modal}
                        onHide={() => dispatch({
                            type: "showDetails",
                            payload: {
                                modal: false,
                                item: {}
                            }
                        })}
                    >
                        <DetailsModal.Header>
                            <DetailsModal.Title tw="font-bold">Notifications details</DetailsModal.Title>
                        </DetailsModal.Header>
                        <DetailsModal.Body>
                            <ItemDetails>Message: {lstate.item.type === "item-found" ? "Item Found" : "New Agent Registration"}</ItemDetails>
                            {lstate.item.type === "item-found" && <ItemDetails>Document Type: {lstate.item.document_type}</ItemDetails>}
                            <ItemDetails>Name: {lstate.item.name}</ItemDetails>
                            {lstate.item.type === "agent-registered" && <ItemDetails>Phone Number: {lstate.item.phone_number}</ItemDetails>}
                            <ItemDetails>Created: {new Date(lstate.item.created_at).toLocaleString()}</ItemDetails>
                            <ItemDetails>Updated: {new Date(lstate.item.updated_at).toLocaleString()}</ItemDetails>
                        </DetailsModal.Body>
                        <DetailsModal.Footer>
                        </DetailsModal.Footer>
                    </DetailsModal>
                </Container>
            ) : (
                <Container tw="grid place-items-center py-24">
                    <FiBellOff size={48} tw="mb-10" />

                    <Description>No current notifications</Description>
                </Container>
            )}
        </Section>
        </AnimationRevealPage>
    )
}
export default NotificationsPage;