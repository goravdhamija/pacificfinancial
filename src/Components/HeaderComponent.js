import React from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast,Col,Row} from 'react-bootstrap';


 function HeaderComponent() {
    return (
        <header>
         <Container>
            <Row>
              <Col className='text-center mt-3' md={4}><img src={logo} className="App-logo" alt="logo" /></Col>
              <Col className='text-center mt-3' md={8}><UserInputsComponentHeader/></Col>
            </Row>
         </Container>
            
        </header>
    );
  }

  function UserInputsComponentHeader() {
    const [personName,setPersonName] = React.useState('');
    return (
      <div >
           
              <h1 className='text-primary'>Pacific Financial Mortgage Calculator {personName}</h1>
      
      </div>
    );
  }

export default HeaderComponent ;
export {UserInputsComponentHeader} ;