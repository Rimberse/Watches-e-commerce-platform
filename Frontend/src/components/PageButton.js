import React from 'react';
import '../styles/PageButton.css';

const PageButton = ({ page, active, loadPage }) => {
    return(
        <button type="button" onClick={loadPage} className={ (active) ? 'page-button active' : 'page-button'}>{ page }</button>
    );
};

export default PageButton;