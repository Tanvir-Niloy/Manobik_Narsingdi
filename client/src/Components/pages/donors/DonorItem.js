import React from 'react';
import {Container,CoverPhoto,Profile,Button,BloodType} from './DonorItemCSS'
import {Link} from "react-router-dom";
import {getSizedImageURL} from "../../sharedUtils/utils";
const DonorItem = ({donor}) => {
    return (
        <Container>
            <BloodType style={{marginTop:10}}>{donor.bloodType}</BloodType>
            <CoverPhoto><Profile
                src={getSizedImageURL(donor?.image,200,200)}/></CoverPhoto>
            <div className="profile-name">{donor.name}</div>
            <p className="about">উপজেলা অথবা ইউনিয়নের নাম:  {donor.district}</p>
            <Button>+880{donor.phone}</Button>
            <Link to={`/user/${donor._id}`}><Button>সম্পুর্ন তথ্য দেখুন</Button> </Link>
        </Container>
    );
};

export default DonorItem;