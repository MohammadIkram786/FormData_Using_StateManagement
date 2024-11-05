import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  let [formData, setFormData] = useState(
    {
      uname: '',
      umobile: '',
      uemail: '',
      uaddress: '',
      index: ''
    }
  );

  let oldData = { ...formData };

  let getData = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  }

  let [userInfo, setUserInfo] = useState([])
  
  let getFormData = (event) => {
    let Users = {
      uname: formData.uname,
      umobile: formData.umobile,
      uemail: formData.uemail,
      uaddress: formData.uaddress
    }

  let check = userInfo.filter((v)=>v.uemail==formData.uemail || v.umobile==formData.umobile)
  if(check.length==1){
    //alert("Email or Mobile Number Already Exists...")
    toast.error("Email or Mobile Number Already Exists...")
  }
  else{
    let usersData = [...userInfo, Users];
    setUserInfo(usersData)
    setFormData(
      {
        uname: '',
        umobile: '',
        uemail: '',
        uaddress: '',
        index: ''
      }
    )
    console.log(userInfo)
  }
  event.preventDefault()
  }

  let deleteRow = (indexNumber)=>{
    let remainData = userInfo.filter((v,i)=>i!=indexNumber)
    setUserInfo(remainData);
    toast.success('Record Deleted!')
  }

  return (
    <div className='main'>
      <ToastContainer/>
      <div className='containerBox'>
        <form onSubmit={getFormData}>
          <div className='nameBox'>
            <label className='form-label'>Name:</label>
            <input onChange={getData} className='form-control' name='uname' value={formData.uname} />
          </div>

          <div className='nameBox'>
            <label className='form-label'>Mobile:</label>
            <input onChange={getData} className='form-control' name='umobile' value={formData.umobile} />
          </div>

          <div className='nameBox'>
            <label className='form-label'>Email:</label>
            <input onChange={getData} className='form-control' name='uemail' value={formData.uemail} />
          </div>

          <div className='nameBox'>
            <label className='form-label'>Address:</label>
            <input onChange={getData} className='form-control' name='uaddress' value={formData.uaddress} />
          </div>
  
          <div className='btnBox'>
            <button className='btn btn-dark'>Submit</button>
          </div>
        </form>
      </div>

      <div className='userDetails'>
        <Table className='tableData' striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.length >= 1 ?
              userInfo.map((obj, i)=>{
                return(
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{obj.uname}</td>
                    <td>{obj.umobile}</td>
                    <td>{obj.uemail}</td>
                    <td>{obj.uaddress}</td>
                    <td>
                      <FontAwesomeIcon icon={faTrash} className='actIcon' onClick={()=>{deleteRow(i)}}/>
                      <FontAwesomeIcon icon={faEdit} className='actIcon' />
                    </td>
                  </tr>
                )
              })
            :
            <tr>
              <td colSpan={6} style={{textAlign:'center'}}>No Data Found</td>
            </tr>
            }
          </tbody>
        </Table>
      </div>

    </div>
  );
}

export default App;
