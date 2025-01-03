import React, { useState,useContext,useEffect } from 'react';
import './App.css';
import { Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import './custom.scss';
import HeaderComponent from './Components/HeaderComponent';
import {LoanInputComponent,AllLoanComponents} from './Components/LoanFormComponent.js';
import { PacificDataContext } from "./Components/PacificDataContext.js";

function App() {


  let loansArray = [{
    loanid:189,
    loanAmount: 335000,
    termYears: 30,
    interestRate: 2.750,
    numberOfpaymentsMade: 36,
    currentBalance: 0.00,
    currentPayment: 0.00,
    totalInterest:0,
    interestPaid:0,
    remainingInterest:0,
    remainingPrincipal:0,
    yearsLeft:0,
    deductible:35,
    deductibleCost:0 }
    ,
    {loanid:190,
    loanAmount: 200000,
    termYears: 10,
    interestRate: 8.500,
    numberOfpaymentsMade: 12,
    currentBalance: 0.00,
    currentPayment: 0.00,
    totalInterest:0,
    interestPaid:0,
    remainingInterest:0,
    remainingPrincipal:0,
    yearsLeft:0,
    deductible:35,
    deductibleCost:0 }
  
]

let [loans,setLoans] = useState(loansArray)


  let liabilitiesArray = [{
    liabilityid:109,
    liabilityType:1,
    balanceAmount: 10000.00,
    monthlyPayment: 200.00,
    interestRate: 19.990,
    interest: 0,
    payoffYears: 0,
    
  }
  
  ,
  {
    liabilityid:119,
    liabilityType:1,
    balanceAmount: 0.00,
    monthlyPayment: 300,
    interestRate: 9.000,
    interest: 0,
    payoffYears: 0,
    
  }
,
  {
    liabilityid:129,
    liabilityType:3,
    balanceAmount: 200000,
    monthlyPayment: 0.00,
    interestRate: 0.00,
    interest: 0,
    payoffYears: 0,
    
  }
  
]

let [liabilities,setLiabilities] = useState(liabilitiesArray)



let proposalArray = [{
  proposalid:300,
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
  payoffLoans:[189,190],
  payoffLiabilities:[109,119,129],
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
 ,
 {
  proposalid:301,
  proposalTerm:10,
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
  payoffLoans:[189,190],
  payoffLiabilities:[109,119,129],
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

]

let [proposals,setProposals] = useState(proposalArray)

  

  return (
    <div>
    <PacificDataContext.Provider value={{loans,setLoans,liabilities,setLiabilities,proposals,setProposals}}>
      <HeaderComponent/>
      <AllLoanComponents   />
    </PacificDataContext.Provider>
    </div>
  );

}







export default App;
