import React from 'react';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';

const RatingBar = ({data}) => {
    if(data === 0){
        return <StarOutlineIcon color="secondary" />;
    }
    let stars = [];
    for (let i = 0; i < data; ++i) {
        stars.push(<StarIcon color="secondary" key={i} />)
    }
    return(
        <>
        {stars.map((item) => (
            item
        ))}
        </>
    )
}

export default RatingBar;