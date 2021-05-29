import React, { useState, useEffect, useReducer } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import AnimateLoader from "components/Loaders/AnimateLoader";
import toast from 'react-hot-toast';
import { FiFileText, FiLoader, FiPlusCircle } from "react-icons/fi";
import { getItems } from "services/api.service";
import { Table } from 'rsuite';
import { Pagination as MobilePagination } from 'rsuite';
import { getSavedItems, saveItems, clearItems } from "services/storage.service";

const Heading = tw.h1`sm:text-3xl text-2xl font-black md:mb-2 text-primary-500`;
const Description = tw.p`mx-auto leading-relaxed text-base`;
const Header = tw.header`flex flex-col sm:flex-row justify-between w-full mb-4`;
const HeaderItem = tw.div`mb-3`;
const Button = tw.button`inline-flex flex-auto items-center transition duration-300 bg-primary-500 hover:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium p-3 sm:p-6 no-underline appearance-none`;
const SearchButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Container = tw.div`container w-full mx-auto`;
const Row = tw.div`lg:w-1/2 md:w-2/3 mx-auto`;
const FormField = tw.div`p-2 w-full mb-4`;
const CardIcon = tw(FiFileText)`text-primary-500 object-cover object-center w-12 h-12 sm:w-14 sm:h-14 mr-4`;
const Card = tw.div`mt-6 h-full flex items-center border-gray-200 border p-4 shadow-md rounded-lg`;
const CardBody = tw.div`flex-grow`;
const CardTitle = tw.span`text-gray-900 font-medium`;
const CardInfo = tw.p`text-gray-500`;

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
        default:
            throw new Error();
    }
}

const ItemsPage = () => {

    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useReducer(reducer, {
        data: [],
        tableData: [],
        displayLength: 10,
        page: 1
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
            getItems()
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
    }, []);

    const handleRefresh = () => {
        clearItems();
        setLoading(true);
        getItems()
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

    if (data.length) {
        return (
            <AnimationRevealPage>

                <Header>
                    <HeaderItem tw="text-center md:text-left mb-8 sm:mb-0">
                        <Heading>Registered Items</Heading>
                        <Description>All items you have registered</Description>
                    </HeaderItem>
                    <HeaderItem tw="space-x-2 sm:space-x-0 inline-flex">
                        <Button><FiPlusCircle size={16} /> &nbsp; add</Button>
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
                        onRowClick={data => {
                            console.log(data);
                        }}
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
                                    function handleAction() {
                                        alert(`id:${rowData.id}`);
                                    }
                                    return (
                                        <span>
                                            <a href="#Sd" onClick={handleAction}> Edit </a> |{' '}
                                            <a href="#sdf" onClick={handleAction}> Remove </a>
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
                                {tableData.map((item) => (
                                    <Card key={item.id}>
                                        <CardIcon />
                                        <CardBody>
                                            <CardTitle>{item.first_name} &nbsp; {item.other_names}</CardTitle>
                                            <CardInfo>{item.document_type}</CardInfo>
                                        </CardBody>
                                    </Card>
                                ))}
                                <FormField tw="mt-8">
                                    <SearchButton onClick={() => handleRefresh()}>
                                        <FiLoader /> &nbsp; refresh
                                    </SearchButton>
                                </FormField>
                            </>
                        )
                        }
                    </Row>
                </Container>
            </AnimationRevealPage>
        )
    }

    return (
        <AnimationRevealPage>
            <Container tw="py-24">
                <Header tw="block text-center">
                    <Heading>No Items Found</Heading>
                    <Description>It seems no Items have been registered</Description>
                </Header>

                <Row>
                    <FormField tw="mt-8">
                        <SearchButton onClick={() => handleRefresh()}>
                            <FiLoader /> &nbsp; refresh
                        </SearchButton>
                    </FormField>
                </Row>
            </Container>
        </AnimationRevealPage>
    );
}
export default ItemsPage;