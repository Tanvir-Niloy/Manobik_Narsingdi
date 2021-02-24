import React from 'react';
import {ProfilePageCSS} from "./ProfilePageCss";
import {useParams} from "react-router";
import axios from "axios";
import {useQuery} from "react-query";
import {SpinnerInfinity} from "spinners-react";
import {CentralizeDiv} from "../../_shared/CentralizeDiv";
import {getSizedImageURL} from "../../sharedUtils/utils";

const UserPage = () => {

    const {id}=useParams()
    const fetchDonors = async () => {
        const response = await axios(
            `/api/donors/${id}`
        );
        return response.data.data;
    }
    const { status, data } = useQuery(id, fetchDonors, {
        refetchAllOnWindowFocus: false
    });

    if(status==='loading'){
        return (
            <CentralizeDiv>
                <SpinnerInfinity size={150} thickness={100} speed={300} color="#D31027" secondaryColor="rgba(0, 0, 0, 0.44)" />
            </CentralizeDiv>
        )
    }

    return (
        <ProfilePageCSS>
            <div className="wrapper">
                <div className="left">
                    <img src={getSizedImageURL(data?.image,200,200)}
                         alt="user" width="100"/>
                        <h4>{data.name}
                        </h4>
                        <h3>{data.bloodType}</h3>
                </div>
                <div className="right">
                    <div className="info">
                        <h3>Information</h3>
                        <div className="info_data">
                            <div className="data">
                                <h4>Email</h4>
                                <p>{data.email}</p>
                            </div>
                            <div className="data">
                                <h4>Phone</h4>
                                <p>+880{data.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="More Info">
                        <div className="projects_data">
                            <div className="data">
                                <h4>Upazila Or Union Name</h4>
                                <p>{data.district}</p>
                            </div>
                            <div className="data">
                                <h4>User creation Date</h4>
                                <p>{data.createdAt.slice(0,10)}</p>
                            </div>
                        </div>
                    </div>

                        {/* <div className={"offer-help-container"}></div> */}

                </div>
            </div>
        </ProfilePageCSS>

    );
};

export default UserPage;