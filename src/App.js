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
    currentBalance: 0,
    currentPayment: 0,
    totalInterest:0,
    interestPaid:0,
    remainingInterest:0,
    remainingPrincipal:0,
    yearsLeft:0,
    deductible:35,
    deductibleCost:0
  },
  {
    loanid:230,
    loanAmount: 200000,
    termYears: 10,
    interestRate: 8.50,
    numberOfpaymentsMade: 12,
    currentBalance: 0,
    currentPayment: 0,
    totalInterest:0,
    interestPaid:0,
    remainingInterest:0,
    remainingPrincipal:0,
    yearsLeft:0,
    deductible:35,
    deductibleCost:0
  },
  {
    loanid:191,
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
]
  
  let [loans,setLoans] = useState(loansArray)

  // let loanObj = {
  //   loanAmount: 335000,
  //   termYears: 30,
  //   interestRate: 2.750,
  //   numberOfpaymentsMade: 36,
  //   currentBalance: 0,
  //   currentPayment: 0,
  //   totalInterest:0,
  //   interestPaid:0,
  //   remainingInterest:0,
  //   remainingPrincipal:0,
  //   yearsLeft:0,
  //   deductible:35,
  //   deductibleCost:0
  // }

  // let loansArray = [];

  
  //   loansArray.push({...loanObj,loanid: Math.random()})

  //   loansArray.push({...loanObj,loanid: Math.random()})

  
  // let [loans,setLoans] = useState(loansArray)
  
 

  
  return (
    <div>
    <PacificDataContext.Provider value={{loans,setLoans}}>
      <HeaderComponent/>
      <AllLoanComponents/>
    </PacificDataContext.Provider>
    </div>
  );

}







export default App;