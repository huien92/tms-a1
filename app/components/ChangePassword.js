import React, { useState } from 'react'
import Axios from 'axios'

function ChangePassword() {
	const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notif, setNotif] = useState("")

  const handleSubmit = (e) => {
		e.preventDefault();
		try {
			Axios.post('http://localhost:4000/changepassword', {username, password
    }).then((response) => {
      console.log(response);
      setNotif(response.data);
    })
		} catch(e) {
			console.log("Error encountered");
		}
	}

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username" className="text-muted mb-1">Username here?</label><br/>
      <label htmlFor="password" className="text-muted mb-1">Change Password: </label>
      <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
      <button type="submit">Submit</button><br/>
      <h4>{notif}</h4>
      </form>
    </div>
  )
}

export default ChangePassword