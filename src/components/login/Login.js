import React, { useContext, useState } from 'react';
import './login.css';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from './Assets/logo.png';
import { child, get, getDatabase, push, ref, set } from 'firebase/database';
import app from '../../Firebase'

function Login() {
    const database = getDatabase(app);
    var newuserid = "";
    var olduserid = "";
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('in');
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        
        // Declare validationErrors here
        const validationErrors = {};

        if (!value.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
            validationErrors.email = 'Please enter a valid email address';
        } else {
            setEmailError('');
            authContext.setemail(value);
        }

        // Set the errors state
        setErrors(validationErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!authContext.Name || !authContext.Name.trim()) {
            validationErrors.name = 'Name is required';
        }
        if (!authContext.designation || !authContext.designation.trim()) {
            validationErrors.designation = 'Designation is required';
        }
        if (!authContext.companyname || !authContext.companyname.trim()) {
            validationErrors.company = 'Company Name is required';
        }
        if (!authContext.phone || !authContext.phone.trim()) {
            validationErrors.phone = 'Phone is required';
        }
        if (!email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please check the form for errors.');
        } else {

            get(child(ref(database), `users/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((user)=>{
                        newuserid = user.key;
                        if(user.val().Email == authContext.email){
                            console.log(user.val().Email);
                            console.log(authContext.email);
                          olduserid = user.key;
                        }
                    })
                    if(olduserid!=""){
                        console.log(olduserid);
                        set(ref(database, 'users/' + olduserid), {
                            Email: authContext.email,
                            Name: authContext.Name,
                            Designation: authContext.designation,
                            Company: authContext.companyname,
                            DP: authContext.dp,
                            Phone: authContext.phone,
                          });
                    }
                    else{
                        newuserid = Number(newuserid)+1;
                        console.log(newuserid);
                        set(ref(database, 'users/' + newuserid), {
                            Email: authContext.email,
                            Name: authContext.Name,
                            Designation: authContext.designation,
                            Company: authContext.companyname,
                            DP: authContext.dp,
                            Phone: authContext.phone,
                          });
                    }
                } else {
                  console.log("No data available");
                  set(ref(database, 'users/' + "1"), {
                    Email: authContext.email,
                    Name: authContext.Name,
                    Designation: authContext.designation,
                    Company: authContext.companyname,
                    DP: authContext.dp,
                    Phone: authContext.phone,
                  });
                }
              }).catch((error) => {
                console.error(error);
              });

            toast.success('Form submitted successfully!');
            setTimeout(() => {
                navigate('/ProudMemberCard');
            }, 3000);
        }
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            authContext.setdp(imageUrl);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='loginformcontainer1 container-fluid'>
                <div className='row'>
                    <div className='col-lg-6 col-md-4'>
                        <img src={logo} alt='Logo' className='logo_img col-6 col-md-12 col-lg-4' />
                    </div>
                    <div className='col-lg-5 col-md-10'>
                        <div className='card_design card_design_2 container'>
                            <form onSubmit={handleSubmit}>
                                <h3 className='h1login'>Get Started with WoW HR</h3>

                                <div data-mdb-input-init className="form-outline mb-2">
                                    <label>Email:</label>
                                    <input
                                        className='email-style1'
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="off"
                                        value={email}
                                        onChange={handleEmailInputChange}
                                    />
                                    {errors.email && <span className="error">{errors.email}</span>}
                                </div>

                                <div data-mdb-input-init className="form-outline mb-2">
                                    <label>Name:</label>
                                    <input
                                        className='name-style'
                                        type="text"
                                        name="name"
                                        placeholder="Enter your Name"
                                        autoComplete="off"
                                        onChange={(e) => authContext.setName(e.target.value)}
                                    />
                                    {errors.name && <span className="error">{errors.name}</span>}
                                </div>

                                <div data-mdb-input-init className="form-outline mb-2">
                                    <label>Designation:</label>
                                    <input
                                        className='designation-style'
                                        type="text"
                                        name="designation"
                                        placeholder="Enter your Designation"
                                        autoComplete="off"
                                        onChange={(e) => authContext.setdesignation(e.target.value)}
                                    />
                                    {errors.designation && <span className="error">{errors.designation}</span>}
                                </div>


                                <div data-mdb-input-init className="form-outline mb-2">
                                    <label>Company Name:</label>
                                    <input
                                        className='designation-style'
                                        type="text"
                                        name="Company name"
                                        placeholder="Enter your Company Name"
                                        autoComplete="off"
                                        onChange={(e) => authContext.setcompanyname(e.target.value)}
                                    />
                                    {errors.company && <span className="error">{errors.company}</span>}
                                </div>

                                <div data-mdb-input-init className="form-outline mb-2 width_style">
                                    <label>Phone Number:</label>
                                    <PhoneInput
                                        className="phone-input"
                                        country={phoneNumber}
                                        placeholder="Enter phone number"
                                        onChange={(value) => authContext.setphone(value)}
                                        countryCodeEditable={false}
                                        inputProps={{ className: 'phone-input-input' }}
                                        dropdownClass="phone-input-country-select"
                                    />
                                    {errors.phone && <span className="error">{errors.phone}</span>}
                                </div>

                                <div data-mdb-input-init className="form-outline mb-2">
                                    <label>Upload Image:</label>
                                    <input
                                        id="imageInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                    <div
                                        className="image-drop"
                                        onClick={() => document.getElementById('imageInput').click()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            handleImageChange(e);
                                        }}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        {authContext.dp ? (
                                            <p className='image_text'>Image uploaded</p>
                                        ) : (
                                            <p className='image_text'>Upload image here</p>
                                        )}
                                    </div>
                                </div>

                                <button type="submit" className="submit mb-1">Get Started</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;