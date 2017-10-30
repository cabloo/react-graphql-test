import React from 'react';
import PropTypes from 'prop-types';

/**
 * Sortable component.
 */
export default class Sortable extends React.Component {

  static get DIR() {
    return {
      NONE: 0,
      ASC: 1,
      DESC: 2,
    };
  }

  static get ARROW() {
    const ARROW = {};

    ARROW[Sortable.DIR.DESC] = 'v';
    ARROW[Sortable.DIR.ASC] = '^';
    ARROW[Sortable.DIR.NONE] = '-';

    return ARROW;
  }

  constructor(props) {
    super(props);
    this.state = {
      direction: Sortable.DIR.NONE,
    };
    this._toggleSort = this._toggleSort.bind(this);
  }

  _toggleSort() {
    this.state.direction =
      this.state.direction === Sortable.DIR.ASC
        ? Sortable.DIR.DESC
        : Sortable.DIR.ASC;
    this.props.onSort(this.state.direction, this.props.col);
  }

  render() {
    return (
      <a role="link" tabIndex={0} onClick={this._toggleSort} style={{ cursor: 'pointer' }}>
        {Sortable.ARROW[this.state.direction]}
      </a>
    );
  }
}

Sortable.propTypes = {
  onSort: PropTypes.func.isRequired,
  col: PropTypes.any,
};

Sortable.defaultProps = {
  col: null,
};
