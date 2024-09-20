import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Row,Col,InputGroup,FloatingLabel,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';
import { pv,fv, pmt } from 'financial'


  
  function AllLoanComponents() {

   // const loansObject = useContext(PacificDataContext);
     const {loans,setLoans} = useContext(PacificDataContext);

   // console.log(loansObject.loans)

  //  this.forceUpdate();
    return (
      <Container className="mt-5">
        <Row>

    {/* <div>{JSON.stringify(loans)}
                    </div> */}

        {
              loans.map((item,index) => (
                
                <LoanInputComponent key={Math.random()} cnt={{item,index}}/>  
                
              ))
        }

          
        </Row>

        <LoanCalculationButton/>
        </Container>
    );
  }

  function LoanCalculationButton() {
    const {loans,setLoans} = useContext(PacificDataContext);
    
    useEffect(() => {
      calculateLoanCurrentBalance()
    }, []);

    const calculateLoanCurrentBalance = () => {
     
      let newLoans = loans.map((loan) =>
           {

            let rate = (loan.interestRate / 100) / 12; // 4% rate 
            let nper = loan.termYears * 12; //30 years in months

            const pmtx = Math.ceil(pmt(rate, nper, loan.loanAmount)*-1)
            const pvx = Math.ceil(pv(rate, nper-loan.NumberOfpaymentsMade, pmtx)*-1)
            return {
              
              loanAmount: loan.loanAmount,
              termYears: loan.termYears,
              interestRate: loan.interestRate,
              NumberOfpaymentsMade: loan.NumberOfpaymentsMade,
              currentBalance: pvx,
              currentPayment: pmtx 

                  }
             } )
          
        setLoans(newLoans)
       

   
        return ;
    }

    // calculateLoanCurrentBalance();


    return (
      <div className="d-grid gap-2">
        <Button onClick={calculateLoanCurrentBalance} variant="primary" size="lg" active>
              Calculate Previous Loans
        </Button>
      </div>
    )
  }


  function LoanInputComponent(props) {

    

    return (
  
    <Col lg={4}>

      <Form.Label className='form-control-lg' htmlFor="basic-url"><strong>Loan Details - {props.cnt.index + 1} </strong></Form.Label>
        <FloatingLabel controlId="loanamount1 " label="Total Loan Amount / Principal Amount ($) " className="mb-3">
          <Form.Control defaultValue={props.cnt.item.loanAmount} type="number" step={0.01} placeholder="00.00" />
        </FloatingLabel>

        <FloatingLabel controlId="termyears1" label="Term (Years)" className="mb-3">
          <Form.Control defaultValue={props.cnt.item.termYears} type="number" step={0} placeholder="00" />
        </FloatingLabel>

        <FloatingLabel controlId="loaninterest1" label="Interest Rate Per Annum (%)" className="mb-3">
          <Form.Control defaultValue={props.cnt.item.interestRate} type="number" step={0.01} placeholder="00.00" />
        </FloatingLabel>

        <FloatingLabel controlId="loanpayments1" label="Number Of Payments Made " className="mb-3">
          <Form.Control  defaultValue={props.cnt.item.NumberOfpaymentsMade} type="number" step={1} placeholder="0" />
        </FloatingLabel>

        <Form.Group as={Row} className="mb-3" controlId="currentpaymentloan">
        <Form.Label column sm="6">
        <strong> Payment Per Period : </strong>
        </Form.Label>
        <Col sm="6">
          <Form.Control plaintext readOnly defaultValue={props.cnt.item.currentPayment} />
        </Col>
      </Form.Group>


        <Form.Group as={Row} className="mb-3" controlId="currentbalanceloan">
        <Form.Label column sm="6">
          <strong>Current Balance : </strong>
        </Form.Label>
        <Col sm="6">
          <Form.Control plaintext readOnly defaultValue={props.cnt.item.currentBalance} />
        </Col>
      </Form.Group>

      
      

    </Col>
        

    );
  }





  

  export {
  
    AllLoanComponents,
    LoanInputComponent
  }

  
