import React from 'react';
import './CardCSS'
import {Link} from "react-router-dom";
import {CardContainer} from "./CardCSS";
import {FaTimesCircle} from "react-icons/all";

const DonorCard = ({request,deleteRequest,donor}) => {
    return (
        <CardContainer>
            {!donor&&(<FaTimesCircle  onClick={()=>{deleteRequest(request.id)}} className={"X"}/>)}

            <div className="content-container">
                <p className="donor__title">{request.name}</p>
                <p className="content">
                উপজেলা অথবা ইউনিয়নের নাম: {request.district}
                </p>
                <p className="content">
                    {!donor?`Hospital Name:${request.hospitalName}`:`মোবাইল নাম্বার :${request.phone}`}

                </p>
            </div>
            <div className="content-container">
                <p className="donor__title">রক্তের গ্রুপ:{request.bloodType}</p>

            </div>
            <div className="content-container">
                {!donor&&<Link to={`/requests/${request._id}`}><button id="accept" type="button">Available Donors</button></Link>}
                <Link to={donor?`/user/${request._id}`:`/help/${request.id}`}> <button id="cancel" type="button">More Info</button> </Link>

            </div>

        </CardContainer>
    );
};

export default DonorCard;