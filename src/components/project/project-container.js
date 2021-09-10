import React, { Component } from "react";
import axios from "axios";

import ProjectItem from "./project-item";

export default class ProjectContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my project",
      isLoading: false,
      data: [],
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    if (filter === "CLEAR_FILTERS") {
      this.getProjectItems();
    } else {
      this.getProjectItems(filter);
    }
  }

  getProjectItems(filter = null) {
    axios
      .get("https://demarcuscurrie.devcamp.space/portfolio/portfolio_items")
      .then((response) => {
        if (filter) {
          this.setState({
            data: response.data.portfolio_items.filter((item) => {
              return item.category === filter;
            })
          }); 
        } else {
          this.setState({
            data: response.data.portfolio_items
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  projectItems() {
    return this.state.data.map((item) => {
      return <ProjectItem key={item.id} item={item} />;
    });
  }

  componentDidMount() {
    this.getProjectItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="homepage-wrapper">
        <div className="filter-links">
          <button
            className="btn"
            onClick={() => this.handleFilter("eCommerce")}
          >
            eCommerce
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Scheduling")}
          >
            Scheduling
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Enterprise")}
          >
            Enterprise
          </button>

          <button
            className="btn"
            onClick={() => this.handleFilter("CLEAR_FILTERS")}
          >
            All
          </button>
        </div>
        <div className="project-items-wrapper">{this.projectItems()}</div>
      </div>
    );
  }
}
