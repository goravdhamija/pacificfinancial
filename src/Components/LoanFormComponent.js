import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Alert,Form,Row,Col,InputGroup,FloatingLabel,Button,ListGroup ,Modal, Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';
import { pv,fv, pmt } from 'financial'
import { PV, CUMIPMT } from '@formulajs/formulajs'
import { LiabilityInputComponent } from './LiabilitiesFormComponents';
import { NewLoanProposalComponent } from './NewLoanProposal';
import { AlertHeaderLoans,AlertHeaderLiabilities,AlertHeaderProposals,AlertFooterPage } from './AlertComponents';
import ReactPDF from '@react-pdf/renderer';
import PDFReportView from './PDFReportView';
import { NumericFormat } from 'react-number-format';
       

  
  function AllLoanComponents() {

    const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);

    return (
      <Container className="mt-5">

        <Row>
        <Col lg={12}> 
        <AlertHeaderLoans/>
        </Col>
        </Row>


        <Row>
        {
              loans.map((item,index) => (
                <LoanInputComponent key={item.loanid} id={item.loanid} cnt={{item,index}}/>  
              ))
        }  
        </Row>


        <Row>
        <Col lg={12}> 
        <AlertHeaderLiabilities/>
        </Col>
        </Row>

        <Row >
        {
              liabilities.map((item,index) => (
                <LiabilityInputComponent key={item.liabilityid} id={item.liabilityid} cnt={{item,index}}/>  
              ))
        }  
        </Row>


        <Row>
        <Col lg={12}> 
        <AlertHeaderProposals/>
        </Col>
        </Row>


        <Row>
        {
              proposals.map((item,index) => (
                
                <NewLoanProposalComponent key={item.proposalid} id={item.proposalid} cnt={{item,index}}/>  
              ))
        }  
        </Row>

        <Row>
        <Col lg={12}> 
        <AlertFooterPage/>
        </Col>
        </Row>


        {/* <Row>
        <Col lg={12}> 
       
        <PDFReportView/>
        </Col>
        </Row> */}
       
        </Container>


    );
  }

  


  const calculateLoanCurrentBalance = (loans,setLoans) => {
     
  
    let newLoans = loans.map((loan) =>
         {

          let rate = (loan.interestRate / 100) / 12; // 4% rate 
          let nper = loan.termYears * 12; //30 years in months
          let per = loan.termYears * 12;

          const pmtx = pmt(rate, nper, loan.loanAmount)*-1
          const pvx = pv(rate, nper-loan.numberOfpaymentsMade, pmtx)*-1
          const Pvx = PV(rate, nper-loan.numberOfpaymentsMade, pmtx)*-1
          const cumipmt = CUMIPMT(rate, nper ,loan.loanAmount, 1 , per,0 )*-1
          const cumipmtPaid = CUMIPMT(rate, nper ,loan.loanAmount, 1 , loan.numberOfpaymentsMade,0 )*-1
          const remainingInterest = cumipmt - cumipmtPaid
          const yearsLeft = loan.termYears - (loan.numberOfpaymentsMade)/12
          const deductible = (pvx*loan.interestRate/100*loan.deductible/100)/12

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

    const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);
    

    useEffect(() => {
      calculateLoanCurrentBalance(loans,setLoans)
    }, []);


    const addCommas = (num) =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");
  
    function handleUpdate(e) {
      //e.preventDefault();
      const { name, value, id } = e.target;
      const idselected = id.split('-');
    
      
      let new_loan_data = loans.map((loan) => {

                                          if (loan.loanid === parseInt(idselected[3])) {
                                              return {
                                                  ...loan,
                                                  [name]: parseFloat(value.replace(',', '')),
                                              };
                                          }
                                          return loan;
                                      });

        calculateLoanCurrentBalance(new_loan_data,setLoans)

        if(name === "loanAmount"){
          e.target.value = addCommas(removeNonNumeric(e.target.value))
         }

       
    }

    function handleCloseLoan(e) {
      const { name, value, id } = e.target;
      const idselected = id.split('-');

      let new_proposals = proposals.map((proposal) => {

       
           var internProposalLoanArrayNew = proposal.payoffLoans.filter(
              (loanid) => { 
                if (parseInt(loanid) != parseInt(idselected[2])) return true; 
              })

            return {
                    ...proposal,
                    payoffLoans:internProposalLoanArrayNew
                    
                };
       
      });

      setProposals(new_proposals)
      
      setLoans(loans.filter((loan) => { if (loan.loanid != parseInt(idselected[2])) return true; }));
     
    }
    


    return (
  
    <Col id={`loanitem-${props.cnt.index}-${props.id}`} lg={4}> 




<div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      sm={4}
    >
      
      <Modal.Dialog>
        <Modal.Header size="lg" style={{ background: '#f0f8ff' }}  >
          <Modal.Title>Existing Loan {props.cnt.index + 1}</Modal.Title>
          <CloseButton id={`loanitem-${props.cnt.index}-${props.id}`} onClick={handleCloseLoan} />
        </Modal.Header>
        <Modal.Body style={{ background:  '#f0f8ff' }} >
          
    <ListGroup >

        <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Loan Amount </InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control defaultValue={new Intl.NumberFormat().format(props.cnt.item.loanAmount)} name='loanAmount' onChange={handleUpdate} id={`loanitem-loanamount-${props.cnt.index}-${props.id}`} type="text"  />
        </InputGroup>
        </ListGroup.Item>

        {/* <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Loan Amount </InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.loanAmount} name='loanAmount' onChange={handleUpdate} id={`loanitem-loanamount-${props.cnt.index}-${props.id}`} type="number" step={0} placeholder="00"   />
        </InputGroup>
        </ListGroup.Item> */}


        <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Term  </InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.termYears} name='termYears' onChange={handleUpdate} id={`loanitem-termYears-${props.cnt.index}-${props.id}`} type="number" step={0} placeholder="00" />
        <InputGroup.Text>Years</InputGroup.Text>
        </InputGroup>
        </ListGroup.Item>

        

        <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Interest Rate Per Annum</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.interestRate} name='interestRate' onChange={handleUpdate} id={`loanitem-interestRate-${props.cnt.index}-${props.id}`} type="number" step={0.01} placeholder="00.00" />
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        </ListGroup.Item>



        <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Number Of Payments Made</InputGroup.Text>
        <Form.Control  defaultValue={props.cnt.item.numberOfpaymentsMade} name='numberOfpaymentsMade' onChange={handleUpdate} id={`loanitem-numberOfpaymentsMade-${props.cnt.index}-${props.id}`} type="number" step={1} placeholder="0" />
        </InputGroup>
        </ListGroup.Item>


        


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text><strong> Payment Per Period : </strong></InputGroup.Text>
        
        <InputGroup.Text><div>
         {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.currentPayment)}
        </div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text><strong>Current Balance : </strong></InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.currentBalance)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

     

      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text><strong>Total Interest : </strong></InputGroup.Text>

        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.totalInterest)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text><strong>Interest Paid : </strong></InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.interestPaid)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


     
      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text><strong>Remaining Interest : </strong></InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.remainingInterest)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      

      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text><strong>Remaining Principal : </strong></InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.remainingPrincipal)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text><strong>Number of Years Left : </strong></InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.yearsLeft}</div></InputGroup.Text>
        <InputGroup.Text>Years</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>



        <ListGroup.Item>
        <InputGroup >
        <InputGroup.Text><strong>Deductible : </strong></InputGroup.Text>
        <Form.Control  defaultValue={props.cnt.item.deductible} name='deductible' onChange={handleUpdate} id={`loanitem-numberOfpaymentsMade-${props.cnt.index}-${props.id}`} type="number" step={1} placeholder="0" />
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>
      
       

      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text><strong>Deductible Cost : </strong></InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.deductibleCost)}</div></InputGroup.Text>
       
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
  
    AllLoanComponents,
    LoanInputComponent
  }

  
