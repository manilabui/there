import React, { Fragment, useRef } from 'react';
import FestCard from './FestCard';
import { toLower } from 'lodash';
import './FestList.css';

export default props => {
    const { fests, updateFestList } = props;
    const searchInput = useRef();
    
    const getSearchResults = () => {
        const userInput = toLower(searchInput.current.value);
        const results = fests.filter(({ name, location }) => {
            return toLower(name).includes(userInput) || toLower(location).includes(userInput);
        });
        // If search is empty, then get all fests
        userInput ? updateFestList(results) : props.getAllFests();
    };

    const festNews = fests.map(fest => <FestCard key={fest.id} isNewsList={true} {...fest} {...props} />);

    return (
        <Fragment>
            <input
                className="search"
                type="text"
                id="search"
                ref={searchInput}
                onChange={getSearchResults}
                placeholder=""
            />
            {festNews}
        </Fragment>
    );
};