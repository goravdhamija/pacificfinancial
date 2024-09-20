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
    currentPayment: 0
  },
  {
    loanid:230,
    loanAmount: 200000,
    termYears: 10,
    interestRate: 8.50,
    numberOfpaymentsMade: 12,
    currentBalance: 0,
    currentPayment: 0
  } 
]
  
  let [loans,setLoans] = useState(loansArray)
  
 
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
