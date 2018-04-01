import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { getCategoriesTAC } from '../utils/helpers';

class Sidebar extends Component {
  componentDidMount() {
    this.props.getCategoriesTAC();
  }

  render() {
    const { categories } = this.props;
    const categoryList = categories ? Object.values(categories) : [];

    return (
      <aside className="sidebar">
        <nav id="sidebarLinks">
          <NavLink to="/posts/create" className="a-btn btn-primary">
            New Post
          </NavLink>

          <p id="categoriesTitle">
            Categories
          </p>
          <div id="categoryList">
            <NavLink exact to="/" activeClassName="selected">
              All
            </NavLink>
            {categoryList.map(category =>
              <NavLink exact to={`/${category.path}`} activeClassName="selected" key={category.path}>
                {category.name}
              </NavLink>)}
          </div>
        </nav>
      </aside>
    );
  }
}

const mapStateToProps = ({ categories }) => ({ categories: categories.byPath });

export default withRouter(connect(mapStateToProps, { getCategoriesTAC })(Sidebar));
