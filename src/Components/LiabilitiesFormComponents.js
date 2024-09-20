import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Row,Col,InputGroup,FloatingLabel,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';
import { pv,fv, pmt } from 'financial'
import {PV, CUMIPMT, NPER } from '@formulajs/formulajs'

 
  


  const calculateLiabilityCurrentBalance = (liabilities,setLiabilities) => {
     
  
    let newLoans = liabilities.map((liability) =>
         {

          let rate = (liability.interestRate / 100) / 12; // 4% rate 
          
          const nper = Math.ceil(NPER(rate,-liability.monthlyPayment,liability.balanceAmount)/12)
          const cumipmt = Math.ceil(CUMIPMT(rate, nper*12 ,liability.balanceAmount, 1 , nper*12,0 )*-1)

          
          

           return  {...liability,

            payoffYears:nper,
            interest:cumipmt
            // currentPayment: pmtx,
            // currentBalance: pvx, 
            // totalInterest:cumipmt, 
            // interestPaid: cumipmtPaid, 
            // remainingInterest:remainingInterest,
            // remainingPrincipal:Pvx,
            // yearsLeft:yearsLeft,
            // deductibleCost:deductible
          
          }

                
           } )
           
        
           setLiabilities(newLoans)
     

      return ;
  }


  function LiabilityInputComponent(props) {

    const {loans,setLoans,liabilities,setLiabilities} = useContext(PacificDataContext);

    useEffect(() => {
        calculateLiabilityCurrentBalance(liabilities,setLiabilities)
    }, []);
  
    function handleUpdate(e) {
     e.preventDefault();
      const { name, value, id } = e.target;
      const idselected = id.split('-');

     
      
      let new_liability_data = liabilities.map((liability) => {

                                          if (liability.liabilityid === parseInt(idselected[3])) {
                                              return {
                                                  ...liability,
                                                  [name]: parseFloat(value),
                                              };
                                          }
                                          return liability;
                                      });

        calculateLiabilityCurrentBalance(new_liability_data,setLiabilities)


     
      
    }
    


    return (
  
    <Col id={`liabilityitem-${props.cnt.index}-${props.id}`} lg={4}> 




      <Form.Label className='form-control-lg' htmlFor="basic-url"><strong>Liability - {props.cnt.index + 1} </strong></Form.Label>


      <Form.Select aria-label="Default select example" className="mb-3">
      <option selected value="1">Card</option>
      <option value="2">Auto</option>
      <option value="3">Other</option>
    </Form.Select>


        <FloatingLabel controlId="loanamount1 " label="Balance Amount ($) " className="mb-3">
          <Form.Control defaultValue={props.cnt.item.balanceAmount} name='balanceAmount' onChange={handleUpdate} id={`liabilityitem-balanceAmount-${props.cnt.index}-${props.id}`} type="number" step={0.01} placeholder="00.00" />
        </FloatingLabel>

        <FloatingLabel controlId="loaninterest1" label="Interest Rate" className="mb-3">
          <Form.Control defaultValue={props.cnt.item.interestRate} name='interestRate' onChange={handleUpdate} id={`liabilityitem-interestRate-${props.cnt.index}-${props.id}`} type="number" step={0.01} placeholder="00.00" />
        </FloatingLabel>

        <FloatingLabel controlId="termyears1" label="Monthly Payment" className="mb-3">
          <Form.Control defaultValue={props.cnt.item.monthlyPayment} name='monthlyPayment' onChange={handleUpdate} id={`liabilityitem-monthlyPayment-${props.cnt.index}-${props.id}`} type="number" step={0} placeholder="00" />
        </FloatingLabel>

    
        <Form.Group as={Row} className="mb-1" controlId="currentpaymentloan">
        <Form.Label column sm="6">
        <strong> PayOff Years : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.payoffYears}</div>
          {/* <Form.Control plaintext readOnly defaultValue={props.cnt.item.currentPayment} /> */}
        </Col>
      </Form.Group>


        <Form.Group as={Row} className="mb-1" controlId="currentbalanceloan">
        <Form.Label column sm="6">
          <strong>Interest : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.interest}</div>
          {/* <Form.Control plaintext readOnly defaultValue={props.cnt.item.currentBalance} /> */}
        </Col>
      </Form.Group>

      

    </Col>
        

    );
  }





  

  export {
  
    LiabilityInputComponent
  }

  
