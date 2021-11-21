import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

const url="https://crudcrud.com/api/0d82f290499e435196b6d650002abc3f/unicorns";

class App extends Component {
state ={
  data:[],
  modalInsert: false,
  form:{
    name:'',
    age:'',
    colour:''
  }
}

  getMethod=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    })
  }

  postMethod=async()=>{
    await axios.post(url, this.state.form).then(response=>{
      this.modalInsert();
      this.getMethod();
    }).catch(error =>{
      console.log(error.message)
    })
  }
  modalInsert=()=>{
    this.setState({modalInsert: !this.state.modalInsert});
  }

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
    console.log(this.state.form);
  }

  componentDidMount(){
    this.getMethod();
  }
  render(){
    const {form} =this.state;
    return (
      <div className="App">
        <br/>
        <button className="btn btn-success" onClick={()=>this.modalInsert()}>Add unicorn</button>
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
        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader style={{display: 'block'}}>
              <span style={{float: 'right'}}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input className="form-control" type="text" name="name"  onChange={this.handleChange} value={form.name}/>
              <br/>
              <label htmlFor="age">Age</label>
              <input className="form-control" type="number" name="age"  onChange={this.handleChange} value={form.age}/>
              <br/>
              <label htmlFor="colour">Colour</label>
              <input className="form-control" type="text" name="colour"  onChange={this.handleChange} value={form.colour}/>
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={()=>this.postMethod()}>
              Add New
            </button>
            <button className="btn btn-danger" onClick={()=>this.modalInsert()}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
}

export default App;
