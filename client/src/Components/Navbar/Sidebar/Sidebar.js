import React, {useContext} from 'react';
import {
    CloseIcon,
    Icon,
    SidebarContainer,
    SidebarWrapper,
    SidebarLink,
    SidebarRoute,
    SideBtnWrap,
    SidebarMenu
} from "./SidebarCss";
import AuthContext from "../../../Context/auth/authContext";
import {FaUser} from "react-icons/all";
import {NavBtn, NavBtnLink, NavBtnLinkDiv} from "../NavbarElements";
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
                    <SidebarLink to='/'>Requests</SidebarLink>
                    <SidebarLink to='/donors'>Donors</SidebarLink>
                    <SidebarLink to='/request'>Request For a Blood</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap style={{marginRight:15}}>
                    {isAuthenticated ? (<NavBtnLinkDiv onClick={logMeOut}>Logout</NavBtnLinkDiv>) :
                        (<NavBtnLink to='/login'><FaUser style={{marginRight:10}} />Sign In / Signup</NavBtnLink>)}
                    {isAuthenticated&&<NavBtnLink to='/requests' margin={true} >My Requests</NavBtnLink>}

                </SideBtnWrap>

            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default Sidebar;