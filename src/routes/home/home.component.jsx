import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = (props) => {
  return (
    <div>
      <Directory data = {props.data}/>
      <Outlet />
    </div>
  );
};

export default Home;
