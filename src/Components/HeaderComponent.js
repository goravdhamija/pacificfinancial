import React from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast,Col,Row} from 'react-bootstrap';


 function HeaderComponent() {
    return (
        <header>
         <Container>
            <Row >
              <Col className='text-center mt-4' md={3}><img src={logo} className="App-logo" alt="logo" /></Col>
              <Col className='text-center mt-5' md={9}><UserInputsComponentHeader/></Col>
            </Row>
         </Container>
            
        </header>
    );
  }

  function UserInputsComponentHeader() {
   
    return (
      <div >
            <u className='text-primary'>
              <h1 style={{"font-family": "'lucida grande', tahoma, verdana, arial, sans-serif"}} className='text-success'>
                
                  <strong className='text-primary'>PACIFIC FINANCIAL </strong>
                 MORTGAGE CALCULATOR 
                 
                 </h1>
                 </u>
      
      </div>
    );
  }

export default HeaderComponent ;
export {UserInputsComponentHeader} ;