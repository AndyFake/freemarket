import React from 'react';
import uuid from 'uuid/v4';

export class MRelationControl extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.controlID = uuid();
    this.didInitialSearch = false;
  }

  componentDidMount() {
    const { value, field } = this.props;
    if (value) {
      const collection = field.get('collection');
      const searchFields = field.get('searchFields').toJS();
      this.props.query(this.controlID, collection, searchFields, value);
    }
  }

  componentDidUpdate(prevProps) {
    /**
     * Load extra post data into the store after first query.
     */
    if (this.didInitialSearch) return;
    if (
      this.props.queryHits !== prevProps.queryHits &&
      this.props.queryHits.get &&
      this.props.queryHits.get(this.controlID)
    ) {
      this.didInitialSearch = true;
      const suggestion = this.props.queryHits.get(this.controlID);
      if (suggestion && suggestion.length === 1) {
        const val = this.getSuggestionValue(suggestion[0]);
        this.props.onChange(val, {
          [this.props.field.get('collection')]: { [val]: suggestion[0].data },
        });
      }
    }
  }

  onChange = (event, { newValue }) => {
    this.props.onChange(newValue);
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const value = this.getSuggestionValue(suggestion);
    this.props.onChange(value, {
      [this.props.field.get('collection')]: { [value]: suggestion.data },
    });
  };

  onSuggestionsFetchRequested = debounce(({ value }) => {
    if (value.length < 2) return;
    const { field } = this.props;
    const collection = field.get('collection');
    const searchFields = field.get('searchFields').toJS();
    this.props.query(this.controlID, collection, searchFields, value);
  }, 500);

  onSuggestionsClearRequested = () => {
    this.props.clearSearch();
  };

  getSuggestionValue = suggestion => {
    const { field } = this.props;
    const valueField = field.get('valueField');
    return suggestion.data[valueField];
  };

  renderSuggestion = suggestion => {
    const { field } = this.props;
    const valueField = field.get('displayFields') || field.get('valueField');
    if (valueField instanceof Array) {
      return (
        <span>
          {valueField.toJS().map(key => (
            <span key={key}>{new String(suggestion.data[key])} </span>
          ))}
        </span>
      );
    }
    return <span>{new String(suggestion.data[valueField])}</span>;
  };

  render() {
    const {
      value,
      isFetching,
      fetchID,
      forID,
      queryHits,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
    } = this.props;

    const inputProps = {
      placeholder: '',
      value: value || '',
      onChange: this.onChange,
      id: forID,
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
    };

    const suggestions = queryHits.get ? queryHits.get(this.controlID, []) : [];

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          focusInputOnSuggestionClick={false}
        />
        <Loader active={isFetching && this.controlID === fetchID} />
      </div>
    );
  }
}


export const MRelationPreview = ({ value }) => <WidgetPreviewContainer>{value}</WidgetPreviewContainer>;

MRelationPreview.propTypes = {
  value: PropTypes.node,
};