import axios from 'axios'
import React, { Component } from 'react'

export class RegisterClass extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        category: 'T',
        password: ''
    }

    registerSubmit=(e)=>{
        e.preventDefault()

        const data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            category: this.state.category,
            password: this.state.password
        }

        axios.post("https://itticoursebaku.pythonanywhere.com/api/register/",data,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        ).then(resp=>{
            console.log(resp);
        })
    }

    firstNameInp=(e)=>{
        this.setState({
            firstName: e.target.value
        })
    }
    lastNameInp=(e)=>{
        this.setState({
            lastName: e.target.value
        })
    }
    emailInp=(e)=>{
        this.setState({
            email: e.target.value
        })
    }
    categorySelect=(e)=>{
        this.setState({
            category: e.target.value
        })
    }
    passwordInp=(e)=>{
        this.setState({
            password: e.target.value
        })
    }
  render() {
    const {firstName,lastName,email,category,password} = this.state
    return (
      <form onSubmit={this.registerSubmit.bind(this)}>
        <input value={firstName} onChange={this.firstNameInp.bind(this)} type="text" placeholder='first name'/>
        <input value={lastName} onChange={this.lastNameInp.bind(this)} type="text" placeholder='last name' />
        <input value={email} onChange={this.emailInp.bind(this)} type="email" placeholder='email' />
        <select value={category} onChange={this.categorySelect.bind(this)}>
            <option value="T">Teacher</option>
            <option value="S">Student</option>
        </select>
        <input value={password} onChange={this.passwordInp.bind(this)} type="password" placeholder='password' />
        <button>Submit</button>
      </form>
    )
  }
}

export default RegisterClass