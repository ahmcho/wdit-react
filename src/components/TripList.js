import React,{useState} from "react";
import { Link } from 'react-router-dom';
import useStyles from '../config/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Pagination from "@material-ui/lab/Pagination";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import paginate from '../utils/paginate';


const TripList = ({trips}) => {
    const classes = useStyles();
    const tripsArray = Object.values(trips);
    const [page, setPage] = useState(1);

    const onPageChange = (event, value) => {
        setPage(value);
    }

    return (
        <div className={classes.tripListRoot}>
          <List component="nav" aria-label="main mailbox folders">
            {paginate(tripsArray, 5, page).map((trip,index) => {
                return(
                    <ListItem
                        button
                        component={Link}
                        key={index}
                        to={`/trips/${trip._id}`}
                    >
                        <ListItemIcon>
                            <CardTravelIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary={trip.description} />
                    </ListItem>
                )
            })}
          </List>
          <Divider />
          <Pagination color="primary"  count={Math.ceil(tripsArray.length/5)} page={page} onChange={onPageChange} />
        </div>
    );
}

export default TripList;