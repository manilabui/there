import React, { Fragment, useRef } from 'react';
import FestCard from './FestCard';
import { toLower } from 'lodash';
import './FestList.css';

export default props => {
    const { fests, updateFestList, getAllFests } = props;
    const searchInput = useRef();
    
    const getSearchResults = () => {
        const userInput = toLower(searchInput.current.value);
        const results = fests.filter(({ name, location }) => {
            return toLower(name).includes(userInput) || toLower(location).includes(userInput);
        });
        // If search is empty, then get all fests
        userInput ? updateFestList(results) : getAllFests();
    };

    const festNews = fests.map(fest => <FestCard key={fest.id} isNewsList={true} {...fest} {...props} />);

    return (
        <Fragment>
            <input
                className="search f7 br-pill pv1 mt2 mb3"
                type="text"
                id="search"
                ref={searchInput}
                onChange={getSearchResults}
                autoComplete='off'
                autoFocus='on'
                placeholder=''
            />
            {festNews}
        </Fragment>
    );
};