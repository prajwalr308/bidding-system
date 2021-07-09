import logo from './logo.svg';
import './App.css';
import UploadForm from './components/UploadForm';
import { UserContextProvider } from './context';
import Navbar from './components/Navbar';


function App() {
  return (
    <UserContextProvider>
    <div className="App">
      <Navbar />
  <UploadForm />

  </div>
  </UserContextProvider>
  );
}

export default App;
