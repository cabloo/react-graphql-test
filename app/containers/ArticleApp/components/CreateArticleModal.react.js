import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';

export default class CreateArticleModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      author: '',
      title: '',
    };
    this._close = this._close.bind(this);
    this._submit = this._submit.bind(this);
    this._set = this._set.bind(this);
  }

  _set(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  _close() {
    this.props.onHide();
  }

  _submit() {
    this.props.onAdd({
      author: this.state.author,
      title: this.state.title,
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this._close}>
        <Modal.Header closeButton>
          <Modal.Title>Add an Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Author:
          <input type="text" name="author" onChange={this._set} /><br />
          Title:
          <input type="text" name="title" onChange={this._set} /><br />
        </Modal.Body>
        <Modal.Footer>
          <div className="pull-left">
            <Button onClick={this._close}>Close</Button>
          </div>
          <Button onClick={this._submit} bsStyle="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CreateArticleModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
