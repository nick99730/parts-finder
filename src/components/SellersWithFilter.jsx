import React, {useEffect, useState} from 'react';
import Filter from "./Filter";
import SellersTable from "./SellersTable";
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";


const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = ({setShowFilter, showFilter}) => {
    const classes = useToolbarStyles();
    const clickShow = () => {
      setShowFilter(!showFilter);
    };
    return (
        <Toolbar>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Предложения
            </Typography>
            {showFilter ?
                <Tooltip title="Скрыть фильтр">
                    <IconButton aria-label="filter list" onClick={clickShow}>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip> :
                <Tooltip title="Показать фильтр">
                    <IconButton aria-label="filter list" onClick={clickShow}>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            }
        </Toolbar>
    );
};

function SellersWithFilter({sellers, tableSellersHead, tableSellersKeys}) {
    const [sliderValue, setSliderValue] = useState([Math.min(...sellers.map(s => s.price)), Math.max(...sellers.map(s => s.price))]);
    const [inStock, setInStockValue] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filteredSellersDict, setFilteredSellersDict] = useState({});
    useEffect(() => {
        setFilteredSellersDict(Object.assign(...sellers.map((k) => ({[k.name]: false}))));
    }, []);
    return(
        <React.Fragment>
            <EnhancedTableToolbar setShowFilter={setShowFilter} showFilter={showFilter}/>
            {sellers.length > 0 && showFilter ?
                <Filter sellers={filteredSellersDict} setInStockValue={setInStockValue} inStock={inStock} setSellers={setFilteredSellersDict} value={sliderValue} setValue={setSliderValue}/>
            : null}
            <SellersTable tableHeads={tableSellersHead} bodyKeys={tableSellersKeys} priceRange={sliderValue} filteredSellersNames={Object.keys(filteredSellersDict).filter(name => filteredSellersDict[name])}
                          sellersInfo={sellers} inStock={inStock}/>
        </React.Fragment>
    )
}

export default SellersWithFilter;