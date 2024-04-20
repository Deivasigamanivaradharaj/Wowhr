import React, { useState } from 'react'
import { child, get, getDatabase, push, ref, set } from 'firebase/database';
import app from '../../Firebase'
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

function Admin() {

    const database = getDatabase(app);
    let [users, setusers] = useState([]);

    var tableBody = document.querySelector('#table tbody');

    function fetch(){
        get(child(ref(database), `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                let userlist = [];
                for(let key in snapshot.val())
                {
                    userlist.push({...snapshot.val()[key], id:key}) 
                }
                setusers(userlist)
            }
          }).catch((error) => {
            console.error(error);
          });
    }

  return (
    <div style={{width:"100%",height:"100vh"}}>
        <div style={{display:"flex", width:"100%",justifyContent:"center",alignItems:"center", height:"60px"}}>
        <button style={{border:"none",color:"white",background:"blue",borderRadius:"10px",padding:"10px 20px"}} onClick={(e)=>{
            e.preventDefault();
            fetch();
        }}>fetch</button>
        </div>
        <table style={{width:"100%",textAlign:"center"}}>
                <thead style={{background:"linen",padding:"30px"}}>
                <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Designation</th>
                <th>Company</th>
                <th>Linkedin</th>
              </tr>
                </thead>
              <tbody>
              {users.map((user) => {
                return <tr key={user.id}>
                <td><img style={{height:"40px",borderRadius:"50px"}} className='photo' src={user.DP}></img></td>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Phone}</td>
                <td>{user.Designation}</td>
                <td>{user.Company}</td>
                <td>{user.linkedin}</td>
                </tr>
                })} 
              </tbody>  
            </table>
    </div>
  )
}

export default Admin