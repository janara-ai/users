import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      users: [],
      inputValue: '',
      gender: ''
    }
    
  }
  fetchUsersData = async() => {
    fetch('https://randomuser.me/api/?results=80')
    .then(res => res.json())
    .then(data => this.setState({users: data.results}))
  }
  componentDidMount(){
    this.fetchUsersData()
  }

  render(){
    const {users, inputValue,gender} = this.state;
   const filteredUsers = users.filter(person =>{
    return (person.name.first.toLowerCase().substr(0, inputValue.length) === inputValue.toLowerCase())
   }
   )
   const filteredGenderUser = filteredUsers.filter((el) => {
    if(!gender) return true;
    return el.gender === gender
   })
    return(
      <div className='App'>
        <div className='input-wrapper'>
          <input value={inputValue} onChange={(e) => this.setState({inputValue: e.target.value})}/>
        </div>
        <div className='radio-wrapper'>
          <label>
            Male
            <input type='radio' name='gender' onChange={() => this.setState({gender: 'male'})} checked={this.state.gender === 'male'}/>
          </label>
          <label>
            Female
            <input type='radio' name='gender' onClick={() => this.setState({gender: 'female'})} checked={this.state.gender === 'female'}/>
          </label>
        </div>
       {
        filteredGenderUser.length ? (
          filteredGenderUser.map((user) => {
            const {name, picture, location} = user;
            return(
              <div className='single-user'>
                <h3>{`${name.first} ${name.last}`}</h3>
                <img src={picture.medium}/>
                <p>{`${location.city}/${location.country}`}</p>
              </div>
  
           )
          })
  
        ) : <h1>Loading...</h1>
        
       }
      </div>
    )
  }
}

export default App;
