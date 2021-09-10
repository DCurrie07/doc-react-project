import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortfolioSidebarList = props => {
    const portfolioList = props.data.map(projectItem => {
        return (
            <div key={projectItem.id} className="portfolio-item-thumb">
                <div className="portfolio-thumb-img">
                    <img src={projectItem.thumb_image_url} />
                </div>

                <div className="text-content">
                    <div className="title">{projectItem.name}</div>
                    
                    <div className="actions">
                        <a 
                            className="action-icon" 
                            onClick={() => props.handleEditClick(projectItem)}
                        >
                            <FontAwesomeIcon icon="edit" />
                        </a>
                        
                        
                        <a 
                            className="action-icon" 
                            onClick={() => props.handleDeleteClick(projectItem)}
                        >
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                </div>
            </div>
        );
    });

    return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebarList;