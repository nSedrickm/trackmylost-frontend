import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import toast from 'react-hot-toast';
import { FiLoader, FiPlusCircle } from "react-icons/fi";
import { getItems } from "services/api.service";
import { Table } from 'rsuite';
import { getSavedItems, saveItems } from "services/storage.service";

const Heading = tw.h1`sm:text-3xl text-2xl font-black md:mb-2 text-primary-500`;
const Description = tw.p`mx-auto leading-relaxed text-base`;
const Header = tw.header`flex flex-col sm:flex-row justify-between w-full mb-4`;
const HeaderItem = tw.div`mb-3`;
const Button = tw.button`inline-flex items-center transition duration-300 bg-primary-500 hover:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium p-3 sm:p-6 no-underline appearance-none`;
const SearchButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Container = tw.div`container w-full py-12 mx-auto`;
const Row = tw.div`lg:w-1/2 md:w-2/3 mx-auto`;
const FormField = tw.div`p-2 w-full mb-4`;

const { Column, HeaderCell, Cell, Pagination } = Table;
const DataTable = tw(Table)`border border-primary-900`;
const TableHeader = tw(HeaderCell)`text-primary-500 font-medium`;
const TableCell = tw(Cell)``;

const ItemsPage = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [pagination, setPagination] = useState({
        displayLength: 10,
        page: 1
    })

    const { displayLength, page } = pagination;

    const handleGetItems = () => {
        setLoading(true);

        let items = getSavedItems();

        if (items) {
            setData(items);
            handlePaginate();
            setLoading(false);
        } else {
            getItems()
                .then(response => {
                    toast.success(`Fetch complete`);
                    setData(response.data);
                    saveItems(response.data);
                    handlePaginate();
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
    }

    const handleChangePage = (dataKey) => {
        console.log("changePage", dataKey, pagination)
        setPagination(pagination => {
            return {
                ...pagination,
                page: dataKey
            }
        });
        handlePaginate();
    }
    const handleChangeLength = (dataKey) => {
        console.log("changeLength", dataKey, pagination)
        setPagination(pagination => {
            return {
                ...pagination,
                page: 1,
                displayLength: dataKey
            }
        });
        handlePaginate();
    }

    const handlePaginate = () => {
        setLoading(true)
        // filter the data as array
        const start = displayLength * (page - 1);
        const end = start + displayLength;
        const input = Object.entries(data);
        let result, objectResult, arrayResult;

        result = input.filter((v, i) => i >= start && i < end);
        console.log(result);

        //convert the data back to object
        objectResult = Object.fromEntries(result);

        // convert the data to object array
        arrayResult = Object.values(objectResult);

        setTableData(arrayResult);
        setLoading(false);
    }

    useEffect(() => {
        handleGetItems();
    }, [pagination]);


    if (data.length) {
        return (
            <AnimationRevealPage>
                <Container>
                    <Header>
                        <HeaderItem>
                            <Heading>Registered Items</Heading>
                            <Description>All items you have registered</Description>
                        </HeaderItem>
                        <HeaderItem tw="inline-flex">
                            <Button><FiPlusCircle size={16} /> &nbsp; add</Button>
                            <Button onClick={() => handleGetItems()}>
                                <FiLoader size={16} /> &nbsp; refresh
                            </Button>
                        </HeaderItem>
                    </Header>

                    <DataTable
                        virtualized
                        height={420}
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

                    <Pagination
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
                            }
                        ]}
                        activePage={page}
                        displayLength={displayLength}
                        total={data.length}
                        onChangePage={(evt) => {
                            handleChangePage(evt)
                        }}
                        onChangeLength={(evt) => {
                            handleChangeLength(evt);
                        }}
                    />
                </Container>
            </AnimationRevealPage>
        )
    }

    return (
        <AnimationRevealPage>
            <Container tw="py-48">
                <Header tw="block text-center">
                    <Heading>No Items Found</Heading>
                    <Description>It seems no Items have been registered</Description>
                </Header>

                <Row>
                    <FormField tw="mt-8">
                        <SearchButton onClick={() => handleGetItems()}>
                            <FiLoader /> &nbsp; refresh
                        </SearchButton>
                    </FormField>
                </Row>
            </Container>
        </AnimationRevealPage>
    );
}
export default ItemsPage;