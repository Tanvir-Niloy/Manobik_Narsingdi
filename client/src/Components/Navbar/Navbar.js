import React,{useContext} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink, NavBtnLinkDiv
} from './NavbarElements';
import {FaUser} from "react-icons/all";
import logo from './logo.png'
import AuthContext from "../../Context/auth/authContext";
import {toast} from "react-toastify";

const Navbar = ({toggle}) => {
    const authContext=useContext(AuthContext);
    const {isAuthenticated,logout}=authContext;
    const logMeOut=()=>{
        toast.success("You have been logged out", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        logout()
    }
    return (
        <>
            <Nav>
                <NavLink to='/' >
                    <img style={{width:100,height:80}} src={logo} alt='logo'/>
                    <h3 style={{marginLeft:10}}>মানবিক নরসিংদী</h3>
                </NavLink>
                <Bars onClick={toggle}/>
                <NavMenu>
                    <NavLink to='/' >
                    রক্তের আবেদন তালিকা
                    </NavLink>
                    <NavLink to='/donors' activeStyle>                        
                    রক্ত দাতাদের তালিকা
                    </NavLink>
                    <NavLink to='/request' activeStyle>
                    রক্তের জন্য আবেদন করুন
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    {isAuthenticated ? (<NavBtnLinkDiv onClick={logMeOut}>Logout</NavBtnLinkDiv>) :
                        (<NavBtnLink to='/login'><FaUser style={{marginRight:10,fontSize:18}}/>লগইন করুন / নতুন একাউন্ট তৈরি করুন</NavBtnLink>)}
                    {isAuthenticated&&<NavBtnLink to='/requests'>My Requests</NavBtnLink>}
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
