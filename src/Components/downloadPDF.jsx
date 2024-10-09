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
import { AlertHeaderLoans,AlertHeaderLiabilities,AlertHeaderProposals,AlertFooterPage } from './AlertComponents';
import PDFReportView from './PDFReportView';


function DownloadPDFXXX() {
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Download PDF
      </Button> */}
      <Button  onClick={handleShow}  className='m-3' variant="dark">
            View Report
          </Button>

      <Modal
      
        show={show}
        onHide={handleClose}
        fullscreen={true}
        centered = {true}
        backdrop = {true}
        autoFocus = {true}
        keyboard={false}
        scrollable = {false}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Pacific Financial Mortgage Report </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
          <PDFReportView/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DownloadPDFXXX;