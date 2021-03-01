import React,{useContext,useEffect} from 'react';
import {useForm} from "./useForm";
import {districts,bloodType,turnIntoSelectFormat} from "../sharedUtils/sharedData";
import SelectComponent from "../_shared/Query/SelectComponent";
import {QueryContainer} from "../_shared/Query/QueryFormCss";
import AuthContext from "../../Context/auth/authContext";
import {FaLock} from "react-icons/all";
import {FaPhone} from "react-icons/all";
import {FaUser} from "react-icons/all";
import {FaEnvelope} from "react-icons/all";
const Signup = (props) => {
    const authContext=useContext(AuthContext);
    const {register,isAuthenticated}=authContext;
    const districtOptions=turnIntoSelectFormat(districts)
    const bloodOptions=turnIntoSelectFormat(bloodType)
    const [valuesForSignup,handleChangeForSignup,handleChangeManual]=useForm()
    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/')
        }
    },[])
    const onRegister=(e)=>{
        e.preventDefault()
        register(valuesForSignup)
    }

    const handleChangeForBlood = selectedOption => {
        handleChangeManual("bloodType",selectedOption.value)
    };
    const handleChangeForDistrict = selectedOption => {
        handleChangeManual("district",selectedOption.value)
    };

    return (
        <form autocomplete="off" className="sign-up-form" onSubmit={onRegister} >
            <h2 className="title">Sign up</h2>
            <div className="input-field">
                <i><FaPhone/></i>
                <input id="phone" name="phone" type="phone" placeholder="Phone Number" autocomplete="off" value={valuesForSignup.phone} onChange={handleChangeForSignup}/>
            </div>
            <div className="input-field">
                <i><FaUser/></i>
                <input id="name" name="name" autocomplete="off" type="text" placeholder="Full Name" value={valuesForSignup.name} onChange={handleChangeForSignup}/>
            </div>
            <div className="input-field">
                <i><FaEnvelope/></i>
                <input name="email" autocomplete="off" type="email" placeholder="Email" value={valuesForSignup.email} onChange={handleChangeForSignup} />
            </div>

            <div className="input-field">
                <i><FaLock/></i>
                <input name="password" autocomplete="off"  type="password" placeholder="Password" name="password" value={valuesForSignup.password} onChange={handleChangeForSignup}/>
            </div>

            <div className="queryBox">
                <QueryContainer>
                <SelectComponent options={bloodOptions} isMulti={false}  onChange={handleChangeForBlood} defaultLabel={"Choose your blood type"}/>
                <SelectComponent options={districtOptions} isMulti={false}  onChange={handleChangeForDistrict} defaultLabel={"Choose  Upozila Or Union"}/>
                </QueryContainer>

            </div>
            <p style={{marginTop:20,marginBottom:20}} className="signup-agreement">By signing up,You're accepting to show your contact information and blood group to people in need</p>
            <input type="submit" className="btn" value="Sign up"  />
        </form>
    );
};

export default Signup;