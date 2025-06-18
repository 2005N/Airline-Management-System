import {Switch,Route, BrowserRouter} from "react-router-dom"; 
import {ToastContainer} from 'react-toastify';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import Contact from "./components/Pages/Contact"
import About from './components/Pages/About'
import Signup from "./components/Pages/Signup";
import CustomerPanel from "./components/Pages/CustomerPanel";
import ViewProfile from "./components/Pages/ViewProfile";
import AddReview from "./components/Pages/AddReview";
import BookTicket from "./components/Pages/BookTicket";
import AvailableFlights from "./components/Pages/AvailableFlights";
import Invoice from "./components/Pages/Invoice";
import BoardingPass from "./components/Pages/BoardingPass";
import ViewCustomerTickets from "./components/Pages/ViewCustomerTickets";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='top-center'/>
        <Switch>
          <Route path='/signup' component={Signup}/>
          <Route path='/CustomerPanel/:id' component={CustomerPanel}/> 
          <Route path="/viewProfile/:id" component={ViewProfile} />
          <Route path='/addreview/:id' component={AddReview}/>
          <Route path='/BookTicket/:id' component={BookTicket}/>
          <Route path='/AvailableFlights/:id' component={AvailableFlights}/>
          <Route path='/Invoice/:id' component={Invoice}/>
          <Route path='/BoardingPass/:id' component={BoardingPass}/>
          <Route path='/ViewCustomerTickets/:id' component={ViewCustomerTickets}/>
          <>
            <Navbar/>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path='/contact-us' component={Contact} />
          </> 
        </Switch>  
    </BrowserRouter>
  );
}

export default App;
