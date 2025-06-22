import { Routes, Route } from 'react-router-dom';
import './App.css'

import FeedbackForm from './components/feedbackForm/FeedbackForm'
import FeedbackList from './components/feedbackList/FeedbackList'
import FeedbackDetails from './components/feedbackList/feedbackDetails/FeedbackDetails';
import Header from './components/header/Header';

function App() {

  return (

    <div className='container'>
      <Header />

      <Routes>
        <Route path='/' element={<FeedbackList />} />
        <Route path='/submit-feedback' element={<FeedbackForm />} />
        <Route path='/feedback/:id' element={<FeedbackDetails />} />
      </Routes>
    </div>
  )
};

export default App;
