import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Row,Col,InputGroup,ListGroup,FloatingLabel,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';
import { pv,fv, pmt,rate } from 'financial'
import {PV, CUMIPMT, NPER,RATE,FV } from '@formulajs/formulajs'

 
  


  const calculateProposals = (loans,setLoans,liabilities,setLiabilities,proposals,setProposals) => {
     
  
    let newproposals = proposals.map((proposal) =>
         {

          let rate = (proposal.proposalInterestRate / 100) / 12;  

          var sumLoanBalance = 0;
          var sumLiabilityBalance = 0;
          loans.forEach(loan => sumLoanBalance += loan.currentBalance);
          liabilities.forEach(liability => sumLiabilityBalance += liability.balanceAmount);
          var totalBalanace = sumLoanBalance + sumLiabilityBalance

          const proposalOriginationFees = Math.ceil((proposal.proposalOriginationFeesRate / 100) * totalBalanace);
        
          const proposalDiscountFees = Math.ceil((proposal.proposalDiscountFeesRate / 100) * totalBalanace);

          const proposalLenderCredit = Math.ceil((proposal.proposalLenderCreditRate / 100) * totalBalanace) * -1;

          const total = proposalOriginationFees + proposalDiscountFees + proposal.proposalMiscFees + proposalLenderCredit;

          var newProposalLoanAmount = 0 ;
          if (proposal.inCC) {
          newProposalLoanAmount = total + totalBalanace;
          }else{
            newProposalLoanAmount = totalBalanace;
          }

          const newPayment = Math.ceil(pmt(rate, proposal.proposalTerm*12, newProposalLoanAmount)*-1);

          const apr = (RATE(proposal.proposalTerm*12,newPayment*-1,totalBalanace-total)*12).toFixed(4);

          var sumLoanCurrentPayments = 0;
          var sumLiabilityMonthlyPayments = 0;
          loans.forEach(loan => sumLoanCurrentPayments += loan.currentPayment);
          liabilities.forEach(liability => sumLiabilityMonthlyPayments += liability.monthlyPayment);

          var netSavingsPM = sumLoanCurrentPayments + sumLiabilityMonthlyPayments - newPayment;

          var termReduction = Math.ceil(NPER(rate,newPayment+netSavingsPM,totalBalanace,0,0)/12)

          var totalNewInterest = Math.ceil(CUMIPMT(rate, proposal.proposalTerm*12 ,totalBalanace, 1 , proposal.proposalTerm*12,0 )*-1)

          
          var sumLoanRemainingInterest = 0;
          var sumLiabilityInterest = 0;
          loans.forEach(loan => sumLoanRemainingInterest += Math.ceil(loan.remainingInterest));
          liabilities.forEach(liability => sumLiabilityInterest += Math.ceil(liability.interest));
          var sumOverallInterest = Math.ceil(sumLoanRemainingInterest) + Math.ceil(sumLiabilityInterest)
          var interestSavedLost = Math.ceil(sumOverallInterest) - Math.ceil(totalNewInterest)

          var taxBenefitNew = Math.ceil(proposal.taxBenefitBracket * totalBalanace * proposal.proposalInterestRate / 120000);

          var taxBenefitPrevious = 0
          loans.forEach(loan => taxBenefitPrevious += loan.deductibleCost)
          
          var investCashoutAmount =  sumLiabilityBalance 

          var investMonthlyAmount =  0 
          if (netSavingsPM <= 0) {
            investMonthlyAmount = 0;
          }else{
            investMonthlyAmount = netSavingsPM;
          }



          if (proposal.investCashoutCheck) {
            
          }else{
            
          }

          if (proposal.investMonthlyCheck) {
           
          }else{
            
          }

          var benefitAfter1Year = Math.ceil(FV(proposal.rateOnInvest/100, 1,-investMonthlyAmount*12,-investCashoutAmount,1));
          var benefitAfter3Year = Math.ceil(FV(proposal.rateOnInvest/100, 3,-investMonthlyAmount*12,-investCashoutAmount,1));
          var benefitAfter5Year = Math.ceil(FV(proposal.rateOnInvest/100, 5,-investMonthlyAmount*12,-investCashoutAmount,1));

           return  {...proposal,

            totalPreviousLoanBalance: totalBalanace,
            proposalOriginationFees: proposalOriginationFees,
            proposalDiscountFees: proposalDiscountFees,
            proposalLenderCredit: proposalLenderCredit,
            total: total,
            newProposalLoanAmount: newProposalLoanAmount,
            newPayment: newPayment,
            apr: apr,
            netSavingsPM: netSavingsPM,
            termReduction: termReduction,
            totalNewInterest: totalNewInterest,
            interestSavedLost: interestSavedLost,
            taxBenefitNew:taxBenefitNew,
            taxBenefitPrevious:taxBenefitPrevious,
            investCashoutAmount:investCashoutAmount,
            investMonthlyAmount:investMonthlyAmount,
            benefitAfter1Year: benefitAfter1Year,
            benefitAfter3Year: benefitAfter3Year,
            benefitAfter5Year: benefitAfter5Year

          
          }

                
           } )
           
        
           setProposals(newproposals)
     

      return ;
  }


  function NewLoanProposalComponent(props) {

    const {loans,setLoans,liabilities,setLiabilities,proposals,setProposals} = useContext(PacificDataContext);

    useEffect(() => {
        calculateProposals(loans,setLoans,liabilities,setLiabilities,proposals,setProposals)
    }, [loans,liabilities]);


   
  
    function handleUpdate(e) {
      

    //  e.preventDefault();
      var { name, value, id } = e.target;

      const idselected = id.split('-');

      if(e.target.type === 'checkbox')
      {
        if(e.target.checked)
          {
            value = 1
          }
          else{
            value = 0
          }
        
        
    }

      
      let new_proposal_data = proposals.map((proposal) => {

                                          if (proposal.proposalid === parseInt(idselected[3])) {
                                              return {
                                                  ...proposal,
                                                  [name]: parseFloat(value),
                                              };
                                          }
                                          return proposal;
                                      });
                                      // console.log(new_proposal_data)
        calculateProposals(loans,setLoans,liabilities,setLiabilities,new_proposal_data,setProposals)


     
      
    }

    function handleCloseProposal(e) {
      const { name, value, id } = e.target;
      const idselected = id.split('-');
      setProposals(proposals.filter((proposal) => { if (proposal.proposalid != parseInt(idselected[2])) return true; }));
     
    }


    
    var conditionInCC = true;
    if (props.cnt.item.inCC === 0){
      conditionInCC = false
    }else{
      conditionInCC = true
    }

    var conditionInvestCheckOut = true;
    if (props.cnt.item.investCashoutCheck === 0){
      conditionInvestCheckOut = false
    }else{
      conditionInvestCheckOut = true
    }

    var conditionInvestMonthlyCheck = true;
    if (props.cnt.item.investMonthlyCheck === 0){
      conditionInvestMonthlyCheck = false
    }else{
      conditionInvestMonthlyCheck = true
    }

    
   
  


    return (
  
    <Col id={`proposalitem-${props.cnt.index}-${props.id}`} lg={4} className="mb-5 p-3"> 

<ListGroup sm={4}>
      <ListGroup.Item as="li" active>
        <strong>New Loan Proposal - {props.cnt.index + 1} </strong>
        <CloseButton style={{position: 'absolute', top: 5, right: 5}} id={`proposalitem-${props.cnt.index}-${props.id}`} onClick={handleCloseProposal} />
      </ListGroup.Item>
      <ListGroup.Item>
      <Form.Select defaultValue={props.cnt.item.proposalTerm} id={`proposalitem-proposalTerm-${props.cnt.index}-${props.id}`} name='proposalTerm' onChange={handleUpdate} aria-label="Default select example" className="mb-3">
      <option value="5">5 Years</option>
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
        <InputGroup.Text>Total Previous Loan Balance</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.totalPreviousLoanBalance}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

        <ListGroup.Item>
        <InputGroup>
        <InputGroup.Text>Origination Fees %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalOriginationFeesRate} name='proposalOriginationFeesRate' onChange={handleUpdate} id={`proposalitem-proposalOriginationFeesRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.proposalOriginationFees}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup>
        <InputGroup.Text>Discount Fees %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalDiscountFeesRate} name='proposalDiscountFeesRate' onChange={handleUpdate} id={`proposalitem-proposalDiscountFeesRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.proposalDiscountFees}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup>
        <InputGroup.Text>Escrow/Misc. Fees</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.proposalMiscFees} name='proposalMiscFees' onChange={handleUpdate} id={`proposalitem-proposalMiscFeesRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup className="mb-3">
        <InputGroup.Text>Lender Credit %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalLenderCreditRate} name='proposalLenderCreditRate' onChange={handleUpdate} id={`proposalitem-proposalLenderCreditRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.proposalLenderCredit}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Total</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.total}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      {/* <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Pay Off</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item> */}

      <ListGroup.Item>
      <InputGroup className="justify-content-end">
        <InputGroup.Text><Form sm={3}>
                <Form.Check // prettier-ignore
                 reverse
                    type="switch"
                    id={`proposalitem-inCC-${props.cnt.index}-${props.id}`}
                    label={`In CC`}
                    defaultChecked={conditionInCC}
                    value = {conditionInCC}
                    name='inCC' 
                    onChange={handleUpdate}
                />
                
            </Form>
            </InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.newProposalLoanAmount}</div></InputGroup.Text>
      </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>New Payment</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.newPayment}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>APR</InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.apr}</div></InputGroup.Text>
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Net Savings (Per Month)</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div>{props.cnt.item.netSavingsPM}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Term Reduction</InputGroup.Text>
        {/* <InputGroup.Text>$</InputGroup.Text> */}
        <InputGroup.Text><div>{props.cnt.item.termReduction}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Total Interest On New Loan</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div>{props.cnt.item.totalNewInterest}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Interest Saved/Lost</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text><div>{props.cnt.item.interestSavedLost}</div></InputGroup.Text>
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
                    id={`proposalitem-investCashoutCheck-${props.cnt.index}-${props.id}`}
                    defaultChecked={conditionInvestCheckOut}
                    value = {conditionInvestCheckOut}
                    type="switch"
                    label={`Invest CashOut`}
                />
                
            </Form>
            <Badge  bg="dark">$ {props.cnt.item.investCashoutAmount}</Badge>
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
            label={`Invest Monthly Savings`}
            id={`proposalitem-investMonthlyCheck-${props.cnt.index}-${props.id}`}
            defaultChecked={conditionInvestMonthlyCheck}
            value = {conditionInvestMonthlyCheck}
        />
        
      </Form>
      <Badge bg="dark">$ {props.cnt.item.investMonthlyAmount}</Badge>
      </Stack>
      </ListGroup.Item>


      <ListGroup.Item>
      <Stack direction="vertical" gap={2}>
      <Badge bg="dark">Benefit After</Badge>
      <Badge bg="info">1 Year : ${props.cnt.item.benefitAfter1Year}</Badge>
      <Badge bg="success">3 Year : ${props.cnt.item.benefitAfter3Year}</Badge>
      <Badge bg="primary">5 Year : ${props.cnt.item.benefitAfter5Year}</Badge>
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

  
