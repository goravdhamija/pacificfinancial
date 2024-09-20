import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Row,Col,InputGroup,FloatingLabel,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';
import { pv,fv, pmt } from 'financial'
import {PV, CUMIPMT } from '@formulajs/formulajs'
  
  function AllLoanComponents() {
    const {loans,setLoans} = useContext(PacificDataContext);
    return (
      <Container stripe="3n" className="mt-5">
        <Row>
        {
              loans.map((item,index) => (
                <LoanInputComponent key={item.loanid} id={item.loanid} cnt={{item,index}}/>  
              ))
        }  
        </Row>

       
        </Container>
    );
  }

  


  const calculateLoanCurrentBalance = (loans,setLoans) => {
     
  
    let newLoans = loans.map((loan) =>
         {

          let rate = (loan.interestRate / 100) / 12; // 4% rate 
          let nper = loan.termYears * 12; //30 years in months
          let per = loan.termYears * 12;

          const pmtx = Math.ceil(pmt(rate, nper, loan.loanAmount)*-1)
          const pvx = Math.ceil(pv(rate, nper-loan.numberOfpaymentsMade, pmtx)*-1)
          const Pvx = Math.ceil(PV(rate, nper-loan.numberOfpaymentsMade, pmtx)*-1)
          const cumipmt = Math.ceil(CUMIPMT(rate, nper ,loan.loanAmount, 1 , per,0 )*-1)
          const cumipmtPaid = Math.ceil(CUMIPMT(rate, nper ,loan.loanAmount, 1 , loan.numberOfpaymentsMade,0 )*-1)
          const remainingInterest = cumipmt - cumipmtPaid
          const yearsLeft = loan.termYears - (loan.numberOfpaymentsMade)/12
          const deductible = Math.ceil((pvx*loan.interestRate/100*loan.deductible/100)/12)

           return  {...loan,
            currentPayment: pmtx,
            currentBalance: pvx, 
            totalInterest:cumipmt, 
            interestPaid: cumipmtPaid, 
            remainingInterest:remainingInterest,
            remainingPrincipal:Pvx,
            yearsLeft:yearsLeft,
            deductibleCost:deductible
          
          }

                
           } )
           
        
      setLoans(newLoans)
     

      return ;
  }


  function LoanInputComponent(props) {

    const {loans,setLoans} = useContext(PacificDataContext);

    useEffect(() => {
      calculateLoanCurrentBalance(loans,setLoans)
    }, []);
  
    function handleUpdate(e) {
     e.preventDefault();
      const { name, value, id } = e.target;
      const idselected = id.split('-');

     
      
      let new_loan_data = loans.map((loan) => {

                                          if (loan.loanid === parseInt(idselected[3])) {
                                              return {
                                                  ...loan,
                                                  [name]: parseFloat(value),
                                              };
                                          }
                                          return loan;
                                      });

        calculateLoanCurrentBalance(new_loan_data,setLoans)


     
      
    }
    


    return (
  
    <Col id={`loanitem-${props.cnt.index}-${props.id}`} lg={4}> 

      <Form.Label className='form-control-lg' htmlFor="basic-url"><strong>Loan Details - {props.cnt.index + 1} </strong></Form.Label>
        <FloatingLabel controlId="loanamount1 " label="Total Loan Amount / Principal Amount ($) " className="mb-3">
          <Form.Control defaultValue={props.cnt.item.loanAmount} name='loanAmount' onChange={handleUpdate} id={`loanitem-loanamount-${props.cnt.index}-${props.id}`} type="number" step={0.01} placeholder="00.00" />
        </FloatingLabel>

        <FloatingLabel controlId="termyears1" label="Term (Years)" className="mb-3">
          <Form.Control defaultValue={props.cnt.item.termYears} name='termYears' onChange={handleUpdate} id={`loanitem-termYears-${props.cnt.index}-${props.id}`} type="number" step={0} placeholder="00" />
        </FloatingLabel>

        <FloatingLabel controlId="loaninterest1" label="Interest Rate Per Annum (%)" className="mb-3">
          <Form.Control defaultValue={props.cnt.item.interestRate} name='interestRate' onChange={handleUpdate} id={`loanitem-interestRate-${props.cnt.index}-${props.id}`} type="number" step={0.01} placeholder="00.00" />
        </FloatingLabel>

        <FloatingLabel controlId="loanpayments1" label="Number Of Payments Made " className="mb-3">
          <Form.Control  defaultValue={props.cnt.item.numberOfpaymentsMade} name='numberOfpaymentsMade' onChange={handleUpdate} id={`loanitem-numberOfpaymentsMade-${props.cnt.index}-${props.id}`} type="number" step={1} placeholder="0" />
        </FloatingLabel>

        <Form.Group as={Row} className="mb-1" controlId="currentpaymentloan">
        <Form.Label column sm="6">
        <strong> Payment Per Period : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.currentPayment}</div>
          {/* <Form.Control plaintext readOnly defaultValue={props.cnt.item.currentPayment} /> */}
        </Col>
      </Form.Group>


        <Form.Group as={Row} className="mb-1" controlId="currentbalanceloan">
        <Form.Label column sm="6">
          <strong>Current Balance : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.currentBalance}</div>
          {/* <Form.Control plaintext readOnly defaultValue={props.cnt.item.currentBalance} /> */}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-1" >
        <Form.Label column sm="6">
          <strong>Total Interest : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.totalInterest}</div>
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-1" >
        <Form.Label column sm="6">
          <strong>Interest Paid : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.interestPaid}</div>
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-1" >
        <Form.Label column sm="6">
          <strong>Remaining Interest : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.remainingInterest}</div>
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-1" >
        <Form.Label column sm="6">
          <strong>Remaining Principal : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.remainingPrincipal}</div>
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-1" >
        <Form.Label column sm="6">
          <strong>Years Left : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.yearsLeft}</div>
        </Col>
      </Form.Group>


      <FloatingLabel controlId="loanpayments1" label="Deductible (%) " className="mb-1">
          <Form.Control  defaultValue={props.cnt.item.deductible} name='deductible' onChange={handleUpdate} id={`loanitem-numberOfpaymentsMade-${props.cnt.index}-${props.id}`} type="number" step={1} placeholder="0" />
        </FloatingLabel>
      

        <Form.Group as={Row} className="mb-1" >
        <Form.Label column sm="6">
          <strong>Deductible Cost ($) : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.deductibleCost}</div>
        </Col>
      </Form.Group>
      

    </Col>
        

    );
  }





  

  export {
  
    AllLoanComponents,
    LoanInputComponent
  }

  
