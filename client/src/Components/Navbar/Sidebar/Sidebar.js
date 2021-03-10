import React, {useContext} from 'react';
import {
    CloseIcon,
    Icon,
    SidebarContainer,
    SidebarWrapper,
    SidebarLink,
    SideBtnWrap,
    SidebarMenu
} from "./SidebarCss";
import AuthContext from "../../../Context/auth/authContext";
import {FaUser} from "react-icons/all";
import { NavBtnLink, NavBtnLinkDiv} from "../NavbarElements";
import {toast} from "react-toastify";

const Sidebar = ({isOpen,toggle}) => {
    const authContext=useContext(AuthContext);
    const {isAuthenticated,logout}=authContext;
    const logMeOut=()=>{
        toast.success("You have been logged out", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        logout()
    }
    return (
        <SidebarContainer isOpen={isOpen} >
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper >
                <SidebarMenu>
                    <SidebarLink to='/'> রক্তের আবেদন তালিকা</SidebarLink>
                    <SidebarLink to='/donors'>রক্ত দাতাদের তালিকা</SidebarLink>
                    <SidebarLink to='/request'>রক্তের জন্য আবেদন করুন</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap style={{marginRight:15}}>
                    {isAuthenticated ? (<NavBtnLinkDiv onClick={logMeOut}>Logout</NavBtnLinkDiv>) :
                        (<NavBtnLink to='/login'><FaUser style={{marginRight:10}} />লগইন করুন / নতুন একাউন্ট তৈরি করুন</NavBtnLink>)}
                    {isAuthenticated&&<NavBtnLink to='/requests' margin={true} >My Requests</NavBtnLink>}

                </SideBtnWrap>

            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default Sidebar;