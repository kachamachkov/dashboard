import './App.css'
import FeedbackForm from './components/feedbackForm/FeedbackForm'
import FeedbackList from './components/feedbackList/FeedbackList'
import { Routes, Route } from 'react-router-dom';
import FeedbackDetails from './components/feedbackList/feedbackDetails/FeedbackDetails';
import Header from './components/header/Header';

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
