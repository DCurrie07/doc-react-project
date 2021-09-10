  
import React, { Component} from "react";
import { Link } from "react-router-dom";

export default class ProjectItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectItemClass: ""
    };
  }

  handleMouseEnter() {
    this.setState({ projectItemClass: "image-blur" });
  }

  handleMouseLeave() {
    this.setState({ projectItemClass: "" });
  }

  render() {
    const { id, description, thumb_image_url, logo_url} = this.props.item
    return (
      <Link to={`/project/${id}`}>
        <div 
          className="project-item-wrapper"
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
        >
          <div
            className={"project-img-background " + this.state.projectItemClass}
            style={{
              backgroundImage: "url(" + thumb_image_url + ")"
            }}
          />

          <div className="img-text-wrapper">
            <div className="logo-wrapper">
              <img src={logo_url} />
            </div>

            <div className="subtitle">{description}</div>
          </div>
        </div>
      </Link>
    );
  }
}