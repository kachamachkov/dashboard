import './App.css'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FeedbackDetails from './components/FeedbackDetails';

function App() {

  return (

    <div>
      <Header />

      <Routes>
        <Route path='/' element={<FeedbackList />} />
        <Route path='/submit-feedback' element={<FeedbackForm />} />
        <Route path='/feedback/:id' element={<FeedbackDetails />} />
      </Routes>
    </div>
  )
}

export default App;
