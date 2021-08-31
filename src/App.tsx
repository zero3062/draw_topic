import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'toastr/build/toastr.min.css';

import TopicList from './component/topicList';
import TopicRandom from './component/topicRandom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" />
        <Route path="/list" component={TopicList} />
        <Route path="/random" component={TopicRandom} />
      </Switch>
    </Router>
  );
}

export default App;
