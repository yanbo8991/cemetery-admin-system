import './App.css';
import CreateRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
    return (
        <Router>
            <CreateRoutes />
        </Router>
    );
}
export default App;
