import { useState } from 'react'
import AppRoutes from "./routes/AppRoutes";
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppRoutes />
    </div>
  //   <Router>
  //   <div>
  //     {/* Navigation Links (Optional) */}
  //     <nav>
  //       <Link to="/">Start Page</Link> | <Link to="/requestbook">Request Book Page</Link> | <Link to="/search">Search Page</Link>
  //     </nav>

  //     {/* Define Routes */}
  //     <Routes>
  //       <Route path="/" element={<StartPage />} />
  //       <Route path="/requestbook" element={<RequestBook />} />
  //       <Route path="/search" element={<SearchPage />} />
  //     </Routes>
  //   </div>
  // </Router>
  );
};

// function StartPage() {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     // Navigate programmatically
//     navigate("/search");
//   };

//   return (
//     <div>
//       <h1>Start Page</h1>
//       <button onClick={handleNavigate}>Go to Search Book</button>
//     </div>
//   );
// }

// function RequestBook() {
//   return (
//     <div>
//       <h1>Request Book Page</h1>
//       <p>Welcome! This is the Request Book Page.</p>
//     </div>
//   );
// }

// function SearchPage() {
//   return (
//     <div>
//       <h1>Search Page</h1>
//       <p>Welcome! This is the Search Page.</p>
//     </div>
//   );
// }

export default App
