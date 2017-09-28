/* @flow */

import React from 'react';
import Relay from 'react-relay';
import ArticleItem from './ArticleItem';
import CreateArticleModal from "./CreateArticleModal.react";
import Sortable from "components/Sortable.react";
import AddArticleMutation from "../mutations/AddArticleMutation";

type ArticleEdge = {
  node: {
    id: string,
  },
};

type Props = {
  user: {
    id: any,
  },
  relay: {
    commitUpdate: Function,
  },
  articles: {
    edges: Array<ArticleEdge>, // eslint-disable-line
  },
};

const SORT = {
  AUTHOR: 1,
  TITLE: 2,
};

const SORT_KEY = {
  [SORT.AUTHOR]: 'author',
  [SORT.TITLE]: 'title',
};

/**
 * Article list component
 * Parent component: ArticleApp
 * Child component: ArticleItem
 */
class ArticleList extends React.Component {

  props: Props;

  static getSortValue(obj, col) {
    switch (col) {
      // Use toUpperCase() to ignore character casing
      case SORT.AUTHOR:
      case SORT.TITLE:
        return obj[SORT_KEY[col]].toUpperCase();
      default:
        throw new Error('Invalid sort');
    }
  }

  _toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      sort: {
        direction: null,
        col: null,
      },
      showModal: false,
    };
    this._sort = this._sort.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._onAdd = this._onAdd.bind(this);
  }

  /**
   * Sort the list of articles based on the way the user selected.
   */
  _sort(direction, col) {
    this.setState({
      sort: {direction, col,},
    });
  }

  /**
   * Event handler for when the user has successfully added an article.
   */
  _onAdd(article) {
    this.props.relay.commitUpdate(
      new AddArticleMutation({
        user: this.props.user,
        ...article,
      })
    );

    this.setState({
      showModal: false,
    });
  }

  render() {
    const articles = this._getSortedArticles();

    return (
      <div>
        <h4>
          Articles &nbsp;
          <a
            role="link"
            tabIndex={0}
            style={{cursor: 'pointer'}}
            onClick={this._toggleModal}
          >+</a>
        </h4>
        <table>
          <thead>
          <tr>
            <th>
              Author &nbsp;
              <Sortable col={SORT.AUTHOR} onSort={this._sort}/>
            </th>
            <th>
              Title &nbsp;
              <Sortable col={SORT.TITLE} onSort={this._sort}/>
            </th>
          </tr>
          </thead>
          <tbody>
          {articles.map((edge, key) =>
            <ArticleItem
              key={key}
              article={edge}
            />
          )}
          </tbody>
        </table>
        <CreateArticleModal
          show={this.state.showModal}
          onHide={this._toggleModal}
          onAdd={this._onAdd}
        />
      </div>
    );
  }

  _getSortedArticles() {
    let {
      articles,
    } = this.props;

    console.log(articles.edges[0].node);
    articles = articles.edges.slice().map((result) => result.node);

    const {
      col,
      direction,
    } = this.state.sort;

    if (col) {
      articles.sort((a, b) => {
        const valueA = ArticleList.getSortValue(a, col);
        const valueB = ArticleList.getSortValue(b, col);

        let comparison = 0;
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }

        if (direction === Sortable.DIR.DESC) {
          comparison *= -1;
        }

        return comparison;
      });
    }

    return articles;
  }
}

exports.ArticleList = ArticleList;

export default Relay.createContainer(ArticleList, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        ${AddArticleMutation.getFragment('user')}
      }
      `,
    articles: () => Relay.QL`
      fragment on ArticleConnection {
        edges {
          node {
            ${ArticleItem.getFragment('article')}
          }
        }
      }
      `,
  },
});
