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
    colour:'',
    modalType: ''
  }
}

  getMethod=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    })
  }

  postMethod=async()=>{
    delete this.state.form.name;
    await axios.post(url, this.state.form).then(response=>{
      this.modalInsert();
      this.getMethod();
    }).catch(error =>{
      console.log(error.message)
    })
  }

  patchMethod=()=>{
    axios.put(url+this.state.form.name, this.state.form).then(response=>{
      this.modalInsert();
      this.getMethod();
    })
  }  
  modalInsert=()=>{
    this.setState({modalInsert: !this.state.modalInsert});
  }
  selectUnicorn=(unicorns)=>{
    this.setState({
      modalType: 'update',
      form:{
        name: unicorns.name,
        age: unicorns.age,
        colour: unicorns.colour
      }
    })
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
        <button className="btn btn-success" onClick={()=>{this.setState({form:null, modalType:'add'}); this.modalInsert()}}>Add unicorn</button>
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
                  <td>
                    <button className="btn btn-primary" onClick={()=>{this.selectUnicorn(unicorns); this.modalInsert()}  }>Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
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
              <input className="form-control" type="text" name="name"  onChange={this.handleChange} value={form?form.name: ''}/>
              <br/>
              <label htmlFor="age">Age</label>
              <input className="form-control" type="number" name="age"  onChange={this.handleChange} value={form?form.age: ''}/>
              <br/>
              <label htmlFor="colour">Colour</label>
              <input className="form-control" type="text" name="colour"  onChange={this.handleChange} value={form?form.colour: ''}/>
              <br/>
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.modalType=='add'?
             <button className="btn btn-success" onClick={()=>this.postMethod()}>
             Add New
             </button>: <button className="btn btn-primary" onClick={()=>this.patchMethod()}>
               Edit
             </button>
            }
           
            <button className="btn btn-danger" onClick={()=>this.modalInsert()}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
}

export default App;
