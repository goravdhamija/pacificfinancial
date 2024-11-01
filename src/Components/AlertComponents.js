import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Alert,Form,Row,Col,InputGroup,FloatingLabel,Button,ListGroup ,Modal, Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';
import { pv,fv, pmt } from 'financial'
import {PV, CUMIPMT } from '@formulajs/formulajs'
import { LiabilityInputComponent } from './LiabilitiesFormComponents';
import { NewLoanProposalComponent } from './NewLoanProposal';
import DownloadPDFXXX from './downloadPDF';
import ReportDownloadable from './ReportDownloadable';
import { PDFDownloadLink,BlobProvider, Document, Page,pdf } from '@react-pdf/renderer';
import { saveAs } from "file-saver";


function AlertHeaderLoans() {

  const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);


  var loanBlankItem = {
   
    loanAmount: 335000,
    termYears: 30,
    interestRate: 2.750,
    numberOfpaymentsMade: 36,
    currentBalance: 0,
    currentPayment: 0,
    totalInterest:0,
    interestPaid:0,
    remainingInterest:0,
    remainingPrincipal:0,
    yearsLeft:0,
    deductible:35,
    deductibleCost:0
  }

  function addNewLoan(e) {
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    
    var loanBunk = {...loanBlankItem,loanid:val}

    let new_proposals = proposals.map((proposal) => {

      var internProposalLoanArrayNew = [...proposal.payoffLoans,parseInt(val)];
           
                return {
                    ...proposal,
                    payoffLoans:internProposalLoanArrayNew
                    
                };
            
        });

    setProposals(new_proposals)
    setLoans([...loans,loanBunk]);

  }

    return (
        
        <Alert show={true} variant="success">
        <Alert.Heading>Loans</Alert.Heading>
        {/* <p>
          Blocks Contains Multiple Loans Details of a User !
        </p> */}
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={addNewLoan} variant="outline-dark">
            Add New Loan 
          </Button>
        </div>
      </Alert>
      
    )
}

function AlertHeaderLiabilities() {
  const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);

  var liabilityBlankItem = {
 
    liabilityType:1,
    balanceAmount: 2000.00,
    monthlyPayment: 400.00,
    interestRate: 9.000,
    interest: 0,
    payoffYears: 0,
    
  }

  function addNewLiability(e) {
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    
    var liabilityBunk = {...liabilityBlankItem,liabilityid:val}
    let new_proposals = proposals.map((proposal) => {

      var internProposalLiabilityArrayNew = [...proposal.payoffLiabilities,parseInt(val)];
           
                return {
                    ...proposal,
                    payoffLiabilities:internProposalLiabilityArrayNew
                    
                };
            
        });

    setProposals(new_proposals)
    setLiabilities([...liabilities,liabilityBunk]);

  }

    return (
        
        <Alert show={true} variant="warning">
        <Alert.Heading>Liabilities</Alert.Heading>
        <p>
        Add Other Debts Such as Credit Card, and Auto Loans You Would Like To Consider Paying off with Your New Loan
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={addNewLiability}  variant="outline-danger">
            Add New Liability 
          </Button>
        </div>
      </Alert>
      
    )
}


function AlertHeaderProposals() {

  const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);

  

  var proposalsBlankItem = {
 
    proposalTerm:30,
    proposalInterestRate:5,
    proposalOriginationFeesRate:1,
    proposalOriginationFees: 0,
    proposalDiscountFeesRate:0,
    proposalDiscountFees:0,
    proposalMiscFeesRate:0,
    proposalMiscFees:3500,
    proposalLenderCreditRate:0,
    proposalLenderCredit:0,
    total:0,
    payoffLoans:[],
    payoffLiabilities:[],
    totalPayOff:0,
    inCC:1,
    newProposalLoanAmount:0,
    newPayment:0,
    apr:0,
    netSavingsPM:0,
    termReduction:0,
    totalNewInterest:0,
    interestSavedLost:0,
    taxBenefitBracket:35,
    taxBenefitNew:0,
    taxBenefitPrevious:0,
    investCashoutCheck:1,
    investCashoutAmount:0,
    rateOnInvest:5,
    investMonthlyCheck:1,
    investMonthlyAmount:0,
    benefitYears:1,
    benefitAfterNYears:0,
    benefitAfter1Year:0,
    benefitAfter3Year:0,
    benefitAfter5Year:0,
    totalPreviousLoanBalance:0
  }

  function addNewProposal(e) {
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    
    var proposalBunk = {...proposalsBlankItem,proposalid:val};
    proposalBunk.payoffLoans = loans.map((loan) => loan.loanid);
    proposalBunk.payoffLiabilities = liabilities.map((liability) => liability.liabilityid);
    
    setProposals([...proposals,proposalBunk]);

  }

    return (
        
        <Alert show={true} variant="primary">
        <Alert.Heading>View Multiple Loan Plans Side by Side To Compare</Alert.Heading>
        {/* <p>
        View Multiple Loan Plans Side by Side To Compare
        </p> */}
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={addNewProposal} variant="outline-primary">
            Add New Proposal 
          </Button>
        </div>
      </Alert>
      
    )
}

function AlertFooterPage() {
  const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);
  const [show, setShow] = useState(false);
  const [reportPreparedBy, setReportPreparedBy] = useState("Bill Moran");
  const [reportPreparedFor, setReportPreparedFor] = useState("Castillo");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function downloadPDF() {
    
}
  
  function handlePrint() {
    window.print()

}

const handleShare = async (blob) => {
  await saveAs(blob, `../DownloadReports/report.pdf`);
  window.location.href = `mailto:?subject=${encodeURIComponent(`Report`)}&body=${encodeURIComponent(`Kindly find attached financial report`)} target="_blank"`;
}



function handleUpdate(e) {
 
     const { name, value, id } = e.target;
     
     if(name === "reportPreparedBy"){
      setReportPreparedBy(value);
     }else{
      setReportPreparedFor(value);
     }

     
   }

    return (
        
        <Alert show={true} variant="dark">
        <Alert.Heading>Pacific Financial Mortgage Report Generator Utility !</Alert.Heading>

        <Container className="d-flex justify-content-end" >

        <Row>
        <Col lg={8}> 
       
        
         

          <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Report Prepared By</Form.Label>
              <Form.Control name='reportPreparedBy' onChange={handleUpdate} id={`reportPreparedBy`} type="text" placeholder="Bill Moran" />
              <Form.Text className="text-muted">
                Enter name of the person who is preparing report !
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Report Prepared For</Form.Label>
              <Form.Control name='reportPreparedFor' onChange={handleUpdate} id={`reportPreparedFor`}  type="text" placeholder="Castillo" />
              <Form.Text className="text-muted">
                Enter name of the person for whome the report is prepaired !
              </Form.Text>
            </Form.Group>
           
           
          </Form>

          </Col>
          
          
          
           <Col lg={4}> 
          <BlobProvider   document={<ReportDownloadable loans={loans} liabilities={liabilities} proposals={proposals} report={{reportPreparedBy,reportPreparedFor}} />}>
            {({ url, blob }) => (
              <Button onClick={() => handleShare(url, blob)} className='m-3 btn text-nowrap' variant="dark">
             
                  <span>Share / Email</span>
                  </Button>
            )}
          </BlobProvider>
          
            <PDFDownloadLink document={<ReportDownloadable loans={loans} liabilities={liabilities} proposals={proposals} report={{reportPreparedBy,reportPreparedFor}}  />} fileName="PacificFinancialReport.pdf">
              {({ blob, url, loading, error }) =>
                <Button className='m-3 btn text-nowrap' variant="dark" >
                  {loading ? 'Loading document...' : 'Download PDF'}
                  </Button>
              }
            </PDFDownloadLink>
           
            <BlobProvider  document={<ReportDownloadable loans={loans} liabilities={liabilities} proposals={proposals} report={{reportPreparedBy,reportPreparedFor}}  />}>
              {({ blob, url, loading, error }) => (
                <a href={url} target="_blank" >
                  <Button className='m-3 btn text-nowrap' variant="dark">
                      <span>View / Print Report</span>
                      </Button>
                </a>
              )}
            </BlobProvider>
         
            </Col>
  
          
     

        </Row>
          </Container>
        <hr />
       
      </Alert>
      
    )
}



export {
  
    AlertHeaderLoans,
    AlertHeaderLiabilities,
    AlertHeaderProposals,
    AlertFooterPage
  }
