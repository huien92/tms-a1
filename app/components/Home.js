import React from "react"
import ReactDOM from "react-dom/client"
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container container--narrow py-md-5">
      <title>Dashboard</title>
      <h1>Dashboard</h1>
      <h2>User Management</h2>
      <label>Create user, Update, Table here?</label><br/>
      <Link to="/CreateUser">Create User</Link><br/>
      <Link to="/UpdateEmail">Update</Link>
      <h3>User Profile</h3>
      <Link to="/ChangePassword">Change Password</Link>
    </div>
  )
}

export default Home
