import React, {useEffect, useState} from 'react';
import Filter from "./Filter";
import SellersTable from "./SellersTable";



function SellersWithFilter({sellers, tableSellersHead, tableSellersKeys}) {
    const [sliderValue, setSliderValue] = useState([Math.min(...sellers.map(s => s.price)), Math.max(...sellers.map(s => s.price))]);
    const [inStock, setInStockValue] = useState(false);
    const [filteredSellersDict, setFilteredSellersDict] = useState({});
    useEffect(() => {
        setFilteredSellersDict(Object.assign(...sellers.map((k) => ({[k.name]: false}))));
    }, []);
    return(
        <React.Fragment>
            {sellers.length > 1 ?
                <Filter sellers={filteredSellersDict} setInStockValue={setInStockValue} inStock={inStock} setSellers={setFilteredSellersDict} value={sliderValue} setValue={setSliderValue}/>
            : null}
            <SellersTable tableHeads={tableSellersHead} bodyKeys={tableSellersKeys} priceRange={sliderValue} filteredSellersNames={Object.keys(filteredSellersDict).filter(name => filteredSellersDict[name])}
                          sellersInfo={sellers} inStock={inStock}/>
        </React.Fragment>
    )
}

export default SellersWithFilter;