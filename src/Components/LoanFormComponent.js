import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Row,Col,InputGroup,FloatingLabel,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';
import { pv,fv, pmt } from 'financial'


  
  function AllLoanComponents() {

     const {loans,setLoans} = useContext(PacificDataContext);


    return (
      <Container className="mt-5">
        <Row>

        {
              loans.map((item,index) => (

                // console.log(item.loanid)
                <LoanInputComponent key={item.loanid} id={item.loanid} cnt={{item,index}}/>  
                
              ))
        }

          
        </Row>

        {/* <LoanCalculationButton/> */}
        </Container>
    );
  }

  function LoanCalculationButton() {
    const {loans,setLoans} = useContext(PacificDataContext);

    

    return (
      <div className="d-grid gap-2">
        <Button onClick={() => {calculateLoanCurrentBalance(loans,setLoans)}} variant="primary" size="lg" active>
              Calculate Previous Loans
        </Button>
      </div>
    )
  }



  const calculateLoanCurrentBalance = (loans,setLoans) => {
     
    let newLoans = loans.map((loan) =>
         {

          let rate = (loan.interestRate / 100) / 12; // 4% rate 
          let nper = loan.termYears * 12; //30 years in months

          const pmtx = Math.ceil(pmt(rate, nper, loan.loanAmount)*-1)
          const pvx = Math.ceil(pv(rate, nper-loan.numberOfpaymentsMade, pmtx)*-1)
          return {
            loanid:loan.loanid,
            loanAmount: loan.loanAmount,
            termYears: loan.termYears,
            interestRate: loan.interestRate,
            numberOfpaymentsMade: loan.numberOfpaymentsMade,
            currentBalance: pvx,
            currentPayment: pmtx 

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
     // e.preventDefault();
      const { name, value,id } = e.target;
      const idselected = id.split('-');

      console.log({[name]: value})
      console.log("2")
      console.log(`You changed value. : ${e.target.id}`);
      console.log(`Selected ID. : ${idselected[3]}`);
      
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

        <Form.Group as={Row} className="mb-3" controlId="currentpaymentloan">
        <Form.Label column sm="6">
        <strong> Payment Per Period : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.currentPayment}</div>
          {/* <Form.Control plaintext readOnly defaultValue={props.cnt.item.currentPayment} /> */}
        </Col>
      </Form.Group>


        <Form.Group as={Row} className="mb-3" controlId="currentbalanceloan">
        <Form.Label column sm="6">
          <strong>Current Balance : </strong>
        </Form.Label>
        <Col sm="6">
        <div> {props.cnt.item.currentBalance}</div>
          {/* <Form.Control plaintext readOnly defaultValue={props.cnt.item.currentBalance} /> */}
        </Col>
      </Form.Group>

      
      

    </Col>
        

    );
  }





  

  export {
  
    AllLoanComponents,
    LoanInputComponent
  }

  
