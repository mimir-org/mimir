import React from 'react';
import { Route } from 'react-router';

import { Header, Home, Footer, DiagramComponent, TreeviewComponent } from '..';

const App = () => {  
    return (
      <React.Fragment>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route path='/home/:type' component={Home} />
        <Footer />
      </React.Fragment>
    ); 
};

export default App;
