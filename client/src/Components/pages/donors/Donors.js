import React, {useState,useEffect} from 'react';
import {Container, Row, Col} from 'react-grid-system';
import DonorItem from "./DonorItem";
import {bloodType, districts, turnIntoSelectFormat} from "../../sharedUtils/sharedData";
import SelectComponent from "../../_shared/Query/SelectComponent";
import EmptyMessageBox from "../../_shared/EmptyMessageBox";
import {CentralizeDiv} from "../../_shared/CentralizeDiv";
import {SpinnerInfinity} from "spinners-react";
import useInfiniteQuery from '../../sharedUtils/UseInfiniteQuery'
import {useInView} from "react-hook-inview";
const Donors = () => {
    const [district,setDistrict]=useState(null)
    const [blood,setBlood]=useState(null)
    const [ref, isVisible] = useInView({
        threshold: 1,
    })

    const [pageNumber, setPageNumber] = useState(1)

    const {
        data,
        hasMore,
        loading,
    } = useInfiniteQuery( pageNumber,district,blood,"donors")
    useEffect(()=>{
        if(isVisible && hasMore){
            setPageNumber(pageNumber=>pageNumber+1)
        }
    },[isVisible])
    const districtOptions=turnIntoSelectFormat(districts)
    const bloodOptions=turnIntoSelectFormat(bloodType)
    const handleChangeForDistrict = selectedOption => {
        setPageNumber(1)
        setDistrict(selectedOption.value)
    };
    const handleChangeForBlood = selectedOption => {
        setPageNumber(1)
        setBlood(encodeURIComponent(selectedOption.value))
    };
    return (
        <Container>
            <Row style={{marginTop:40}}>
                <Col lg={6} md={6} sm={12}>
                    <SelectComponent options={bloodOptions} isMulti={false}  onChange={handleChangeForBlood} defaultLabel={"রক্তের গ্রুপ অনুসারে খুঁজুন...."}/>
                </Col>
                <Col lg={6} md={6} sm={12}>
                    <SelectComponent options={districtOptions} isMulti={false}  onChange={handleChangeForDistrict} defaultLabel={"উপজেলা বা ইউনিয়নের নাম অনুসারে খুঁজুন..."}/>
                </Col>
            </Row>
            <EmptyMessageBox message={"আপনার দেওয়া তথ্য অনুযায়ী কাউকে পাওয়া যায়নি.... আপনার রক্ত ​​দিয়ে অন্যের জীবন বাঁচান"} toBeShown={data?.length===0}/>
            <Row style={{marginTop:40}}>
                {data?.map((donor,index)=> {
                    if (data.length === index + 1) {
                        return <Col lg={4} md={6} sm={12} ref={ref}><DonorItem donor={donor}  /><div ref={ref}></div></Col>
                    }
                    else {
                        return <Col lg={4} md={6} sm={12}><DonorItem donor={donor}/></Col>
                    }
                })}
            </Row>
            {loading&&(<CentralizeDiv>
                <SpinnerInfinity size={150} thickness={100} speed={300} color="#D31027" secondaryColor="rgba(0, 0, 0, 0.44)" />
            </CentralizeDiv>)}

        </Container>
    );
};

export default Donors;