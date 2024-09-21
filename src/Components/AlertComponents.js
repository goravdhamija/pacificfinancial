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
        
      </Alert>
      
    )
}



export {
  
    AlertHeaderLoans,
    AlertHeaderLiabilities,
    AlertHeaderProposals
  }
