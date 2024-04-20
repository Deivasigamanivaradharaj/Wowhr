// import React, { createContext, useState } from 'react'

// const AuthContext = createContext({Name:"", designation:"", Linkedin:"", dp:"", setName:undefined, setdesignation:undefined, setlinkedin:undefined, setdp:undefined})

// export function AuthContextProvider(props) {

//     let [Name , setName] = useState("");
//     let [designation , setdesignation] = useState("");
//     let [Linkedin , setlinkedin] = useState("");
//     const [dp , setdp] = useState();

//   return (
//     <AuthContext.Provider value={{Name:Name, designation:designation, Linkedin:Linkedin, dp:dp, setName:setName, setdesignation:setdesignation, setlinkedin:setlinkedin, setdp:setdp}}>
//         {props.children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthContext



import React, { createContext, useState } from 'react';

const AuthContext = createContext({
  email:"",
  phone:"",
  Name: "",
  designation: "",
  companyname:"",
  Linkedin: "",
  dp: "",
  setemail:undefined,
  setphone:undefined,
  setName: undefined,
  setdesignation: undefined,
  setcompanyname:undefined,
  setLinkedin: undefined, // <-- Updated name to setLinkedin
  setdp: undefined
});

export function AuthContextProvider(props) {
  const [Name, setName] = useState("");
  const [email, setemail] = useState("");
   const [phone, setphone] = useState("");
  const [designation, setdesignation] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [Linkedin, setLinkedin] = useState(""); // <-- Updated name to setLinkedin
  const [dp, setdp] = useState();

  return (
    <AuthContext.Provider value={{
      email:email,
      phone:phone,
      Name: Name,
      designation: designation,
      companyname:companyname,
      Linkedin: Linkedin,
      dp: dp,
      setemail:setemail,
      setphone,setphone,
      setName: setName,
      setdesignation: setdesignation,
      setcompanyname:setcompanyname,
      setLinkedin: setLinkedin, // <-- Updated name to setLinkedin
      setdp: setdp
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
