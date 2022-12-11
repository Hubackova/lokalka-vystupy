import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactAutoSuggest from "react-autosuggest";
import routes from "../../static/routes.json";

const Autosuggest = ({
  suggestions,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  getSuggestionValue,
  renderSuggestion,
  inputProps,
  error,
  ...props
}) => (
  <ReactAutoSuggest
    suggestions={suggestions}
    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
    onSuggestionsClearRequested={onSuggestionsClearRequested}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    inputProps={inputProps}
    {...props}
  />
);

Autosuggest.propTypes = {
  suggestions: PropTypes.array.isRequired,
  onSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  inputProps: PropTypes.object.isRequired,
  theme: PropTypes.object,
  error: PropTypes.string
};

const AutosuggestContainer = ({ ...props }) => {
  const [suggestions, setSuggestions] = useState([suggestions]);
  const [value, setValue] = useState("");

  const getSuggestions = value => {
    if (value.length < 3) return [];
    const inputValue = typeof value === "string" && value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : routes.filter(route => route.title.toLowerCase().slice(0, inputLength) === inputValue);
  };
  const getSuggestionValue = suggestion => suggestion.title;
  const renderSuggestion = suggestion => (
    <div
      name={suggestion.title}
      grade={suggestion.grade}
      sector={suggestion.sector}
      subregion={suggestion.subRegion}
      region={suggestion.region}
    >
      {suggestion.title} / {suggestion.grade} / {suggestion.sector} /  {suggestion.subRegion} / {suggestion.region}
    </div>
  );
  const onChange = (event, { newValue }) => setValue(newValue);
  const onSuggestionsFetchRequested = ({ value }) => setSuggestions(getSuggestions(value));
  const onSuggestionsClearRequested = () => setSuggestions(getSuggestions([]));
  const inputProps = {
    placeholder: "Zadej jméno cesty",
    value,
    onChange: onChange,
    ...props
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      {...props}
    />
  );
};

export default AutosuggestContainer;
