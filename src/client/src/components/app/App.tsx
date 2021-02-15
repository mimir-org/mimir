import { Route } from 'react-router';
import Container from '@material-ui/core/Container';

import { Header, Home, Footer } from '..';

const App = () => {  
    return (
      <Container className="app">
        <Header />
        <Route exact path='/' component={Home} />
        <Footer />
      </Container>
    ); 
};

export default App;
