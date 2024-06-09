import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'



// style
import './scss/app.scss'

// components
import Header from './components/Header/Header'

// pages
import Home from './pages/Home'
// import Cart from './pages/Cart'
// import NotFound from './pages/NotFound'



const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
	return (
		<>
			<div className="wrapper">
				<Header></Header>
				<div className="content">
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={
							<Suspense fallback={<div>Loading...</div>}>
								<Cart />
							</Suspense>
						} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</>
	)
}

export default App
