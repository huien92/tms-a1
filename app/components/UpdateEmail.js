import React, { useState } from 'react'
import Axios from 'axios'

function UpdateEmail() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [notif, setNotif] = useState("")

  const handleSubmit = (e) => {
		e.preventDefault();
		try {
			Axios.post('http://localhost:4000/updtemail', {username: "test2", email: "def@dot.com"
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
      <h2>Update Email</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username" className="text-muted mb-1">Username here?</label><br/>
      <label htmlFor="email" className="text-muted mb-1"> Enter new email: </label>
      <input onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
      <button type="submit">Update</button><br/>
      <h4>{notif}</h4>
      </form>
    </div>
  )
}

export default UpdateEmail