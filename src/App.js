import "./App.css";
import React, { Suspense, useEffect, useState } from "react";
import CarpoolApplication from "./CarpoolApplication.js";
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarpoolApplication />
    </Suspense>
  );
}

export default App;
