import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../project/portfolio-sidebar-list";
import PortfolioForm from "../project/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      projectItems: [],
      projectToEdit: {},
    };

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }

  clearPortfolioToEdit() {
    this.setState({
      projectToEdit: {},
    });
  }

  handleEditClick(projectItem) {
    this.setState({
      projectToEdit: projectItem,
    });
  }

  handleDeleteClick(projectItem) {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/portfolio_items/${projectItem.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          projectItems: this.state.projectItems.filter((item) => {
            return item.id !== projectItem.id;
          }),
        });

        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick error", error);
      });
  }

  handleEditFormSubmission() {
    this.getProjectItems();
  }

  handleNewFormSubmission(projectItem) {
    this.setState({
      projectItems: [projectItem].concat(this.state.projectItems),
    });
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError error", error);
  }

  getProjectItems() {
    axios
      .get(
        "https://demarcuscurrie.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.setState({
          projectItems: [...response.data.portfolio_items],
        });
      })
      .catch((error) => {
        console.log("error in getProjectItems", error);
      });
  }

  componentDidMount() {
    this.getProjectItems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <PortfolioForm
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission={this.handleEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearPortfolioToEdit={this.clearPortfolioToEdit}
            projectToEdit={this.state.projectToEdit}
          />
        </div>

        <div className="right-column">
          <PortfolioSidebarList
            handleDeleteClick={this.handleDeleteClick}
            data={this.state.projectItems}
            handleEditClick={this.handleEditClick}
          />
        </div>
      </div>
    );
  }
}
