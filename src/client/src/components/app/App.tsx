import { Route } from "react-router";
import { Header, Home, Footer } from "..";

const App = () => {
  return (
    <>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route path="/home/:type" component={Home} />
      <Footer />
    </>
  );
};

export default App;
