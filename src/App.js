import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import Order from './routes/order/order.component';
import config from './config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch(config.categoryApiUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data,
          isLoading: false,
          error: null,
        });
      })
      .catch(error => {
        this.setState({
          data: null,
          isLoading: false,
          error: error,
        });
      });
    }

  render() {
    const { data, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home data={data} />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='order' element={<Order />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
