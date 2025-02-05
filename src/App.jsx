import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./components/AuthContext";

function App() {
  const [count, setCount] = useState(0);

  return (
      <AppRoutes />
  )
}

export default App;
