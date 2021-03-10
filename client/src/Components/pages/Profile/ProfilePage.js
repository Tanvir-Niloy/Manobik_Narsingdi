import React, {useContext,useState} from 'react';
import {ProfilePageCSS} from "./ProfilePageCss";
import {useParams} from "react-router";
import axios from "axios";
import {useQuery} from "react-query";
import {SpinnerInfinity} from "spinners-react";
import {CentralizeDiv} from "../../_shared/CentralizeDiv";
import {toast} from "react-toastify";
import {FaHandsHelping} from "react-icons/all";
import AuthContext from "../../../Context/auth/authContext";
import 'react-medium-image-zoom/dist/styles.css'
import ImageModal from "../../_shared/ImageModal";

const ProfilePage = () => {
    const [open,setOpen]=useState(false)
    const authContext=useContext(AuthContext);
    const {isAuthenticated}=authContext;
    const[error,setError]=useState()
    const {id}=useParams()
    const fetchDonors = async () => {
        const response = await axios(
            `/api/help/${id}`
        );
        return response.data.data;
    }
    const { status, data } = useQuery(id, fetchDonors, {
        refetchAllOnWindowFocus: false
    });
    const offerHelp=async ()=>{
        try {
             await axios.post(`/api/auth/offer/${data._id}`);
        }catch (e){
            setError(e.response.data.error)
        }
    }
    const onClick=async ()=>{
        if(isAuthenticated){
            await offerHelp()
            if(!error){
                toast.success("You have offered the help from your part!Thank You!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.warn(error, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        }
        else {
            toast.warn("You must be logged in to offer help. Why not signup?", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    if(status==='loading'){
        return (
            <CentralizeDiv>
                <SpinnerInfinity size={150} thickness={100} speed={200} color="#D31027" secondaryColor="rgba(0, 0, 0, 0.44)" />
            </CentralizeDiv>
        )
    }

    return (
        <ProfilePageCSS>
            <ImageModal open={open} imageLink='https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png' setOpen={setOpen}/>
            <div className="wrapper" >
                <div className="left">
                    <img onClick={()=>{setOpen(true)}} src='https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png'
                         alt="user" width="100"/>
                        <h4>{data.name}
                        </h4>
                        <h3>{data.bloodType}</h3>
                </div>
                <div className="right">
                    <div className="info">
                        <h3>অনুরোধকারীর তথ্য</h3>
                        <div className="info_data">
                            <div className="data">
                                <h5>মোবাইল নাম্বার</h5>
                                <p>+88{data.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="More details">
                        <h4>মেসেজ</h4>
                        <div className="data">
                        <p>{data.message?data.message:'তথ্য দেওয়া হয়নি'}</p>
                        </div>
                        <div className="projects_data">

                        </div>
                    </div>
                    <div className="More Info">
                        <div className="projects_data">
                            <div className="data">
                                <h5>হসপিটালের নাম</h5>
                                <p>{data.hospitalName?data.hospitalName:'তথ্য দেওয়া হয়নি'}</p>
                            </div>
                            <div className="data">
                                <h5>যাতায়াত খরচ</h5>
                                <p>{data.travel?'রক্তের জন্য আবেদনকারী যাতায়াত খরচ বহন করবেন':'রক্তের জন্য আবেদনকারী যাতায়াত খরচ বহন করবেন না'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="More Info">
                        <div className="projects_data">
                            <div className="data">
                                <h5>উপজেলা অথবা ইউনিয়নের নাম</h5>
                                <p>{data.district}</p>
                            </div>
                            <div className="data">
                                <h5>আবেদনের তারিখ</h5>
                                <p>{data.createdAt.slice(0,10)}</p>
                            </div>
                        </div>
                    </div>
                        <div className={"offer-help-container"} onClick={onClick}><FaHandsHelping size={"3em"} style={{marginRight:10}}></FaHandsHelping> সহায়তা পাঠান</div>

                </div>
            </div>
        </ProfilePageCSS>

    );
};

export default ProfilePage;