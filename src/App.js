import React from 'react';
import logo from './pacific-financial-logo.jpg';
import './App.css';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
 import './custom.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';

function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UserInputsComponentHeader />
        <UserInputsComponentForm />
        <Example1/>
      </header>
    </div>
  );
}

function UserInputsComponentHeader() {
  const [personName,setPersonName] = React.useState('');
  return (
    <div className="UserInputs">
         
            <h1>Pacific Financial Mortgage Calculator {personName}</h1>
            {/* <input type="text" onChange={(e) => setPersonName(e.target.value)}/> */}
    
    </div>
  );
}



function UserInputsComponentForm() {
  const [newCompany, setCompany] = React.useState("");
  const [newPosition, setPosition] = React.useState("");
  const [newLink, setNewLink] = React.useState("");
  const [newDate, setNewDate] = React.useState("");
  const [newNote, setNewNote] = React.useState("");

  return (
        <form>
          <input
            value={newCompany}
            onChange={(e) => setCompany(e.target.value)}
            label="Company"
            placeholder="Company"
          />
          <input
            value={newPosition}
            onChange={(e) => setPosition(e.target.value)}
            label="Job Title"
            placeholder="Job Title"
          />
          <input
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            label="Job Link"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            label="Note"
          />
          <button type="submit"> Submit </button>
        </form>
  );
}

function Example1() {
  return (
    <div>
      <h1>
        Example heading
        <Badge bg="secondary" as={Button}>
          New
        </Badge>
      </h1>
    </div>
  );
}


export default App;
