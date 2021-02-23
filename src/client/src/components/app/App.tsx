import React from 'react';
import { Route } from 'react-router';

import { Header, Home, Footer, DiagramComponent } from '..';

const App = () => {  
    return (
      <React.Fragment>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/diagram' component={DiagramComponent} />
        <Route exact path='/treeview' component={Header} />
        <Footer />
      </React.Fragment>
    ); 
};

export default App;
