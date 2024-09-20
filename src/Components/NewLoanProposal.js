import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Row,Col,InputGroup,ListGroup,FloatingLabel,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';
import { pv,fv, pmt } from 'financial'
import {PV, CUMIPMT, NPER } from '@formulajs/formulajs'

 
  


  const calculateProposals = (proposals,setProposals) => {
     
  
    let newproposals = proposals.map((proposal) =>
         {

          let rate = (proposal.interestRate / 100) / 12; // 4% rate 
          
          const nper = Math.ceil(NPER(rate,-proposal.monthlyPayment,proposal.balanceAmount)/12)
          const cumipmt = Math.ceil(CUMIPMT(rate, nper*12 ,proposal.balanceAmount, 1 , nper*12,0 )*-1)

           return  {...proposal,

            payoffYears:nper,
            interest:cumipmt
            
          
          }

                
           } )
           
        
           setProposals(newproposals)
     

      return ;
  }


  function NewLoanProposalComponent(props) {

    const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);

    useEffect(() => {
        calculateProposals(proposals,setProposals)
    }, []);
  
    function handleUpdate(e) {
     e.preventDefault();
      const { name, value, id } = e.target;
      const idselected = id.split('-');

     
      
      let new_proposal_data = proposals.map((proposal) => {

                                          if (proposal.proposalid === parseInt(idselected[3])) {
                                              return {
                                                  ...proposal,
                                                  [name]: parseFloat(value),
                                              };
                                          }
                                          return proposal;
                                      });

        calculateProposals(new_proposal_data,setProposals)


     
      
    }
    


    return (
  
    <Col id={`liabilityitem-${props.cnt.index}-${props.id}`} lg={4} className="mb-5 p-3"> 

<ListGroup sm={4}>
      <ListGroup.Item as="li" active><strong>New Loan Proposal - {props.cnt.index + 1} </strong></ListGroup.Item>
      <ListGroup.Item>
      <Form.Select name='proposalTerm' aria-label="Default select example" className="mb-3">
      <option selected value="5">5 Years</option>
      <option value="10">10 Years</option>
      <option value="15">15 Years</option>
      <option value="20">20 Years</option>
      <option value="25">25 Years</option>
      <option value="30">30 Years</option>
      </Form.Select>
      </ListGroup.Item>

      <ListGroup.Item>
        
        <InputGroup>
        <InputGroup.Text>Proposed Interest Rate</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalInterestRate} name='proposalInterestRate' onChange={handleUpdate} id={`proposalitem-proposalInterestRate-${props.cnt.index}-${props.id}`} type="number" step={0.01} placeholder="00.00" />
          <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>
        </ListGroup.Item>

        <ListGroup.Item>
        <InputGroup>
        <InputGroup.Text>Origination Fees %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalOriginationFeesRate} name='proposalOriginationFeesRate' onChange={handleUpdate} id={`proposalitem-proposalOriginationFeesRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup>
        <InputGroup.Text>Discount Fees %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalDiscountFeesRate} name='proposalDiscountFeesRate' onChange={handleUpdate} id={`proposalitem-proposalDiscountFeesRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup>
        <InputGroup.Text>Escrow/Misc. Fees %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalMiscFeesRate} name='proposalMiscFeesRate' onChange={handleUpdate} id={`proposalitem-proposalMiscFeesRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup className="mb-3">
        <InputGroup.Text>Lender Credit %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalLenderCreditRate} name='proposalLenderCreditRate' onChange={handleUpdate} id={`proposalitem-proposalLenderCreditRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Total</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Pay Off</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
      <InputGroup className="justify-content-end">
        <InputGroup.Text><Form sm={3}>
                <Form.Check // prettier-ignore
                // reverse
                    type="switch"
                    id="custom-switch"
                    label={`In CC`}
                    defaultChecked={true}
                />
                
            </Form>
            </InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000000000000.00</InputGroup.Text>
      </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>New Payment</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>APR</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Net Savings (Per Month)</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>00000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Term Reduction</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>00000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Total Interest On New Loan</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>00000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Interest Saved/Lost</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>00000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Tax Benefit - Bracket</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.taxBenefitBracket} name='taxBenefitBracket' onChange={handleUpdate} id={`proposalitem-taxBenefitBracket-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>
      

      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Tax Benefit New</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>{props.cnt.item.taxBenefitNew}</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup variant="success"  className="justify-content-end">
        <InputGroup.Text >Tax Benefit Previous</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>{props.cnt.item.taxBenefitPrevious}</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>
      
        
       


    
      <ListGroup  sm={3}>
      <ListGroup.Item as="li"  active>Asset Accumulation</ListGroup.Item>
      <ListGroup.Item sm={3} >
        <Stack className="justify-content-center" direction="horizontal" gap={2}>
            <Form sm={3}>
                <Form.Check // prettier-ignore
                // reverse
                    type="switch"
                    id="custom-switch"
                    label={`Invest CashOut`}
                    defaultChecked={true}
                />
                
            </Form>
            <Badge  bg="dark">$200000</Badge>
        </Stack>
      </ListGroup.Item>



      <ListGroup.Item>
        <InputGroup className="justify-content-center">
        <InputGroup.Text>Rate Of Interest On Invest</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.rateOnInvest} name='rateOnInvest' onChange={handleUpdate} id={`proposalitem-rateOnInvest-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>



      <ListGroup.Item  >
      <Stack direction="horizontal"  className="justify-content-center" gap={2}>
      <Form  sm={3}>
        <Form.Check // prettier-ignore
        // reverse
            type="switch"
            id="custom-switch"
            label={`Invest Monthly Savings`}
            defaultChecked={true}
        />
        
      </Form>
      <Badge bg="dark">$930</Badge>
      </Stack>
      </ListGroup.Item>


      <ListGroup.Item>
      <Stack direction="vertical" gap={2}>
      <Badge bg="dark">Benefit After</Badge>
      <Badge bg="info">1 Year : $100</Badge>
      <Badge bg="success">3 Year : $200</Badge>
      <Badge bg="primary">5 Year : $300</Badge>
      </Stack>
      </ListGroup.Item>
      
    </ListGroup>

  
    </ListGroup>
    </Col>
        

    );
  }





  

  export {
  
    NewLoanProposalComponent
  }

  
