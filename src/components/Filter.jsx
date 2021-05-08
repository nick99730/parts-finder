import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import styles from './Filter.module.css'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.palette.background.paper,
    },
    div_nested: {
        position: 'relative',
    },
    list_item_nested: {
        borderRight: '.1rem solid #949494',
        height: '3rem',
    },
    stores: {
        width: '100%',
        position: 'absolute',
        top: '100%',
        left: '0',
        zIndex: '1000',
        borderRadius: '.3rem',
        backgroundColor: '#eeeeee',
    },
    price_filter: {
        minWidth: '15rem',
        height: '3rem',
    },
    in_stock_filter: {
        height: '3rem',
        maxWidth: '9rem',
        borderRight: '.1rem solid #949494'
    },
    price_title: {
        marginRight: '2rem',
    },
    input: {
        width: '5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem'
    },
}));

function Filter({sellers, value, setValue}) {
    const [sliderValue, setSliderValue] = useState(value);
    const classes = useStyles();
    const [openSellers, setOpenSellers] = useState(false);
    const [openPrices, setOpenPrices] = useState(false);
    const handleSellersClick = () => {
        setOpenSellers(!openSellers);
    };
    const handlePricesClick = () => {
        setOpenPrices(!openPrices);
    };
    const rangeSelector = (event, newValue) => {
        //value = newValue;
        setValue(newValue);
        setSliderValue(newValue)
    };
    const handleMinInputChange = (event) => {
        //value = [event.target.value, sliderValue[1]];
        setValue([event.target.value, sliderValue[1]]);
        setSliderValue([event.target.value, sliderValue[1]]);

    };
    const handleMaxInputChange = (event) => {
        //value = [sliderValue[0], event.target.value];
        setValue([sliderValue[0], event.target.value]);
        setSliderValue([sliderValue[0], event.target.value]);
    };
    return (
        <div className={styles.filter_block}>
            <div className="d-flex align-items-center font-weight-bold">
                Фильтр:
            </div>
            <List className={classes.root}>
                <ListItem className={classes.in_stock_filter}>
                    <Form.Check inline label="В наличии" type="checkbox" id="inline-checkbox-1"/>
                </ListItem>
                <div className={classes.div_nested}>
                    <ListItem button className={classes.list_item_nested} onClick={handleSellersClick}>
                        <ListItemText primary="Продавцы"/>
                        {openSellers ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={openSellers} timeout="auto" unmountOnExit>
                        <List className={classes.stores} component="div" disablePadding>
                            {sellers.map((seller) => (
                                <ListItem className={classes.nested}>
                                    <Form.Check inline label={seller} type="checkbox" id={`inline-checkbox-${seller}`}/>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </div>
                <div className={classes.div_nested}>
                    <ListItem className={classes.price_filter} button onClick={handlePricesClick}>
                        <ListItemText className={classes.price_title} primary="Цена:"/>
                        <TextField
                            className={classes.input}
                            value={sliderValue[0]}
                            onChange={handleMinInputChange}
                            label="От"
                        />
                        <TextField
                            className={classes.input}
                            value={sliderValue[1]}
                            onChange={handleMaxInputChange}
                            label="До"
                        />
                    </ListItem>
                    <Collapse in={openPrices} timeout="auto" unmountOnExit>
                        <List className={classes.stores} component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <Slider
                                    min={0}
                                    max={10000}
                                    value={sliderValue}
                                    onChange={rangeSelector}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="input-slider"
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                </div>
            </List>
        </div>
    )
}

export default Filter;