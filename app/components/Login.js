import React, { useState } from 'react'
import Axios from 'axios'

function Login() {
	const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
	
	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			Axios.post('http://localhost:4000/auth', {username: username, password: password
    }).then((response) => {
      console.log(response.data);
    })
		} catch(e) {
			console.log("Error encountered");
		}
	}

  return (
    <div className="login">
    <title>Login</title>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input onChange={e => setUsername(e.target.value)} type="text" name="username" placeholder="Username" id="username" required /><br/>
      <label>Password:</label>
      <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" id="password" required />
      <button type="submit">Login</button>
    </form>
    </div>
  )
}

export default Login