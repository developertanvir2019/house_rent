import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
}

export default App;
