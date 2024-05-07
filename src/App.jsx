
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from '../Layout';
import DnDFlow from './pages/Dashboard';
import ViewItems from './pages/ViewItems';
import ViewSequence from './pages/ViewSequence';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: < Layout/>,
      children:[
        {
          path:"/",
          element:<DnDFlow/>
        },
        {
          path:"/viewsequence/:id",
          element:<ViewSequence/>
        },
        {
          path:"/view",
          element:<ViewItems/>
        }]
      }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;

