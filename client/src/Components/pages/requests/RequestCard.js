import React from 'react';
import {CardContainer,Flex} from "./RequestCardCSS";
import {BloodType} from '../donors/DonorItemCSS'
import {FaHospital,FaLocationArrow,FaMoneyBill,FaMailBulk,FaPhoneAlt} from "react-icons/all";
import {Link} from "react-router-dom";
import {getSizedImageURL} from "../../sharedUtils/utils";

const RequestCard = ({donor,ref}) => {
    return (

        <CardContainer ref={ref}>
            <BloodType position={'15%'} style={{marginTop:5}}>{donor?.bloodType}</BloodType>
                <img
                    src={getSizedImageURL(donor?.image,200,200)}
                    alt="Person" className="card__image"/>
                    <p className="card__name">{donor.name}</p>
                    <Flex justify={"space-between"}>
                        <div className="grid-child-posts">
                            <FaHospital/> {donor.hospitalName}
                        </div>
                        <div className="grid-child-posts">
                            <FaLocationArrow/> {donor.district.charAt(0).toUpperCase() + donor.district.slice(1)}
                        </div>
                    </Flex>

                        <p className="card__description">
                            <FaMoneyBill/> They will  cover your travel and required expenses
                        </p>
                        <p className="card__description">
                            <FaMailBulk  style={{marginRight:10}}/>{donor.email}
                        </p>



                    <button className="btn-request draw-border">{donor.phone}</button>
                    <Link to={`/help/${donor.id}`}>
                    <button className="btn-request draw-border">More Details</button>
                    </Link>

        </CardContainer>
    );
};

export default RequestCard;