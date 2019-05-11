import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from './Autocomplete.module.css';

export class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };
  static defaultProperty = {
    suggestions: []
  };
  constructor(props) {
    super(props);
    this.state = {
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: this.props.value,
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });

    // send event on upper level to store in form state
    this.props.changed(e);
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.textContent
    });

    // send event on upper level to store in form state
    this.props.changed(e);
  };

  render() {
    const {
      onChange,
      onClick,
      state: {
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className={classes.suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
              console.log(filteredSuggestions.length);
              return (
                <li key={String(Math.random())} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className={classes['no-suggestions']}>
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <>
        <input
          type="search"
          onChange={onChange}
          value={userInput}
          className={this.props.inputClasses}
        />
        {suggestionsListComponent}
      </>
    );
  }
}

export default Autocomplete;