import React, { useState, useEffect, useReducer } from "react";
import tw from "twin.macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage";
import AnimateLoader from "components/Loaders/AnimateLoader";
import toast from 'react-hot-toast';

import { FiArrowRight, FiLoader, FiPlusCircle, FiEdit, FiEye, FiEyeOff } from "react-icons/fi";
import { getUsers } from "services/admin.service";
import { getSavedUsers, saveUsers, clearUsers } from "services/storage.service";
import { useAdminContext } from "Admin/AdminContext";
import { filterData, paginateData } from "helpers";
import { DashControlHeader } from "components";

import {
    Container, Row, AgentIcon, Card, CardItem, CardTitle, CardInfo,
    CardButton, FormField, SearchButton, Form, Input, Label, ToggleButton,
    SubmitButton, ItemDetails, DataTable, Column, TableHeader, TableCell, TableAction,
    TablePagination, DetailsModal, MobilePagination
} from "components/General";


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
                agent: action.payload.agent
            };
        case 'addAgent':
            return {
                ...state,
                addAgent: action.payload
            };
        case 'editAgent':
            return {
                ...state,
                editAgent: action.payload.editAgent,
                agent: action.payload.agent
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

const AgentsPage = () => {
    const { handleRegisterAgent, handleUpdateAgent, handleDeleteAgent } = useAdminContext();

    const [toggle, setToggle] = useState(false);

    const [state, dispatch] = useReducer(reducer, {
        data: [],
        tableData: [],
        displayLength: 10,
        page: 1,
        modal: false,
        agent: {},
        addAgent: false,
        editAgent: false,
        filter: true,
        loading: false
    });

    const { data, tableData, displayLength, page } = state;

    useEffect(() => {
        dispatch({ type: "loading", payload: true });
        let agents = getSavedUsers();
        if (agents) {
            dispatch({ type: "setData", payload: agents });
            dispatch({ type: "paginate" });
            dispatch({ type: "loading", payload: false });
        } else {
            getUsers()
                .then(response => {
                    toast.success(`Fetch complete`);
                    dispatch({ type: "setData", payload: response.data });
                    dispatch({ type: "paginate" });
                    saveUsers(response.data);
                    dispatch({ type: "loading", payload: false });
                })
                .catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        toast.error("No items found");
                        dispatch({ type: "loading", payload: false });
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        dispatch({ type: "loading", payload: false });
                        toast.error("An error occurred Please check your network and try again");
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        dispatch({ type: "loading", payload: false });
                        toast.error("An error occurred Please check your network and try again");
                    }
                });
        }
    }, []);

    const handleRefresh = () => {
        clearUsers();
        dispatch({ type: "loading", payload: true });
        getUsers()
            .then(response => {
                toast.success(`Fetch complete`);
                dispatch({ type: "setData", payload: response.data });
                dispatch({ type: "paginate" });
                saveUsers(response.data);
                dispatch({ type: "loading", payload: false });
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("No items found");
                    dispatch({ type: "loading", payload: false });
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    dispatch({ type: "loading", payload: false });
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    dispatch({ type: "loading", payload: false });
                    toast.error("An error occurred Please check your network and try again");
                }
            });
    }

    return (
        <AnimationRevealPage>

            <DashControlHeader
                heading="Registered Agents"
                description="All registered agents"
                state={state}
                dispatch={dispatch}
                resetItems={getSavedUsers}
                refreshFunc={handleRefresh}
            />

            <Container tw="hidden md:block">
                <DataTable
                    virtualized
                    height={420}
                    headerHeight={50}
                    autoHeight
                    data={tableData}
                    loading={state.loading}
                >
                    <Column width={50} align="center">
                        <TableHeader>Id</TableHeader>
                        <TableCell dataKey="id" />
                    </Column>

                    <Column flexGrow={1}>
                        <TableHeader>First Name</TableHeader>
                        <TableCell dataKey="first_name" />
                    </Column>

                    <Column flexGrow={1}>
                        <TableHeader>Last Name</TableHeader>
                        <TableCell dataKey="last_name" />
                    </Column>

                    Town          <Column flexGrow={1}>
                        <TableHeader>Phone Number</TableHeader>
                        <TableCell dataKey="phone_number" />
                    </Column>

                    <Column flexGrow={1}>
                        <TableHeader>Town</TableHeader>
                        <TableCell dataKey="town" />
                    </Column>

                    <Column flexGrow={1}>
                        <TableHeader>Status</TableHeader>
                        <TableCell dataKey="status" />
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
                                                type: "editAgent",
                                                payload: {
                                                    editAgent: true,
                                                    agent: rowData
                                                }
                                            })}
                                        >
                                            Edit
                                        </TableAction> |{' '}
                                        <TableAction tw="text-red-500"
                                            onClick={() => handleDeleteAgent(rowData.id)}
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
                    {state.loading ? (
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
                            {tableData.map((agent) => {

                                return (
                                    <Card key={agent.id}>
                                        <AgentIcon />
                                        <CardItem>
                                            <CardTitle>{agent.first_name} {agent.last_name}</CardTitle>
                                            <CardInfo>{agent.status}</CardInfo>
                                            <CardButton
                                                onClick={() => dispatch({
                                                    type: "showDetails",
                                                    payload: {
                                                        modal: true,
                                                        agent: agent
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
                                        agent: {}
                                    }
                                })}
                            >
                                <DetailsModal.Header>
                                    <DetailsModal.Title tw="font-bold">Agent details</DetailsModal.Title>
                                </DetailsModal.Header>
                                <DetailsModal.Body>
                                    <ItemDetails>Name: {state.agent.first_name} {state.agent.last_name}</ItemDetails>
                                    <ItemDetails>Status: {state.agent.status}</ItemDetails>
                                    <ItemDetails>Phone number: {state.agent.phone_number}</ItemDetails>
                                    <ItemDetails>Town: {state.agent.town}</ItemDetails>
                                    <ItemDetails>Created: {new Date(state.agent.created_at).toLocaleString()}</ItemDetails>
                                    <ItemDetails>Updated: {new Date(state.agent.updated_at).toLocaleString()}</ItemDetails>

                                    <div tw="mt-4">
                                        <TableAction tw="text-base text-primary-500"
                                            onClick={() => dispatch({
                                                type: "editAgent",
                                                payload: {
                                                    editAgent: true,
                                                    agent: state.agent
                                                }
                                            })}
                                        >
                                            Edit
                                        </TableAction> |{' '}
                                        <TableAction tw="text-base text-red-500"
                                            onClick={() => handleDeleteAgent(state.agent.id)}
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
                                show={state.addAgent || state.editAgent}
                                onHide={() => {
                                    if (state.addAgent) {
                                        dispatch({
                                            type: "addAgent",
                                            payload: false
                                        })
                                    } else {
                                        dispatch({
                                            type: "editAgent",
                                            payload: {
                                                editAgent: false,
                                                agent: {}
                                            }
                                        })
                                    }
                                }}
                            >
                                <DetailsModal.Header>
                                    <DetailsModal.Title>{state.editAgent ? "Edit Agent" : "Add Agent"}</DetailsModal.Title>
                                </DetailsModal.Header>
                                <DetailsModal.Body>
                                    <Form onSubmit={(evt) => {
                                        if (state.editAgent) {
                                            handleUpdateAgent(evt);
                                        } else {
                                            handleRegisterAgent(evt)
                                        }
                                    }}>
                                        <Input
                                            hidden
                                            type="number"
                                            id="id"
                                            name="id"
                                            defaultValue={state.editAgent ? state.agent?.id : ""}
                                        />
                                        <div tw="p-2 w-full">
                                            <div tw="p-2 w-full">
                                                <div tw="relative">
                                                    <Label htmlFor="first_name">First name</Label>
                                                    <Input
                                                        required
                                                        type="text"
                                                        id="first_name"
                                                        name="first_name"
                                                        placeholder="First name"
                                                        defaultValue={state.editAgent ? state.agent?.first_name : ""}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div tw="p-2 w-full">
                                            <div tw="relative">
                                                <Label htmlFor="last_name">Last Name</Label>
                                                <Input
                                                    required
                                                    type="text"
                                                    id="last_name"
                                                    name="last_name"
                                                    placeholder="last name(s)"
                                                    defaultValue={state.editAgent ? state.agent?.last_name : ""}
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
                                                    defaultValue={state.editAgent ? state.agent?.phone_number : ""}

                                                />
                                            </div>
                                        </div>

                                        <div tw="p-2 w-full">
                                            <div tw="relative">
                                                <Label htmlFor="town">Town</Label>
                                                <Input
                                                    required
                                                    type="text"
                                                    id="town"
                                                    name="town"
                                                    placeholder="last name(s)"
                                                    defaultValue={state.editAgent ? state.agent?.town : ""}
                                                />
                                            </div>
                                        </div>

                                        {state.addAgent ? (
                                            <div tw="p-2 w-full">
                                                <Label htmlFor="password">Password</Label>
                                                <div tw="relative">
                                                    <Input required
                                                        type={toggle ? "text" : "password"}
                                                        id="password"
                                                        name="password"
                                                        placeholder="Enter password"
                                                        minLength="4"
                                                    />
                                                    <ToggleButton onClick={() => setToggle(!toggle)}>
                                                        {toggle ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                                    </ToggleButton>
                                                </div>
                                            </div>
                                        ) : null}

                                        <div tw="p-2 w-full">
                                            {state.editAgent ? (
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

}

export default AgentsPage;
