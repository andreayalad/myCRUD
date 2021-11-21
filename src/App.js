import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

const url="https://crudcrud.com/api/41d90f227c6843c8ae8e3da5a651e0ce";

class App extends Component {
state ={
  data:[]
}
  getMethod=()=>{
    axios.get(url).then(response=>{
      console.log(response.data);
    })
  }
  componentDidMount(){
    this.getMethod();
  }
  render(){
    return (
      <div className="App">
        <br/>
        <button className="btn btn-success">Agregar Empresa</button>
        <br/> <br/>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Pais</th>
              <th>Capital</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    );
  }
  
}

export default App;
