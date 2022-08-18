import React from 'react';
import { useRoutes } from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Card from './pages/Card'

function App() {

	type MiniRoute = {
		path: string
		element: React.ReactNode
	}[]

	const routes: MiniRoute = [
		{ path: '/', element: <Login /> },
		{ path: '/records', element: <Card /> },
	]

	const elements = useRoutes([...routes])

	return elements
}

export default App;
