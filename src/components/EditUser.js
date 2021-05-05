import React,{useState,useEffect,useContext} from 'react';
import {GlobalContext} from '../Context/GlobalState';
import {Link,useHistory} from 'react-router-dom';

import {
    Form,FormGroup,Button,Label,Input

} from 'reactstrap';


export const EditUser = (props) => {
    const [selectedUser,setSelectedUser]=useState({
        id:'',
        name:'',
        Email:''
    });
    const {users,editUser}=useContext(GlobalContext);
    const history=useHistory();
    const currentUserId=props.match.params.id;

useEffect(()=>
{
    const userId=currentUserId;
    //console.log(typeof userId);
    const selectedUser=users.find(user=>user.id===userId)
   setSelectedUser(selectedUser);
 // console.log(selectedUser);
},[currentUserId,users])

const onSubmit=()=>{
    editUser(selectedUser);

history.push('/');

}


const onChanges=(e)=>{
    const {name, value} = e.target;
    setSelectedUser({...selectedUser, [name]: value});
    
}
    return (
        <div>
            <Form onSubmit={onSubmit}>
           <FormGroup>
               <label>Name</label>
               <Input type="text" value={selectedUser.name} name="name" onChange={onChanges} placeholder="Enter Name" ></Input>
           </FormGroup>
           <FormGroup>
               <label>Email</label>
               <Input type="text" value={selectedUser.Email} name="Email" onChange={onChanges} placeholder="Enter Name" ></Input>
           </FormGroup>
           <Button type="submit">Edit Name</Button>
           <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
       </Form>
        </div>
    )
}
