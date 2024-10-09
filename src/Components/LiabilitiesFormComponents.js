import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Row,Col,InputGroup,FloatingLabel,Button,ListGroup , Container,Modal, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
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
          
          }

                
           } )
           
        
           setLiabilities(newLoans)
     

      return ;
  }


  function LiabilityInputComponent(props) {

    const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);

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

    function handleCloseLiability(e) {
      const { name, value, id } = e.target;
      const idselected = id.split('-');
      setLiabilities(liabilities.filter((liability) => { if (liability.liabilityid != parseInt(idselected[2])) return true; }));
     
    }
    


    return (
  
    <Col id={`liabilityitem-${props.cnt.index}-${props.id}`} lg={4}> 

   
<div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      sm={4}
    >
      <Modal.Dialog>
        <Modal.Header size="lg" style={{ background: '#e6e6fa' }} >
          <Modal.Title>Liability - {props.cnt.index + 1} </Modal.Title>
          <CloseButton id={`liabilityitem-${props.cnt.index}-${props.id}`} onClick={handleCloseLiability} />
        </Modal.Header>
        <Modal.Body style={{ background:  '#e6e6fa' }} >

<ListGroup >
      
      <ListGroup.Item>
      <Form.Select aria-label="Default select example" className="mb-3">
      <option selected value="1">Card</option>
      <option value="2">Auto</option>
      <option value="3">Cash Out</option>
      <option value="4">Other</option>
    </Form.Select>
    </ListGroup.Item>

        

        <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Balance Amount</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.balanceAmount} name='balanceAmount' onChange={handleUpdate} id={`liabilityitem-balanceAmount-${props.cnt.index}-${props.id}`} type="number" step={0.01} placeholder="00.00" />
        </InputGroup>
        </ListGroup.Item>

        
        <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Interest Rate</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.interestRate} name='interestRate' onChange={handleUpdate} id={`liabilityitem-interestRate-${props.cnt.index}-${props.id}`} type="number" step={0.01} placeholder="00.00" />
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        </ListGroup.Item>


        <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Monthly Payment</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.monthlyPayment} name='monthlyPayment' onChange={handleUpdate} id={`liabilityitem-monthlyPayment-${props.cnt.index}-${props.id}`} type="number" step={0} placeholder="00" />
        </InputGroup>
        </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text><strong>PayOff Years : </strong></InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>{props.cnt.item.payoffYears}</InputGroup.Text>
        </InputGroup>
        </ListGroup.Item>

    
      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text> <strong>Interest : </strong></InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>{props.cnt.item.interest}</InputGroup.Text>
        </InputGroup>
        </ListGroup.Item>

      
      </ListGroup>


      </Modal.Body> 
      </Modal.Dialog>
    </div>


    </Col>
        

    );
  }





  

  export {
  
    LiabilityInputComponent
  }

  