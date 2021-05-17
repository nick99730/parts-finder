import React, {useEffect, useState} from 'react';
import styles from './Filter.module.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.palette.background.paper,
    },
    div_nested: {
        position: 'relative',
    },
    list_item_nested: {
        borderRight: '1px solid rgba(224, 224, 224, .5)',
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
        borderRight: '1px solid rgba(224, 224, 224, .5)'
    },
    price_title: {
        marginRight: '.5rem',
    },
    input: {
        width: '5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem'
    },
    in_stock_label: {
        fontSize: '.6rem!important',
    },
    mui_svg: {
        '& .MuiSvgIcon-root': {
            fontSize: '1.2rem',
        }
    }
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
            <List className={classes.root}>
                <ListItem className={`${classes.in_stock_filter} ${styles.list_item} ${styles.in_stock_filter}`}>
                    <FormControlLabel className={`${styles.span_label} ${styles.in_stock_check}`}
                        control={<Checkbox className={classes.mui_svg} color="primary" checked={inStock} onChange={handleInStockChange} name="inStock" />}
                        label=""
                    />
                    <div className={styles.sellers_label}>В наличии</div>
                </ListItem>
                <div className={classes.div_nested}>
                    <ListItem button className={`${classes.list_item_nested} ${styles.sellers_label} ${styles.list_item}`} onClick={handleSellersClick}>
                       Продавцы
                        {openSellers ? <ExpandLess className={classes.mui_svg}/> : <ExpandMore className={classes.mui_svg}/>}
                    </ListItem>
                    <Collapse in={openSellers} timeout="auto" unmountOnExit>
                        <List className={classes.stores} component="div" disablePadding>
                            {Object.keys(sellers).map((seller) => (
                                <ListItem className={styles.list_item}>
                                    <FormControlLabel className={styles.span_label}
                                        control={<Checkbox className={classes.mui_svg} checked={sellers[seller]} onChange={handleSellersChange} name={seller} />}
                                        label={seller}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </div>
                <div className={classes.div_nested}>
                    <ListItem className={`${classes.price_filter} ${styles.list_item} ${styles.price_filter}`} button onClick={handlePricesClick}>
                        <div className={`${classes.price_title} ${styles.sellers_label}`}>Цена:</div>
                        <TextField
                            className={`${classes.input} ${styles.price_input}`}
                            value={sliderValue[0]}
                            onChange={handleMinInputChange}
                            label="От"
                        />
                        <TextField
                            className={`${classes.input} ${styles.price_input}`}
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