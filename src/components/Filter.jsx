import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import styles from './Filter.module.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 580,
        width: '100%',
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
        marginTop: ".3rem",
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
        width: 'auto',
        borderRight: '.1rem solid #949494'
    },
    price_title: {
        marginRight: '.5rem',
    },
    input: {
        width: '5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem'
    },
}));

function Filter({sellers, value, setValue, inStock, setInStockValue, setSellers}) {
    const [sliderValue, setSliderValue] = useState([0, 1000]);
    const [sliderMin, setSliderMin] = useState(0);
    const [sliderMax, setSliderMax] = useState(100000);
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
        setValue(newValue);
        setSliderValue(newValue)
    };
    const handleMinInputChange = (event) => {
        setValue([event.target.value, sliderValue[1]]);
        setSliderValue([event.target.value, sliderValue[1]]);

    };
    const handleMaxInputChange = (event) => {
        setValue([sliderValue[0], event.target.value]);
        setSliderValue([sliderValue[0], event.target.value]);
    };
    const handleInStockChange = () => {
        setInStockValue(!inStock);
    };
    const handleSellersChange = (event) => {
        setSellers({ ...sellers, [event.target.name]: event.target.checked })
    };
    useEffect(() => {
        setSliderValue(value);
        setSliderMin(value[0]);
        setSliderMax(value[1]);
        console.log(value)
    }, []);
    return (
        <div className={styles.filter_block}>
            {/*<div className="d-flex align-items-center font-weight-bold">
                Фильтр:
            </div>*/}
            <List className={classes.root}>
                <ListItem className={classes.in_stock_filter}>
                    <FormControlLabel className={classes.in_stock_label}
                        control={<Checkbox color="primary" checked={inStock} onChange={handleInStockChange} name="inStock" />}
                        label="В наличии"
                    />
                </ListItem>
                <div className={classes.div_nested}>
                    <ListItem button className={classes.list_item_nested} onClick={handleSellersClick}>
                       Продавцы
                        {openSellers ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={openSellers} timeout="auto" unmountOnExit>
                        <List className={classes.stores} component="div" disablePadding>
                            {Object.keys(sellers).map((seller) => (
                                <ListItem className={classes.nested}>
                                    <FormControlLabel
                                        control={<Checkbox checked={sellers[seller]} onChange={handleSellersChange} name={seller} />}
                                        label={seller}
                                    />
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
                                    min={sliderMin}
                                    max={sliderMax}
                                    step={0.01}
                                    valueLabelDisplay={"off"}
                                    value={sliderValue}
                                    onChange={rangeSelector}
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