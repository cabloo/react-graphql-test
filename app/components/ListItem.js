/* @flow */

import React from 'react';

type Props = {
  author: string, // author of the publication
  title: string, // title of the publication
  id: any, // id reference for item
};

/**
 * Generic list item component
 * Parent component: List
 * Child component: N/A
 */
export default class ListItem extends React.Component {

  constructor(props: Props) {
    super(props);
  }

  props: Props;

  render() {
    return (
      <tr>
        <td>{this.props.author}</td>
        <td>{this.props.title}</td>
      </tr>
    );
  }
}
