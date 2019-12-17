import React, { Fragment, useState, useEffect } from 'react';
import FestCard from '../fest/FestCard';

export default props => {
    const festCardArr = props.fests.map(({ event }) => {
    	return <FestCard key={event.id} isNewsList={false} {...event} {...props} />
    });

    return (
        <Fragment>
            <h5 className='fr pointer dim underline'>+ Create New Fest</h5>
            <div>{festCardArr}</div>
        </Fragment>
    );
};