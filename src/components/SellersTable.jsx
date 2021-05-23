import React, {useEffect, useState} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles, lighten} from '@material-ui/core/styles';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import {red} from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import styles from './SellersTable.module.css';

const arrowUp = <FontAwesomeIcon className="ml-1" icon={faArrowDown} />;

const arrowDown = <FontAwesomeIcon className="ml-1" icon={faArrowUp} />;
const whiteArrow = <FontAwesomeIcon className="ml-1" icon={faArrowUp} color="white"/>;

const useStyles = makeStyles({
    table: {
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    order_cell: {
        cursor: 'pointer',
    }
});

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[900],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RedCheckbox = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[900],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


function SellersTable({tableHeads, bodyKeys, sellersInfo, inStock, filteredSellersNames, priceRange}) {
    const classes = useStyles();
    const [order, setOrder] = useState('');
    const [rows, setRows] = useState([]);
    const handleSort = () => {
        if (order === ''){
            setRows(rows.sort((a, b) => (a.price < b.price) ? 1 : -1));
            setOrder('asc');
        }
        else if (order === 'asc'){
            setRows(rows.sort((a, b) => (a.price > b.price) ? 1 : -1));
            setOrder('desc')
        }
        else {
            setOrder('');
            setRows(JSON.parse(JSON.stringify(sellersInfo)));
        }
    };
    useEffect(() => {
        setRows(JSON.parse(JSON.stringify(sellersInfo.filter((seller) => {
            return seller.price >= priceRange[0] && seller.price <= priceRange[1] &&
            (inStock ? seller.in_stock : true) &&
            (filteredSellersNames.length !== 0 ? filteredSellersNames.includes(seller.name) : true);
        }))));
    }, [filteredSellersNames]);
    return (
        <React.Fragment>
        <Table className={`${classes.table} tbl mb-5`} aria-label="simple table" size="small">
            <TableHead>
                <TableRow>
                    {tableHeads.map((headRow) => ( headRow === 'Цена' ?
                            <Tooltip TransitionComponent={Zoom} title="Кликните для сортировки" arrow>
                                <TableCell align="center" className={`${classes.order_cell} ${styles.table_head}`} onClick={handleSort}>{headRow}
                                    {order === 'asc' ? arrowUp : order === 'desc' ? arrowDown : whiteArrow}
                                </TableCell>
                            </Tooltip>:
                        <TableCell align="center" className={`${classes.tableHeadCell} ${styles.table_head}`}>{headRow}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row[bodyKeys[0]]}>
                        {bodyKeys.map((key) => (key === 'in_stock' ?
                                                <TableCell align="center" className={styles.table_cell}>
                                                    {row[key] ?
                                                        <GreenCheckbox disabled checked={true}/> :
                                                        <RedCheckbox disabled checked={true} indeterminate/>
                                                    }
                                                </TableCell>
                                            :   <TableCell align="center" className={styles.table_cell}>
                                                    {row[key]}
                                                </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </React.Fragment>
    )
}

export default SellersTable;