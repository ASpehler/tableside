import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';

{{! CSS_IMPORT !}}

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
