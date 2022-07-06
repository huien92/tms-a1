import React, { useState } from 'react'
import Axios from 'axios'

function CreateUser() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [notif, setNotif] = useState("")

  const handleSubmit = (e) => {
		e.preventDefault();
		try {
			Axios.post('http://localhost:4000/createuser', {username, password, email
    }).then((response) => {
      console.log(response.data);
      setNotif(response.data);
    })
		} catch(e) {
			console.log("Error encountered");
		}
	}

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username" className="text-muted mb-1">Username: </label>
      <input onChange={e => setUsername(e.target.value)} type="text" name="username" placeholder="Username" /><br/>
      <label htmlFor="password" className="text-muted mb-1">Password: </label>
      <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" /><br/>
      <label htmlFor="email" className="text-muted mb-1">Email: </label>
      <input onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Email" /><br/>
      <button type="submit">Submit</button><br/>
      <h3>{notif}</h3>
      </form>
    </div>
  )
}

export default CreateUser