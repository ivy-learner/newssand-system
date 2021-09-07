import IndexRouter from './router/indexRouter'
import './App.css'
// import { useEffect } from 'react'
// import axios from 'axios'
function App(){
//   useEffect(()=>{
//      axios.get("/ajax/movieOnInfoList?token=&optimus_uuid=CAE620400D1B11ECABFD15BE7F368D0D94611B6A83744D278D5971F4B6A9AAFF&optimus_risk_level=71&optimus_code=10").then(res=>{
//         console.log(res.data)
// })
// },[]) 
  return <div>
    <IndexRouter></IndexRouter>
  </div>
}
export default App