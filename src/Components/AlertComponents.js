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


function AlertHeaderLoans() {

    return (
        
        <Alert show={true} variant="success">
        <Alert.Heading>Loans</Alert.Heading>
        <p>
          Blocks Contains Multiple Loans Details of a User !
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="outline-dark">
            Add New Loan 
          </Button>
        </div>
      </Alert>
      
    )
}

function AlertHeaderLiabilities() {

    return (
        
        <Alert show={true} variant="warning">
        <Alert.Heading>Liabilities</Alert.Heading>
        <p>
          Blocks Contains Multiple Liabilities Details of a User !
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="outline-danger">
            Add New Liability 
          </Button>
        </div>
      </Alert>
      
    )
}


function AlertHeaderProposals() {

    return (
        
        <Alert show={true} variant="primary">
        <Alert.Heading>Loan Proposed Plans</Alert.Heading>
        <p>
          Blocks Contains Multiple Loan Proposed Plans Calculated According to the Data Provided !
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="outline-primary">
            Add New Proposal 
          </Button>
        </div>
      </Alert>
      
    )
}

function AlertFooterPage() {

    return (
        
        <Alert show={true} variant="dark">
        <Alert.Heading>Pacific Financial</Alert.Heading>
        <p>
          Mortgage Calculator !
        </p>
        <div className="d-flex justify-content-end">
        <Button  className='m-3' variant="dark">
            Download PDF
          </Button>
        <Button  className='m-3' variant="dark">
            Print Document
          </Button>
          
        </div>
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
