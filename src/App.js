import React from 'react';
import './App.css';
import { Button , Container, Badge,Stack,Card,CloseButton,Table,Tab,Tabs,Toast} from 'react-bootstrap';
import './custom.scss';
import HeaderComponent,{UserInputsComponentHeader} from './Components/HeaderComponent';
import {LoanInputComponent,AllLoanComponents} from './Components/LoanFormComponent.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';

function App() {
  
 
  return (
    <div>
      <HeaderComponent/>
      <AllLoanComponents/>
    </div>
  );

}







export default App;
