import React,{useContext,useState} from 'react';
import {GlobalContext} from '../Context/GlobalState';
import {
    Form,FormGroup,Button,Label,Input

} from 'reactstrap';
import {Link,useHistory} from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import axios from 'axios';


export const AddUser = () => {
    const [name,setName]=useState('');
    const [Email,setEmail]=useState('');
    const[nameErr,setNameErr] = useState('');
    const[emailErr,setEmailErr] = useState('');
    const {addUser}=useContext(GlobalContext);
    const history=useHistory();

    const emailRegEx = RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

const onSubmit=(e)=>{
    e.preventDefault();
  const newUser={
      id:uuid(),
      name,
      Email
  }
  if (name && Email && !nameErr && !emailErr ) {
    axios.post('https://crudhookapp-default-rtdb.firebaseio.com/user.json', newUser).then(result => {
        addUser(newUser);
       history.push("/");
       
    })
  //  await signUp({ name, email, password });
 // addUser(newUser);
 // history.push('/');
  }
   // addUser(newUser);


}



const onChange=(e)=>{
    let nam=e.target.value;
    let err='';
    if(nam.trim().length<5)
    {
        err = <strong style={{color:'red'}}>name is too short</strong>;
    }
    setNameErr(err);
    setName(nam);
}
const onChanges=(e)=>{
    let email=e.target.value;
  
    !emailRegEx.test(email) ? setEmailErr(<strong style={{color:'red'}}>Invalid email</strong>) : setEmailErr('');
    setEmail(email);
    //setEmail(e.target.value);
}
    return (
       <Form onSubmit={onSubmit}>
           <FormGroup>
               <Label>Name</Label>
               <Input type="text" value={name} onChange={onChange} placeholder="Enter Name" ></Input>
               {nameErr}
           </FormGroup>
           <FormGroup>
               <Label>Email</Label>
               <Input type="text"  value={Email} onChange={onChanges} placeholder="Enter Email" ></Input>
               {emailErr}
           </FormGroup>
           <Button type="submit">submit</Button>
           <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
       </Form>
    )
}
