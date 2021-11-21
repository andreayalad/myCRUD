import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

const url="https://crudcrud.com/api/41d90f227c6843c8ae8e3da5a651e0ce/unicorns";

class App extends Component {
state ={
  data:[]
}
  getMethod=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    })
  }
  componentDidMount(){
    this.getMethod();
  }
  render(){
    return (
      <div className="App">
        <br/>
        <button className="btn btn-success">Add unicorn</button>
        <br/> <br/>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Colour</th>
            </tr>
          </thead>
          <tbody>
              {this.state.data.map(unicorns=>{
                return(
                  <tr>
                  <td>{unicorns.name}</td>
                  <td>{unicorns.age}</td>
                  <td>{unicorns.colour}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default App;
