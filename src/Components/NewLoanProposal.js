import React,{useState,useEffect, useContext} from 'react';
import logo from '../pacific-financial-logo.jpg';
import '../App.css';
import '../custom.scss';
import { Form,Row,Col,InputGroup,ListGroup,FloatingLabel,Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import { PacificDataContext } from './PacificDataContext';
import { pv,fv, pmt,rate } from 'financial'
import {PV, CUMIPMT, NPER,RATE,FV } from '@formulajs/formulajs'
import { NumericFormat } from 'react-number-format';
 
  


  const calculateProposals = (loans,setLoans,liabilities,setLiabilities,proposals,setProposals) => {
     
    
    let newproposals = proposals.map((proposal) =>
         {

          let rate = (proposal.proposalInterestRate / 100) / 12;  

          var sumLoanBalance = 0;
          var sumLiabilityBalance = 0;
          loans.forEach(loan => sumLoanBalance += loan.currentBalance);
        //  liabilities.forEach(liability => {if(liability.liabilityType != 3 ){return sumLiabilityBalance += liability.balanceAmount}});
          liabilities.forEach(liability => sumLiabilityBalance += liability.balanceAmount);

          var totalBalanace = sumLoanBalance + sumLiabilityBalance

          var totalPayOff = 0;
          proposal.payoffLoans.forEach((proposalLoanID, index) => {
            var getMatchedLoan = loans.filter(loan => loan.loanid == proposalLoanID);
            totalPayOff += getMatchedLoan[0].currentBalance;
          });
          proposal.payoffLiabilities.forEach((proposalLiabilityID, index) => {
            var getMatchedLoan = liabilities.filter(liability => liability.liabilityid == proposalLiabilityID);
           // if(getMatchedLoan[0].liabilityType != 3){
            totalPayOff += getMatchedLoan[0].balanceAmount;
           // }
          });

          const proposalOriginationFees = ((proposal.proposalOriginationFeesRate / 100) * totalPayOff);
        
          const proposalDiscountFees = ((proposal.proposalDiscountFeesRate / 100) * totalPayOff);

          const proposalLenderCredit = ((proposal.proposalLenderCreditRate / 100) * totalPayOff) * -1;

          const total = proposalOriginationFees + proposalDiscountFees + proposal.proposalMiscFees + proposalLenderCredit;

          var newProposalLoanAmount = 0 ;
          if (proposal.inCC) {
          newProposalLoanAmount = total + totalPayOff;
          }else{
            newProposalLoanAmount = totalPayOff;
          }

          const newPayment = (pmt(rate, proposal.proposalTerm*12, newProposalLoanAmount)*-1);

          var apr = RATE(proposal.proposalTerm*12,newPayment*-1,totalPayOff-total)*12;
          var aprPrint = parseFloat((apr * 100).toFixed(3));

          var sumLoanCurrentPayments = 0;
          var sumLiabilityMonthlyPayments = 0;

          loans.forEach((loan) => {
            if(proposal.payoffLoans.includes(loan.loanid))
           { sumLoanCurrentPayments += loan.currentPayment }
          });  
         // liabilities.forEach((liability) => {if(liability.liabilityType != 3 ){sumLiabilityMonthlyPayments += liability.monthlyPayment}});
          liabilities.forEach((liability) => {
            if(proposal.payoffLiabilities.includes(liability.liabilityid))
           {sumLiabilityMonthlyPayments += liability.monthlyPayment}
         });

          var netSavingsPM = sumLoanCurrentPayments + sumLiabilityMonthlyPayments - newPayment;

          var termReduction = NPER(rate,-(newPayment+netSavingsPM),totalPayOff,0,0)/12
          var termReductionPrint = parseFloat((termReduction).toFixed(1));

          var totalNewInterest = CUMIPMT(rate, proposal.proposalTerm*12 ,totalPayOff, 1 , proposal.proposalTerm*12,0 )*-1

          var sumLoanRemainingInterest = 0;
          var sumLiabilityInterest = 0;
          loans.forEach(loan => sumLoanRemainingInterest += loan.remainingInterest);
          liabilities.forEach((liability) => {
            if (!isNaN(liability.interest)) {
              sumLiabilityInterest += liability.interest;
            }
          });
          var sumOverallInterest = sumLoanRemainingInterest + sumLiabilityInterest
          var interestSavedLost = sumOverallInterest - totalNewInterest

          var taxBenefitNew = proposal.taxBenefitBracket * totalPayOff * proposal.proposalInterestRate / 120000;

          var taxBenefitPrevious = 0
          loans.forEach(loan => taxBenefitPrevious += loan.deductibleCost)

          var investCashoutAmount = 0
          liabilities.forEach((liability) =>  { 
                // if(liability.liabilityType === 3) {
                  investCashoutAmount += liability.balanceAmount;
                // }  
            
            })
          
        

          var investMonthlyAmount =  0 
          if (netSavingsPM <= 0) {
            investMonthlyAmount = 0;
          }else{
            investMonthlyAmount = netSavingsPM;
          }



          if (proposal.investCashoutCheck) {
            
          }else{
            investCashoutAmount = 0;
          }

          if (proposal.investMonthlyCheck) {
           
          }else{
            investMonthlyAmount = 0;
          }

          var benefitAfter1Year = FV(proposal.rateOnInvest/100, 1,-investMonthlyAmount*12,-investCashoutAmount,1);
          var benefitAfter3Year = FV(proposal.rateOnInvest/100, 3,-investMonthlyAmount*12,-investCashoutAmount,1);
          var benefitAfter5Year = FV(proposal.rateOnInvest/100, 5,-investMonthlyAmount*12,-investCashoutAmount,1);

           return  {...proposal,

            totalPreviousLoanBalance: totalBalanace,
            proposalOriginationFees: proposalOriginationFees,
            proposalDiscountFees: proposalDiscountFees,
            proposalLenderCredit: proposalLenderCredit,
            total: total,
            totalPayOff:totalPayOff,
            newProposalLoanAmount: newProposalLoanAmount,
            newPayment: newPayment,
            apr: aprPrint,
            netSavingsPM: netSavingsPM,
            termReduction: termReductionPrint,
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
           
        
           setProposals(newproposals);

          

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

    function handleUpdateLoanPayoff(e) {

      const { name, value, id } = e.target;
      const idselected = id.split('-');
      const proposalIdSelected = idselected[3];
      const loanIdSelected = idselected[5];
     

      if(e.target.checked){

          let new_proposal_data = proposals.map((proposal) => {

            var internProposalLoanArrayNew = [...proposal.payoffLoans,parseInt(loanIdSelected)];
                  if (proposal.proposalid === parseInt(proposalIdSelected)) {
                      return {
                          ...proposal,
                          payoffLoans:internProposalLoanArrayNew
                          
                      };
                  }
                  return proposal;
              });

        calculateProposals(loans,setLoans,liabilities,setLiabilities,new_proposal_data,setProposals)

      }

      if(!e.target.checked){

        let new_proposal_data = proposals.map((proposal) => {

          if (proposal.proposalid === parseInt(proposalIdSelected)) {
             var internProposalLoanArrayNew = proposal.payoffLoans.filter(
                (loanid) => { 
                  if (parseInt(loanid) != parseInt(loanIdSelected)) return true; 
                })
           return {
                  ...proposal,
                  payoffLoans:internProposalLoanArrayNew
                  
              };
          }
          return proposal;
        });

        calculateProposals(loans,setLoans,liabilities,setLiabilities,new_proposal_data,setProposals)

      }



     
    }


    function handleUpdateLiabilityPayoff(e) {

      const { name, value, id } = e.target;
      const idselected = id.split('-');
      const proposalIdSelected = idselected[3];
      const liabilityIdSelected = idselected[5];
    


      if(e.target.checked){

        let new_proposal_data = proposals.map((proposal) => {

          var internProposalLiabilityArrayNew = [...proposal.payoffLiabilities,parseInt(liabilityIdSelected)];
                if (proposal.proposalid === parseInt(proposalIdSelected)) {
                    return {
                        ...proposal,
                        payoffLiabilities:internProposalLiabilityArrayNew
                        
                    };
                }
                return proposal;
            });

      calculateProposals(loans,setLoans,liabilities,setLiabilities,new_proposal_data,setProposals)

      }

      if(!e.target.checked){

      let new_proposal_data = proposals.map((proposal) => {

        if (proposal.proposalid === parseInt(proposalIdSelected)) {
           var internProposalLiabilityArrayNew = proposal.payoffLiabilities.filter(
              (liabilityid) => { 
                if (parseInt(liabilityid) != parseInt(liabilityIdSelected)) return true; 
              })
         return {
                ...proposal,
                payoffLiabilities:internProposalLiabilityArrayNew
                
            };
        }
        return proposal;
      });

      calculateProposals(loans,setLoans,liabilities,setLiabilities,new_proposal_data,setProposals)

      }


     
    }



    function handleInvestCashout(e) {

      const { name, value, id } = e.target;
      const idselected = id.split('-');
      const proposalIdSelected = idselected[3];
    


      if(e.target.checked){

        let new_proposal_data = proposals.map((proposal) => {

                if (proposal.proposalid === parseInt(proposalIdSelected)) {
                    return {
                        ...proposal,
                        investCashoutCheck: 1
                        
                    };
                }
                return proposal;
            });

      calculateProposals(loans,setLoans,liabilities,setLiabilities,new_proposal_data,setProposals)

      }

      if(!e.target.checked){

        let new_proposal_data = proposals.map((proposal) => {

          if (proposal.proposalid === parseInt(proposalIdSelected)) {
              return {
                  ...proposal,
                  investCashoutCheck: 0
                  
              };
          }
          return proposal;
      });

calculateProposals(loans,setLoans,liabilities,setLiabilities,new_proposal_data,setProposals)

      }


     
    }




    function handleinvestMonthlyCheck(e) {

      const { name, value, id } = e.target;
      const idselected = id.split('-');
      const proposalIdSelected = idselected[3];
    


      if(e.target.checked){

        let new_proposal_data = proposals.map((proposal) => {

                if (proposal.proposalid === parseInt(proposalIdSelected)) {
                    return {
                        ...proposal,
                        investMonthlyCheck: 1
                        
                    };
                }
                return proposal;
            });

      calculateProposals(loans,setLoans,liabilities,setLiabilities,new_proposal_data,setProposals)

      }

      if(!e.target.checked){

        let new_proposal_data = proposals.map((proposal) => {

          if (proposal.proposalid === parseInt(proposalIdSelected)) {
              return {
                  ...proposal,
                  investMonthlyCheck: 0
                  
              };
          }
          return proposal;
      });

calculateProposals(loans,setLoans,liabilities,setLiabilities,new_proposal_data,setProposals)

      }


     
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
  
    <Col id={`proposalitem-${props.cnt.index}-${props.id}`} lg={6} className="mb-5 p-3"> 

<ListGroup sm={4}>
      <ListGroup.Item as="li" active>
        <strong>New Loan Proposal - {props.cnt.index + 1} </strong>
        <CloseButton style={{position: 'absolute', top: 5, right: 5}} id={`proposalitem-${props.cnt.index}-${props.id}`} onClick={handleCloseProposal} />
      </ListGroup.Item>
      <ListGroup.Item style={{backgroundColor: "#3399FF"}} >
      <Form.Select defaultValue={props.cnt.item.proposalTerm} id={`proposalitem-proposalTerm-${props.cnt.index}-${props.id}`} name='proposalTerm' onChange={handleUpdate} aria-label="Default select example" className="mb-3">
      <option value="5">5 Years</option>
      <option value="10">10 Years</option>
      <option value="15">15 Years</option>
      <option value="20">20 Years</option>
      <option value="25">25 Years</option>
      <option value="30">30 Years</option>
      </Form.Select>
      </ListGroup.Item>

      <ListGroup.Item style={{backgroundColor: "#3399FF"}} >
        
        <InputGroup>
        <InputGroup.Text>Proposed Interest Rate</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalInterestRate} name='proposalInterestRate' onChange={handleUpdate} id={`proposalitem-proposalInterestRate-${props.cnt.index}-${props.id}`} type="number" step={0.01} placeholder="00.00" />
          <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>
        </ListGroup.Item>

        <ListGroup.Item style={{backgroundColor: "#8D6EC7"}}  >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Total Previous Balance (Loans & Liabilities)</InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.totalPreviousLoanBalance)}</div></InputGroup.Text>
        </InputGroup>
        </ListGroup.Item>



      {loans.map((loan, index) => (
        
        
          <ListGroup.Item   style={{backgroundColor: "#B19CD9"}} >
          <InputGroup className="justify-content-end">
          <InputGroup.Text >Loan ({index+1}) Balance</InputGroup.Text>
            <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(loan.currentBalance)}</div></InputGroup.Text>
            <InputGroup.Text><Form sm={3}>
            
                    <Form.Check // prettier-ignore
                        reverse
                        type="switch"
                        id={`proposalitem-loanpayoff-${props.cnt.index}-${props.id}-${index}-${loan.loanid}`}
                        label={``}
                        defaultChecked={props.cnt.item.payoffLoans.includes(loan.loanid) ? true : false}
                        name ='payoffLoan' 
                        onChange={handleUpdateLoanPayoff}
                    />
                    
                    </Form>

                         
                  
              </InputGroup.Text>
            </InputGroup>
            </ListGroup.Item>

        ))}




      { liabilities.map((liabilty, index) => (


                //  (liabilty.liabilityType != 3) ?
                        
                //   (
                        <div>
                        <ListGroup.Item   style={{backgroundColor: "#CCCCFF"}} >
                        <InputGroup className="justify-content-end">
                        <InputGroup.Text >Liability ({index+1}) Balance</InputGroup.Text>
                          
                          <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(liabilty.balanceAmount)}</div></InputGroup.Text>
                          
                          <InputGroup.Text><Form sm={3}>
                                  <Form.Check // prettier-ignore
                                  reverse
                                      type="switch"
                                      id={`proposalitem-liabilitypayoff-${props.cnt.index}-${props.id}-${index}-${liabilty.liabilityid}`}
                                      label={``}
                                      defaultChecked={props.cnt.item.payoffLiabilities.includes(liabilty.liabilityid) ? true : false}
                                      name ='payoffLiability' 
                                      onChange={handleUpdateLiabilityPayoff}
                                  />
                                  
                                  </Form>
                            </InputGroup.Text>
                            </InputGroup>
                          </ListGroup.Item>

                          </div>
                  // ):(
                  //   <div>
                  //   </div>
                  // )
                
          ))}



        <ListGroup.Item style={{backgroundColor: "#BF90EE"}}  >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Total Payoff Selected Balance</InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.totalPayOff)}</div></InputGroup.Text>
        </InputGroup>
        </ListGroup.Item>



        <ListGroup.Item style={{backgroundColor: "#C7F6C7"}} >
        <InputGroup>
        <InputGroup.Text>Origination Fees %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalOriginationFeesRate} name='proposalOriginationFeesRate' onChange={handleUpdate} id={`proposalitem-proposalOriginationFeesRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.proposalOriginationFees)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item  style={{backgroundColor: "#C7F6C7"}} >
        <InputGroup>
        <InputGroup.Text>Discount Fees %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalDiscountFeesRate} name='proposalDiscountFeesRate' onChange={handleUpdate} id={`proposalitem-proposalDiscountFeesRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.proposalDiscountFees)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item  style={{backgroundColor: "#C7F6C7"}} >
        <InputGroup >
        <InputGroup.Text>Escrow/Misc. Fees</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.proposalMiscFees} name='proposalMiscFees' onChange={handleUpdate} id={`proposalitem-proposalMiscFeesRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item  style={{backgroundColor: "#C7F6C7"}} >
        <InputGroup className="mb-3">
        <InputGroup.Text>Lender Credit %</InputGroup.Text>
          <Form.Control defaultValue={props.cnt.item.proposalLenderCreditRate} name='proposalLenderCreditRate' onChange={handleUpdate} id={`proposalitem-proposalLenderCreditRate-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.proposalLenderCredit)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item  style={{backgroundColor: "#C7F6C7"}} >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Total Fees</InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.total)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      {/* <ListGroup.Item>
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Pay Off</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0000.00</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item> */}

      <ListGroup.Item   style={{backgroundColor: "#19A519"}} >
      
      <InputGroup className="justify-content-end">
      <InputGroup.Text >Proposed New Loan Amount</InputGroup.Text>
        <InputGroup.Text><Form sm={3}>
                <Form.Check // prettier-ignore
                 reverse
                    type="switch"
                    id={`proposalitem-inCC-${props.cnt.index}-${props.id}`}
                    label={`Include Closing Cost`}
                    defaultChecked={conditionInCC}
                    value = {conditionInCC}
                    name='inCC' 
                    onChange={handleUpdate}
                />
                
            </Form>
            </InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.newProposalLoanAmount)}</div></InputGroup.Text>
      </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item  style={{backgroundColor: "#008080"}} >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>New Monthly Payment</InputGroup.Text>
        <InputGroup.Text><div> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.newPayment)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item  style={{backgroundColor: "#E6E6FA"}} >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>APR</InputGroup.Text>
        <InputGroup.Text><div> {props.cnt.item.apr}</div></InputGroup.Text>
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item style={{backgroundColor: "#E6E6FA"}} >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Net Savings (Per Month)</InputGroup.Text>
        <InputGroup.Text><div>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.netSavingsPM)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item style={{backgroundColor: "#E6E6FA"}} >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Term Reduction</InputGroup.Text>
        {/* <InputGroup.Text>$</InputGroup.Text> */}
        <InputGroup.Text><div>{props.cnt.item.termReduction}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>


      <ListGroup.Item style={{backgroundColor: "#E6E6FA"}} >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Total Interest On New Loan</InputGroup.Text>
        <InputGroup.Text><div>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.totalNewInterest)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item style={{backgroundColor: "#E6E6FA"}} >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Interest Saved/Lost</InputGroup.Text>
        <InputGroup.Text><div>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.interestSavedLost)}</div></InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item style={{backgroundColor: "#D8BFD8"}} >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Tax Benefit - Bracket</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.taxBenefitBracket} name='taxBenefitBracket' onChange={handleUpdate} id={`proposalitem-taxBenefitBracket-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>
      

      <ListGroup.Item style={{backgroundColor: "#D8BFD8"}} >
        <InputGroup className="justify-content-end">
        <InputGroup.Text>Tax Benefit New</InputGroup.Text>
        <InputGroup.Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.taxBenefitNew)}</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item style={{backgroundColor: "#D8BFD8"}} >
        <InputGroup variant="success"  className="justify-content-end">
        <InputGroup.Text >Tax Benefit Previous</InputGroup.Text>
        <InputGroup.Text>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.taxBenefitPrevious)}</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>
      
        
       


    
      <ListGroup  sm={3}>
      <ListGroup.Item as="li"  active>Asset Accumulation</ListGroup.Item>
      <ListGroup.Item sm={3}  style={{backgroundColor: "#87CEFA"}}  >
        <Stack className="justify-content-center" direction="horizontal" gap={2}>
            <Form sm={3}>
                <Form.Check // prettier-ignore
                // reverse
                    id={`proposalitem-investCashoutCheck-${props.cnt.index}-${props.id}`}
                    defaultChecked={conditionInvestCheckOut}
                    value = {conditionInvestCheckOut}
                    type="switch"
                    label={`Invest CashOut`}
                    onChange={handleInvestCashout}
                />
                
            </Form>
            <Badge  bg="dark">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.investCashoutAmount)}</Badge>
        </Stack>
      </ListGroup.Item>



      <ListGroup.Item style={{backgroundColor: "#87CEFA"}} >
        <InputGroup className="justify-content-center">
        <InputGroup.Text>Rate Of Interest On Invest</InputGroup.Text>
        <Form.Control defaultValue={props.cnt.item.rateOnInvest} name='rateOnInvest' onChange={handleUpdate} id={`proposalitem-rateOnInvest-${props.cnt.index}-${props.id}`} type="number" step={0.001} placeholder="000.000" />
        <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </ListGroup.Item>



      <ListGroup.Item  style={{backgroundColor: "#87CEFA"}}  >
      <Stack direction="horizontal"  className="justify-content-center" gap={2}>
      <Form  sm={3}>
        <Form.Check // prettier-ignore
        // reverse
            type="switch"
            label={`Invest Monthly Savings`}
            id={`proposalitem-investMonthlyCheck-${props.cnt.index}-${props.id}`}
            defaultChecked={conditionInvestMonthlyCheck}
            value = {conditionInvestMonthlyCheck}
            onChange={handleinvestMonthlyCheck}
            
        />
        
      </Form>
      <Badge bg="dark">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.investMonthlyAmount)}</Badge>
      </Stack>
      </ListGroup.Item>


      <ListGroup.Item style={{backgroundColor: "#87CEFA"}} >
      <Stack direction="vertical" gap={2}>
      <Badge bg="dark">Benefit After</Badge>
      <Badge bg="secondary">1 Year : {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.benefitAfter1Year)}</Badge>
      <Badge bg="success">3 Year : {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.benefitAfter3Year)}</Badge>
      <Badge bg="primary">5 Year : {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(props.cnt.item.benefitAfter5Year)}</Badge>
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

  
