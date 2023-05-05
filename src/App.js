import { useState } from 'react';
// import './App.css';
// import { Text } from "./text"
// import { Fetch } from "./fetch"
// import { Method } from "./axiosMethod"
// import { Routerx } from "./Routerx";
// import { Pagination } from "./Pagination"
// import Paginate from './paginate'
import Comments from './Comments/Comments'


function App() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="App">
      {/* <button onClick={() => {
        setVisible(!visible)
      }}>add text</button>
      {visible && <Text />} */}

      {/* <Fetch /> */}

      {/* <Method /> */}
      {/* <Routerx /> */}
      {/* <Pagination /> */}
      {/* <Paginate /> */}
      <Comments currentUserId='1' />
    </div>

  );
}

export default App;
