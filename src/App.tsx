import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'toastr/build/toastr.min.css';

import TopicList from './component/topicList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TopicList} />
      </Switch>
    </Router>
  );
}

export default App;
