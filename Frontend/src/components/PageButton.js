import React from 'react';
import '../styles/PageButton.css';

const PageButton = ({ page, loadPage, isDisabled }) => {
    return(
        <button type="button" onClick={loadPage} className={'page-button'} disabled={isDisabled}>{ page }</button>
    );
};

export default PageButton;