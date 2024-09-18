import React,{useState, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Row,Col,InputGroup,FloatingLabel,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';


function UserInputsComponentForm() {
    const [newCompany, setCompany] = React.useState("");
    const [newPosition, setPosition] = React.useState("");
    const [newLink, setNewLink] = React.useState("");
    const [newDate, setNewDate] = React.useState("");
    const [newNote, setNewNote] = React.useState("");
  
    return (
          <form>
            <input
              value={newCompany}
              onChange={(e) => setCompany(e.target.value)}
              label="Company"
              placeholder="Company"
            />
            <input
              value={newPosition}
              onChange={(e) => setPosition(e.target.value)}
              label="Job Title"
              placeholder="Job Title"
            />
            <input
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              label="Job Link"
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              label="Note"
            />
            <button type="submit"> Submit </button>
          </form>
    );
  }
  
  function AllLoanComponents() {

    const loansObject = useContext(PacificDataContext);

    console.log(loansObject.loans)


    return (
      <Container className="mt-5">
        <Row>
        {
              loansObject.loans.map((item,index) => (
              
                <LoanInputComponent key={index} cnt={{item,index}}/>  
                
              ))
        }

          
        </Row>
        </Container>
    );
  }

  function LoanInputComponent(props) {


    const loans = useContext(PacificDataContext);

       console.log(props.cnt.loanAmount);
       console.log("END");

    return (
  

    <Col lg={4}>
      <Form.Label className='form-control-lg' htmlFor="basic-url"><strong>Loan Details - {props.cnt.index + 1} </strong></Form.Label>
        <FloatingLabel controlId="loanamount1 " label="Loan Amount ($) " className="mb-3">
          <Form.Control defaultValue={props.cnt.item.loanAmount} type="number" step={0.01} placeholder="00.00" />
        </FloatingLabel>

        <FloatingLabel controlId="termyears1" label="Term (Years)" className="mb-3">
          <Form.Control defaultValue={props.cnt.item.termYears} type="number" step={0} placeholder="00" />
        </FloatingLabel>

        <FloatingLabel controlId="loaninterest1" label="Interest Rate (%)" className="mb-3">
          <Form.Control defaultValue={props.cnt.item.interestRate} type="number" step={0.01} placeholder="00.00" />
        </FloatingLabel>

        <FloatingLabel controlId="loanpayments1" label="Number Of Payments Made " className="mb-3">
          <Form.Control  defaultValue={props.cnt.item.NumberOfpaymentsMade} type="number" step={1} placeholder="0" />
        </FloatingLabel>
    </Col>
        

    );
  }

  export {
    UserInputsComponentForm,
    AllLoanComponents,
    LoanInputComponent
  }

  
