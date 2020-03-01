import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Heading extends Component {
	rendePrevPage = () => {
	  const { history } = this.props;
	  history.push(history.goBack());
	};

	render() {
	  const {
	    title, linkTitle, link, history
	  } = this.props;
	  const headingClassName = ['heading'];

	  return (
  <div className={headingClassName.join(' ')}>
    {link && (
    <div onClick={this.rendePrevPage} className="link">
      <i className="material-icons">keyboard_arrow_left</i>
      {linkTitle}
    </div>
    )}
    <h2 className="heading__text">{title}</h2>
  </div>
	  );
	}
}

export default withRouter(Heading);
