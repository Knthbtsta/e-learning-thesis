import { RouterProvider } from "react-router-dom";
import Route from "./routes/Route";
import "intersection-observer";
import("preline");

function App() {
  return (
    <>
      <RouterProvider router={Route} />
    </>
  );
}

export default App;
