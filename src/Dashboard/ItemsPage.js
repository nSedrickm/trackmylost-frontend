import React, { useState, useEffect, useReducer } from "react";
import tw from "twin.macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage";
import AnimateLoader from "components/Loaders/AnimateLoader";
import toast from 'react-hot-toast';
import {
    Container, Row, CreditCardIcon,
    DriverLicenseIcon, PassportIcon, IdCardIcon, Card, CardItem, CardTitle, CardInfo,
    CardButton, FormField, SearchButton, Form, Input, Label,
    SubmitButton, ItemDetails, DataTable, Column, TableHeader, TableCell, TableAction,
    TablePagination, DetailsModal, MobilePagination, Select, SelectToggle
} from "components/General";
import { FiArrowRight, FiLoader, FiPlusCircle, FiChevronDown, FiEdit } from "react-icons/fi";
import { getUserItems } from "services/api.service";
import { getSavedItems, saveItems, clearItems } from "services/storage.service";
import { useDashContext } from "Dashboard/DashboardContext";
import { filterData, paginateData } from "helpers";
import { DashControlHeader } from "components";

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

const ItemsPage = () => {
    const { handleRegisterItem, handleUpdateItem, handleDeleteItem, userData } = useDashContext();

    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useReducer(reducer, {
        data: [],
        tableData: [],
        displayLength: 10,
        page: 1,
        modal: false,
        item: {},
        filter: true,
        addItem: false,
        editItem: false
    });

    const { data, tableData, displayLength, page } = state;

    useEffect(() => {
        setLoading(true);
        let items = getSavedItems();
        if (items) {
            dispatch({ type: "setData", payload: items });
            dispatch({ type: "paginate" });
            setLoading(false);
        } else {
            getUserItems(userData.phone_number)
                .then(response => {
                    toast.success(`Fetch complete`);
                    dispatch({ type: "setData", payload: response.data });
                    dispatch({ type: "paginate" });
                    saveItems(response.data);
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
    }, [userData.phone_number]);

    const handleRefresh = () => {
        clearItems();
        setLoading(true);
        getUserItems(userData.phone_number)
            .then(response => {
                toast.success(`Fetch complete`);
                dispatch({ type: "setData", payload: response.data });
                dispatch({ type: "paginate" });
                saveItems(response.data);
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

    // if (data.length) {
    return (
        <AnimationRevealPage>

            <DashControlHeader
                heading="Registered Items"
                description="All registered Items"
                state={state}
                dispatch={dispatch}
                resetItems={getSavedItems}
                refreshFunc={handleRefresh}
            />

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

                    <Column flexGrow={1}>
                        <TableHeader>First Name</TableHeader>
                        <TableCell dataKey="first_name" />
                    </Column>

                    <Column flexGrow={1.5}>
                        <TableHeader>Other Name(s)</TableHeader>
                        <TableCell dataKey="other_names" />
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

                    <Column flexGrow={1}>
                        <TableHeader>Reward</TableHeader>
                        <TableCell dataKey="reward" />
                    </Column>

                    <Column flexGrow={1} >
                        <TableHeader>Action</TableHeader>
                        <TableCell>
                            {rowData => {
                                return (
                                    <span>
                                        <TableAction tw="text-primary-500"
                                            onClick={() => dispatch({
                                                type: "editItem",
                                                payload: {
                                                    editItem: true,
                                                    item: rowData
                                                }
                                            })}
                                        >
                                            Edit
                                            </TableAction> |{' '}
                                        <TableAction tw="text-red-500"
                                            onClick={() => handleDeleteItem(rowData.id)}
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
                            {tableData.map((item) => {
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

                                    <div tw="mt-4">
                                        <TableAction tw="text-base text-primary-500"
                                            onClick={() => dispatch({
                                                type: "editItem",
                                                payload: {
                                                    editItem: true,
                                                    item: state.item
                                                }
                                            })}
                                        >
                                            Edit
                                        </TableAction> |{' '}
                                        <TableAction tw="text-base text-red-500"
                                            onClick={() => handleDeleteItem(state.item.id)}
                                        >
                                            Remove
                                        </TableAction>
                                    </div>
                                </DetailsModal.Body>
                                <DetailsModal.Footer>
                                </DetailsModal.Footer>
                            </DetailsModal>


                            <DetailsModal
                                size="xs"
                                show={state.addItem || state.editItem}
                                onHide={() => {
                                    if (state.addItem) {
                                        dispatch({
                                            type: "addItem",
                                            payload: false
                                        })
                                    } else {
                                        dispatch({
                                            type: "editItem",
                                            payload: {
                                                editItem: false,
                                                item: {}
                                            }
                                        })
                                    }
                                }}
                            >
                                <DetailsModal.Header>
                                    <DetailsModal.Title>Add Item</DetailsModal.Title>
                                </DetailsModal.Header>
                                <DetailsModal.Body>
                                    <Form onSubmit={(evt) => {
                                        if (state.editItem) {
                                            handleUpdateItem(evt);
                                        } else {
                                            handleRegisterItem(evt)
                                        }
                                    }}>
                                        <Input
                                            hidden
                                            type="number"
                                            id="id"
                                            name="id"
                                            defaultValue={state.editItem ? state.item?.id : ""}
                                        />
                                        <div tw="p-2 w-full">
                                            <Label htmlFor="document_type">
                                                Document type
                                                    </Label>
                                            <div tw="relative">
                                                <Select
                                                    id="document_type"
                                                    name="document_type"
                                                    defaultValue={state.item?.document_type}
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
                                                <Label htmlFor="first_name">First Name</Label>
                                                <Input
                                                    required
                                                    type="text"
                                                    id="first_name"
                                                    name="first_name"
                                                    placeholder="First name on item"
                                                    defaultValue={state.editItem ? state.item?.first_name : ""}
                                                />
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
                                                    defaultValue={state.editItem ? state.item?.other_names : ""}
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            required
                                            hidden
                                            type="tel"
                                            id="phone_number"
                                            name="phone_number"
                                            placeholder="e.g 670020023"
                                            size="9"
                                            maxLength="9"
                                            minLength="9"
                                            pattern="(6|2)(2|3|[5-9])[0-9]{7}"
                                            defaultValue={userData.phone_number}
                                        />

                                        <Input
                                            defaultChecked
                                            hidden
                                            type="checkbox"
                                            name="reward"
                                            defaultValue="yes"
                                        />

                                        <div tw="p-2 w-full">
                                            {state.editItem ? (
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
    // }

    // return (
    //     <AnimationRevealPage>
    //         <Container tw="py-24">
    //             <Header tw="block text-center">
    //                 <Heading>No Items Found</Heading>
    //                 <Description>It seems no Items have been registered</Description>
    //             </Header>

    //             <Row>
    //                 <FormField tw="mt-8">
    //                     <SearchButton onClick={() => handleRefresh()}>
    //                         <FiLoader /> &nbsp; refresh
    //                     </SearchButton>
    //                 </FormField>
    //             </Row>
    //         </Container>
    //     </AnimationRevealPage>
    // );
}

export default ItemsPage;
