import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortByOptions, sortByOptionTexts, changeSortBy } from '../actions';
import PostItem from './PostItem';

class PostList extends Component {
  handleChangeSortBy = event => {
    const value = event.target.value;
    this.props.dispatch(changeSortBy(value));
  }

  render() {
    const { chosenSortBy, category, postList } = this.props;
    return (
      <div className="postList">
        <section id="postListHeader">
          <p id="catPosts">
            <span>
              {category ? `${category} category` : 'All categories'}
            </span>
            <span>: </span>
            <span>{postList.length}</span>
            <span> posts</span>
          </p>
          <label htmlFor="sortBy" id="sortBy">
            Sort By:
            <select name="sortBy" value={chosenSortBy} onChange={this.handleChangeSortBy}>
              {Object.keys(sortByOptionTexts).map((sortByKey, index) =>
                <option key={index} value={sortByKey}>{sortByOptionTexts[sortByKey]}</option>)
              }
            </select>
          </label>
        </section>
        {postList === undefined || postList.length === 0 ?
          <div className="noPostsFound"><h3>No posts found</h3></div> :
          <div className="postListBody">
            {postList.sort((a, b) => {
              switch (chosenSortBy) {
                case sortByOptions.DATE_OLD_TO_NEW:
                  return a.timestamp - b.timestamp;
                case sortByOptions.VOTE_LOW_TO_HIGH:
                  return a.voteScore - b.voteScore;
                case sortByOptions.VOTE_HIGH_TO_LOW:
                  return b.voteScore - a.voteScore;
                default:
                  return b.timestamp - a.timestamp;
              }
            }).map(post => <PostItem post={post} key={post.id} />)}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ chosenSortBy }) => ({ chosenSortBy });

export default connect(mapStateToProps)(PostList);
