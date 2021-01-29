import { Component } from "react";
import Container from '@material-ui/core/Container';

import { Header, Home, Footer } from './../../components';

class App extends Component {
  
  render() {
    return (
      <Container className="app">
        <Header />
        <Home />
        <Footer />
      </Container>
    );
  }
}

export default App;
