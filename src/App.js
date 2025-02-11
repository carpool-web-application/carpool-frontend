import "./App.css";

import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("./Navbar/Navbar"));
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
    </Suspense>
  );
}

export default App;
