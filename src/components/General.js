import tw from "twin.macro";
import styled from "styled-components";
import { BsCreditCard, BsPersonPlus } from "react-icons/bs";
import { FaPassport, FaIdCard } from "react-icons/fa";
import { AiOutlineIdcard } from "react-icons/ai";
import { Table, Pagination as DefaultPagination, Modal, Drawer } from 'rsuite';
import { Link } from "react-router-dom";

export const Heading = tw.h1`text-2.5xl sm:text-4xl font-black md:mb-2 text-primary-500`;
export const Description = tw.p`mx-auto leading-relaxed text-base`;
export const Header = tw.header`flex flex-col sm:flex-row justify-between w-full mt-8 mb-4 bg-white`;
export const HeaderItem = tw.div`mb-3`;
export const Button = tw.button`inline-flex flex-auto items-center transition duration-300 bg-primary-500 hover:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium p-3 sm:p-6 no-underline appearance-none`;
export const SearchButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
export const Container = tw.div`container w-full mx-auto`;
export const Row = tw.div`lg:w-1/2 md:w-2/3 mx-auto`;
export const FormField = tw.div`p-2 w-full mb-4`;
export const Card = tw.div`mt-6 h-full flex items-center border-gray-200 border p-4 shadow-lg rounded-xl bg-white`;
export const DriverLicenseIcon = tw(AiOutlineIdcard)`text-primary-500  w-12 h-12 mr-10`;
export const CreditCardIcon = tw(BsCreditCard)`text-primary-500  w-12 h-12 mr-10`;
export const IdCardIcon = tw(FaIdCard)`text-primary-500  w-12 h-12 mr-10`;
export const PassportIcon = tw(FaPassport)`text-primary-500  w-12 h-12 mr-10`;
export const UserIcon = tw(BsPersonPlus)`text-primary-500  w-12 h-12 mr-4 md:mr-12`;
export const CardItem = tw.div`flex-grow`;
export const CardTitle = tw.span`text-gray-900 font-medium`;
export const CardInfo = tw.p`text-gray-500`;
export const CardButton = tw(Button)`font-normal mt-2 p-1 px-2 rounded-2xl`;
export const ToggleButton = tw.span`absolute inset-y-0 right-5 flex items-center  cursor-pointer`;
export const SubmitButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
export const Input = tw.input`w-full bg-opacity-50 rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out rounded-4xl placeholder-gray-400`;
export const Label = tw.label`leading-7 text-sm text-gray-600 block mb-2`;
export const Form = tw.form`mx-auto`;
export const Select = tw.select`block appearance-none w-full bg-opacity-50 border border-gray-300 text-gray-600 py-3 px-4 pr-8 rounded-4xl leading-tight focus:outline-none focus:bg-white focus:border-primary-500`;
export const SelectToggle = tw.div`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`;
export const ItemDetails = tw.p`text-base font-medium`;
export const Section = tw.section`text-gray-600 relative`;
export const SearchHeader = tw.header`flex flex-col text-center w-full mb-4`;
export const ItemGrid = tw.div`grid md:grid-cols-2 gap-4 md:mx-20`;

export const DetailsModal = styled(Modal)`
    width: 20rem;
    top: 10%;
`;

export const { Column, HeaderCell, Cell, Pagination } = Table;
export const DataTable = styled(Table)`
    .rs-table-cell-header .rs-table-cell-content {
        ${tw`text-sm bg-primary-500 hocus:bg-primary-700`}
    }
`;
export const TableHeader = tw(HeaderCell)`text-white font-medium`;
export const TableCell = tw(Cell)``;
export const TablePagination = styled(Pagination)`
    ${tw`p-2`}
    .rs-picker-toggle-value {
        ${tw`text-primary-500!`}
    }
`;
export const TableAction = tw.span`cursor-pointer`;
export const MobilePagination = tw(DefaultPagination)``;

// Navs
export const MainHeader = tw.header`flex-1 justify-between items-center mx-auto bg-primary-500 shadow-lg fixed z-50 inset-x-0`;
export const NavContainer = tw.div`inline-flex`;
export const NavDrawer = styled(Drawer)`
.rs-drawer-content {
  ${tw`bg-primary-500 left-10`}
}
.rs-drawer-header .rs-drawer-title, .rs-drawer-header-close {
  ${tw`text-white right-10`}
}
`;
export const NavButton = tw.button`h-20 inline-flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline  appearance-none`;
export const NavLink = tw(Link)`
    h-20 flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline hocus:no-underline  appearance-none
`;
export const MobileNavLink = tw(Link)`
    h-20 flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none text-white hocus:text-white font-medium px-6 py-3 no-underline hocus:no-underline appearance-none
`;
export const Logo = tw.img`h-20 py-2 px-4 bg-white`;
export const DesktopNav = tw.nav`hidden lg:flex flex-1 justify-between items-center`;
export const MobileNav = tw.nav`lg:hidden flex flex-1 items-center justify-between`;
export const MobileNavButton = tw.button`h-20 w-full flex items-center transition duration-300 bg-primary-500 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline appearance-none`;
export const NavToggle = tw(NavButton)`lg:hidden z-50 focus:outline-none focus:bg-primary-500 hocus:text-white transition duration-300`;
export const DrawerContainer = tw.div`mt-6 bg-primary-500 -mb-48`;
