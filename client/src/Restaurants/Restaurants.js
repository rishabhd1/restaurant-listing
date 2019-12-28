import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Restaurants() {
  const classes = useStyles();

  const [restaurants, setRestaurants] = useState();
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    async function fetchRestaurants() {
      const response = await axios.get('/api/restaurants');
      setRestaurants(response.data.restaurants);
    }
    fetchRestaurants();
  }, []);

  const handleSortBy = async event => {
    const queryParam = event.target.value;
    setSortBy(queryParam);
    console.log(`HERE: ${sortBy}`);
    const response = await axios.get(`/api/restaurants?sort_by=${queryParam}`);

    if (response) {
      setRestaurants(response.data.restaurants);
    }
  };

  if (restaurants) {
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Sort By</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={sortBy}
            onChange={handleSortBy}
          >
            <MenuItem value='aggregate_rating'>Rating</MenuItem>
            <MenuItem value='votes'>Votes</MenuItem>
            <MenuItem value='average_cost_for_two'>Average Cost</MenuItem>
          </Select>
        </FormControl>
        <h1>RESTAURANT LIST</h1>
        <div>
          {restaurants.map(restaurant => {
            return (
              <ExpansionPanel key={restaurant.restaurant_id}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography className={classes.heading}>
                    <b>{restaurant.restaurant_name.toUpperCase()}</b>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Cuisines: {restaurant.cuisines}
                    <br />
                    Average Cost For Two: {restaurant.average_cost_for_two}
                    <br />
                    Currency: {restaurant.currency}
                    <br />
                    Has Table Booking: {restaurant.has_table_booking}
                    <br />
                    Has Online Deliver: {restaurant.has_online_delivery}
                    <br />
                    Rating: {restaurant.aggregate_rating}
                    <br />
                    Votes: {restaurant.votes}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className='loading'>
      <CircularProgress />
    </div>
  );
}
