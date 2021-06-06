import React, { useState, useEffect, useReducer } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import AnimateLoader from "components/Loaders/AnimateLoader";
import toast from 'react-hot-toast';

import { FiArrowRight, FiLoader, FiPlusCircle, FiChevronDown, FiEdit } from "react-icons/fi";
import { getAlerts } from "services/api.service";
import { Table, Pagination as MobilePagination, Modal } from 'rsuite';
import { getSavedAdminAlerts, saveAdminAlerts, clearAdminAlerts } from "services/storage.service";
import { useAdminContext } from "Admin/AdminContext";

import {
    Header, HeaderItem, Heading, Description, Button, Container, Row, CreditCardIcon,
    DriverLicenseIcon, PassportIcon, IdCardIcon, Card, CardItem, CardTitle, CardInfo,
    CardButton, FormField, SearchButton, Form, Input, Label, Select, SelectToggle, SubmitButton
} from "components/General";

const DetailsModal = styled(Modal)`
    width: 20rem;
    top: 10%;
`;
const ItemDetails = tw.p`text-base font-medium`;

const { Column, HeaderCell, Cell, Pagination } = Table;
const DataTable = styled(Table)`
    .rs-table-cell-header .rs-table-cell-content {
        ${tw`text-sm bg-primary-500 hocus:bg-primary-700`}
    }
`;
const TableHeader = tw(HeaderCell)`text-white font-medium`;
const TableCell = tw(Cell)``;
const TablePagination = styled(Pagination)`
    ${tw`p-2`}
    .rs-picker-toggle-value {
        ${tw`text-primary-500!`}
    }
`;
const TableAction = tw.span`cursor-pointer`;

function reducer(state, action) {
    switch (action.type) {
        case 'setData':
            return {
                ...state,
                data: action.payload
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
            // setLoading(true)
            // filter the data as array
            const start = state.displayLength * (state.page - 1);
            const end = start + state.displayLength;
            let filteredData = Object.values(Object.fromEntries(Object.entries(state.data).filter((v, i) => i >= start && i < end)));
            return {
                ...state,
                tableData: filteredData
            };
        case 'showDetails':
            return {
                ...state,
                modal: action.payload.modal,
                alert: action.payload.alert
            };
        case 'addAlert':
            return {
                ...state,
                addAlert: action.payload
            };
        case 'editAlert':
            return {
                ...state,
                editAlert: action.payload.editAlert,
                alert: action.payload.alert
            };
        default:
            throw new Error();
    }
}

const AlertsPage = () => {
    const { handleSetAlert, handleUpdateAlert, handleDeleteAlert, userData } = useAdminContext();

    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useReducer(reducer, {
        data: [],
        tableData: [],
        displayLength: 10,
        page: 1,
        modal: false,
        alert: {},
        addAlert: false,
        editAlert: false
    });

    const { data, tableData, displayLength, page } = state;

    useEffect(() => {
        setLoading(true);
        let alerts = getSavedAdminAlerts();
        if (alerts) {
            dispatch({ type: "setData", payload: alerts });
            dispatch({ type: "paginate" });
            setLoading(false);
        } else {
            getAlerts()
                .then(response => {
                    toast.success(`Fetch complete`);
                    dispatch({ type: "setData", payload: response.data });
                    dispatch({ type: "paginate" });
                    saveAdminAlerts(response.data);
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
    }, []);

    const handleRefresh = () => {
        clearAdminAlerts();
        setLoading(true);
        getAlerts()
            .then(response => {
                toast.success(`Fetch complete`);
                dispatch({ type: "setData", payload: response.data });
                dispatch({ type: "paginate" });
                saveAdminAlerts(response.data);
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

    return (
        <AnimationRevealPage>

            <Header>
                <HeaderItem tw="text-center md:text-left mb-8 sm:mb-0">
                    <Heading>Registered Alerts</Heading>
                    <Description>All registered alerts</Description>
                </HeaderItem>
                <HeaderItem tw="space-x-2 sm:space-x-0 inline-flex">
                    <Button onClick={() => dispatch({
                        type: "addAlert",
                        payload: true
                    })}
                    >
                        <FiPlusCircle size={16} /> &nbsp; add
                        </Button>
                    <Button onClick={() => handleRefresh()}>
                        <FiLoader size={16} /> &nbsp; refresh
                            </Button>
                </HeaderItem>
            </Header>

            <Container tw="hidden md:block">
                <DataTable
                    virtualized
                    height={420}
                    headerHeight={50}
                    autoHeight
                    data={tableData}
                    loading={loading}
                >
                    <Column width={50} align="center">
                        <TableHeader>Id</TableHeader>
                        <TableCell dataKey="id" />
                    </Column>

                    <Column flexGrow={1.5}>
                        <TableHeader>Full Name(s)</TableHeader>
                        <TableCell dataKey="name" />
                    </Column>

                    <Column flexGrow={1}>
                        <TableHeader>Document Type</TableHeader>
                        <TableCell dataKey="document_type" />
                    </Column>

                    <Column flexGrow={1}>
                        <TableHeader>Phone Number</TableHeader>
                        <TableCell dataKey="phone_number" />
                    </Column>


                    <Column flexGrow={1}>
                        <TableHeader>Created</TableHeader>
                        <TableCell dataKey="created_at" />
                    </Column>

                    <Column flexGrow={1}>
                        <TableHeader>Last Update</TableHeader>
                        <TableCell dataKey="updated_at" />
                    </Column>

                    <Column flexGrow={1} >
                        <TableHeader>Action</TableHeader>
                        <TableCell>
                            {rowData => {
                                return (
                                    <span>
                                        <TableAction tw="text-primary-500"
                                            onClick={() => dispatch({
                                                type: "editAlert",
                                                payload: {
                                                    editAlert: true,
                                                    alert: rowData
                                                }
                                            })}
                                        >
                                            Edit
                                            </TableAction> |{' '}
                                        <TableAction tw="text-red-500"
                                            onClick={() => handleDeleteAlert(rowData.id)}
                                        >
                                            Remove
                                             </TableAction>
                                    </span>
                                );
                            }}
                        </TableCell>
                    </Column>
                </DataTable>

                <TablePagination
                    lengthMenu={[
                        {
                            value: 10,
                            label: 10
                        },
                        {
                            value: 20,
                            label: 20
                        },
                        {
                            value: 30,
                            label: 30
                        },
                        {
                            value: 50,
                            label: 50
                        },
                        {
                            value: 100,
                            label: 100
                        }
                    ]}
                    activePage={page}
                    displayLength={displayLength}
                    total={data.length}
                    onChangePage={(evt) => {
                        dispatch({ type: "changePage", payload: evt })
                        dispatch({ type: "paginate" })
                    }}
                    onChangeLength={(evt) => {
                        dispatch({ type: "changeLength", payload: evt })
                        dispatch({ type: "paginate" })
                    }}
                />
            </Container>

            <Container tw="md:hidden">
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
                            {tableData.map((alert) => {
                                let icon
                                switch (alert.document_type) {
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
                                    <Card key={alert.id}>
                                        {icon}
                                        <CardItem>
                                            <CardTitle>{alert.name}</CardTitle>
                                            <CardInfo>{alert.document_type}</CardInfo>
                                            <CardButton
                                                onClick={() => dispatch({
                                                    type: "showDetails",
                                                    payload: {
                                                        modal: true,
                                                        alert: alert
                                                    }
                                                })}
                                            >
                                                Details &nbsp; <FiArrowRight size={16} />
                                            </CardButton>
                                        </CardItem>
                                    </Card>)
                            })}
                            <FormField tw="mt-8">
                                <SearchButton onClick={() => handleRefresh()}>
                                    <FiLoader /> &nbsp; refresh
                                    </SearchButton>
                            </FormField>

                            <DetailsModal
                                size="xs"
                                show={state.modal}
                                onHide={() => dispatch({
                                    type: "showDetails",
                                    payload: {
                                        modal: false,
                                        alert: {}
                                    }
                                })}
                            >
                                <Modal.Header>
                                    <Modal.Title>Document details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ItemDetails>Name: {state.alert.name}</ItemDetails>
                                    <ItemDetails>Type: {state.alert.document_type}</ItemDetails>
                                    <ItemDetails>Created: {new Date(state.alert.created_at).toLocaleString()}</ItemDetails>
                                    <ItemDetails>Updated: {new Date(state.alert.updated_at).toLocaleString()}</ItemDetails>
                                    <ItemDetails>Contact: {state.alert.phone_number}</ItemDetails>

                                    <div tw="mt-4">
                                        <TableAction tw="text-base text-primary-500"
                                            onClick={() => dispatch({
                                                type: "editAlert",
                                                payload: {
                                                    editAlert: true,
                                                    alert: state.alert
                                                }
                                            })}
                                        >
                                            Edit
                                            </TableAction> |{' '}
                                        <TableAction tw="text-base text-red-500"
                                            onClick={() => handleDeleteAlert(state.alert.id)}
                                        >
                                            Remove
                                             </TableAction>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </DetailsModal>


                            <DetailsModal
                                size="xs"
                                show={state.addAlert || state.editAlert}
                                onHide={() => {
                                    if (state.addAlert) {
                                        dispatch({
                                            type: "addAlert",
                                            payload: false
                                        })
                                    } else {
                                        dispatch({
                                            type: "editAlert",
                                            payload: {
                                                editAlert: false,
                                                alert: {}
                                            }
                                        })
                                    }
                                }}
                            >
                                <Modal.Header>
                                    <Modal.Title>{state.editAlert ? "Edit Alert" : "Add Alert"}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={(evt) => {
                                        if (state.editAlert) {
                                            handleUpdateAlert(evt);
                                        } else {
                                            handleSetAlert(evt)
                                        }
                                    }}>
                                        <Input
                                            hidden
                                            type="number"
                                            id="id"
                                            name="id"
                                            defaultValue={state.editAlert ? state.alert?.id : ""}
                                        />
                                        <div tw="p-2 w-full">
                                            <Label htmlFor="document_type">
                                                Document type
                                                    </Label>
                                            <div tw="relative">
                                                <Select
                                                    id="document_type"
                                                    name="document_type"
                                                    defaultValue={state.editAlert ? state.alert?.document_type : ""}
                                                    required
                                                >
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
                                                <Label htmlFor="name">Full Name(s)</Label>
                                                <Input
                                                    required
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Full name(s)"
                                                    defaultValue={state.editAlert ? state.alert?.name : ""}
                                                />
                                            </div>
                                        </div>
                                        <div tw="p-2 w-full">
                                            <div tw="relative">
                                                <Label htmlFor="other_names">Phone Number</Label>
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
                                                    defaultValue={state.editAlert ? state.alert?.phone_number : userData.phone_number}

                                                />
                                            </div>
                                        </div>

                                        <div tw="p-2 w-full">
                                            {state.editAlert ? (
                                                <SubmitButton type="submit">
                                                    <FiEdit size={20} /> &nbsp; update
                                                </SubmitButton>
                                            ) : (
                                                <SubmitButton type="submit">
                                                    <FiPlusCircle size={20} /> &nbsp; add
                                                </SubmitButton>
                                            )}
                                        </div>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </DetailsModal>

                        </>
                    )}
                </Row>
            </Container>
        </AnimationRevealPage>
    )

}

export default AlertsPage;
