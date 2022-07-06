import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import CreateUser from './components/CreateUser'
import UpdateEmail from './components/UpdateEmail'
import ChangePassword from './components/ChangePassword'

function Index() {
  	return (
		<div className="index">
		  <BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Home" element={<Home />} />
				<Route path="/CreateUser" element={<CreateUser />} />
				<Route path="/UpdateEmail" element={<UpdateEmail />} />
				<Route path="/ChangePassword" element={<ChangePassword />} />
			</Routes>
			</BrowserRouter>
		</div>
	  )
  }

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Index />)


