import React, {useState} from 'react';
import {FaSyringe, FiSend,FaHandshake} from "react-icons/all";
import {useForm} from "../../Auth/useForm";
import {
    ContactWrapper,
    LeftContent,
    ContactBox,
    ContactForm, Recieved, Button, ExpenseContainer
} from './RequestBloodFormCSS';
import SelectComponent from "../../_shared/Query/SelectComponent";
import {bloodType, districts, turnIntoSelectFormat} from "../../sharedUtils/sharedData";
import axios from "axios";
import {toast} from "react-toastify";


function Contact() {
    const bloodTypeOptions = turnIntoSelectFormat(bloodType)
    const districtsOptions = turnIntoSelectFormat(districts)
    const [submitted, setSubmitted] = useState(false)
    const [id, setId] = useState(null)
    const [values, handleInput, handleInputForSelect] = useForm();
    const handleChangeForBlood = selectedOption => {
        handleInputForSelect("bloodType", selectedOption.value)
    };
    const handleChangeForDistrict = selectedOption => {
        handleInputForSelect("district", selectedOption.value)
    };
    const handleChangeForChecked = (e) => {
        handleInputForSelect("travel", !values.travel)

    };
    const requestForBlood = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };


        try {
            const res = await axios.post('/api/help/req', values, config);
            setSubmitted(true)
            setId(res.data.data._id)
        } catch (err) {
            toast.error(err?.response?.data?.error, {
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
    if (submitted) {
        return (
            <ContactWrapper>
            <ContactBox sent={submitted}><Recieved><FaHandshake style={{fontSize: '7em',marginTop:'200px'}}/>
                <p>আপনার আবেদনটি গ্রহণ করা হয়েছে</p></Recieved></ContactBox>
            </ContactWrapper>)
    }
    return (
        <ContactWrapper>
            <ContactBox>
                {!submitted && (<LeftContent>
                    <FaSyringe style={{fontSize: '7em'}}/>
                    <p> “নিজেকে কখনই দুর্বল বোধ করবেন না, </p>
                    <p> আপনি একটি জীবন বাঁচাতে পারেন  </p>
                    <p> শুধু রক্ত ​​দান করুন”</p>
                </LeftContent>)}

                {!submitted ? (
                    <ContactForm>
                        <label className="label__email">
                            
                        </label>
                        <label className="label__name">
                            <span>রোগীর নাম</span>
                            <input
                                onChange={handleInput}
                                name="name"
                                type="text"
                                required
                                value={values.name}
                                placeholder="রোগীর নাম টাইপ করুন"
                            />
                        </label>
                        <label className="label__phone">
                            <span>মোবাইল নাম্বার</span>
                            <input
                                onChange={handleInput}
                                value={values.phone}
                                name="phone"
                                type="text"
                                required
                                placeholder="ফোন নম্বর টাইপ করুন"
                            />
                        </label>
                        <label className="label__district">
                            <span>হাসপাতালের নাম ( optional )</span>
                            <input
                                onChange={handleInput}
                                value={values.hospital}
                                name="hospitalName"
                                type="text"
                                required
                                placeholder="
                                হাসপাতালের নাম টাইপ করুন"
                            />
                        </label>
                        <label className="label__bloodType">
                            <span>রক্তের গ্রুপ...</span>
                            <SelectComponent defaultLabel={"রক্তের গ্রুপ নির্বাচন করুন"} options={bloodTypeOptions}
                                             styles={customStyles} onChange={handleChangeForBlood}/>
                        </label>
                        <label className="label__hospital">
                            <span>উপজেলা অথবা ইউনিয়নের নাম...</span>
                            <SelectComponent defaultLabel={"উপজেলা অথবা ইউনিয়নের নাম নির্বাচন করুন "} options={districtsOptions}
                                             styles={customStyles} onChange={handleChangeForDistrict}/>
                        </label>
                        <label className="label__message">
                            <span>Message ( optional )</span>
                            <textarea
                                onChange={handleInput}
                                value={values.message}
                                name="message"
                                required
                                placeholder="পরিস্থিতি এবং সঠিক ঠিকানা বর্ণনা করুন...."
                            />
                        </label>
                        <ExpenseContainer><input type="checkbox" onChange={handleChangeForChecked}/><p>আপনি কি রক্ত দাতার যাতায়াত খরচ বহন করবেন ?</p></ExpenseContainer>

                        <Button
                            className="submit__btn"
                            as="button"
                            onClick={requestForBlood}
                        >
                            <FiSend/> Submit
                        </Button>

                    </ContactForm>) : (<div></div>)}
            </ContactBox>
        </ContactWrapper>
    );
}

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#fff",
        color: state.isSelected ? 'red' : 'blue',
        margin: "10px 0",
        height: "100%",
        minHeight: 35,
        borderColor: state.isFocused ? "#0C1A34" : "#0C1A34",
        "&:hover": {
            borderColor: state.isFocused ? "#0C1A34" : "#0C1A34"
        }
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        marginTop: 0,

    }),
    menuList: base => ({
        ...base,
        padding: 0,

    }),
    input: base => ({
        ...base,
        color: "#fff"
    }),
};
export default Contact;