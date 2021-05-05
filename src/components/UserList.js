import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import {GlobalContext} from '../Context/GlobalState';
import {
    ListGroup,ListGroupItem,Button
} from 'reactstrap';

export const UserList = () => {
    const {users,removeUser}=useContext(GlobalContext);
  
    return (
      <ListGroup className="mt-4">
          
       {users.map(user=>(
           <ListGroupItem className="d-flex">
           <strong className="mr-4">{user.name}</strong>
           <strong>{user.Email}</strong>
       <div className="ml-auto">
           <Link className="btn btn-warning mr-1" to={`/edit/${user.id}`}>Edit</Link>
           <Button onClick={()=>removeUser(user.id)} color="danger">Delete</Button>
       </div>
       </ListGroupItem>

       ))}
          
      </ListGroup>
    )
}
