import React from "react";
import { Link } from 'react-router-dom';
import useStyles from '../config/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CardTravelIcon from "@material-ui/icons/CardTravel";



const TripList = ({trips}) => {
    const classes = useStyles();
    const listItems = Object.values(trips);
    return (
        <div className={classes.listRoot}>
          <List component="nav" aria-label="main mailbox folders">
            {listItems.map((item,index) => {
                return(
                    <ListItem
                        button
                        component={Link}
                        key={index}
                        to={`/trips/${item._id}`}
                    >
                        <ListItemIcon>
                            <CardTravelIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.description} />
                    </ListItem>
                )
            })}
          </List>
          <Divider />
        </div>
    );
}

export default TripList;