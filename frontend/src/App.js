import { AuthProvider } from "./contexts/auth-context";
import { BrowserRouter as Router } from "react-router-dom";
import Layouts from "./pages/Layouts";

const App = () => (
  <AuthProvider>
    <Router>
      <Layouts />
    </Router>
  </AuthProvider>
); 

export default App;
