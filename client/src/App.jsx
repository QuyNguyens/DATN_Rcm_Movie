import { Routes,Route } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';
import { publicRoute } from './Routers';
function App() {

  return (
      <Routes>
        <Route path='/' element={<DefaultLayout/>}>
            {publicRoute.map((route,index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page/>}/>
            })}
        </Route>
      </Routes>
  )
}

export default App
