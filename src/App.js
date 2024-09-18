import React, { useState,useContext,useEffect } from 'react';
import './App.css';
import { Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import './custom.scss';
import HeaderComponent,{UserInputsComponentHeader} from './Components/HeaderComponent';
import {LoanInputComponent,AllLoanComponents} from './Components/LoanFormComponent.js';
import { PacificDataContext } from "./Components/PacificDataContext.js";

function App() {

  const loansArray = [{
    loanAmount: 335000,
    termYears: 30,
    interestRate: 2.750,
    NumberOfpaymentsMade: 30
  },
  {
    loanAmount: 200000,
    termYears: "i/o",
    interestRate: 8.50,
    NumberOfpaymentsMade: 120
  }
]
  
  const [loans,setLoans] = useState(loansArray)
  
 
  return (
    <div>
    <PacificDataContext.Provider value={loans}>
      <HeaderComponent/>
      <AllLoanComponents/>
    </PacificDataContext.Provider>
    </div>
  );

}







export default App;
