import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@material-ui/core/TablePagination';
import SellersWithFilter from "./SellersWithFilter";
import styles from './CrossesTable.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";

const arrowUp = <FontAwesomeIcon className="ml-1" icon={faArrowDown} />;

const arrowDown = <FontAwesomeIcon className="ml-1" icon={faArrowUp} />;
const whiteArrow = <FontAwesomeIcon className="ml-1" icon={faArrowUp} color="white"/>;


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    nested_table: {
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: '1rem',
    },
    container: {

    },
    title: {
        fontSize: '1rem',
        marginTop: '3rem'
    }
});

function Row(props) {
    const {row, tableSellersKeys, tableSellersHead, crossesSellersInfo} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    return (
        <React.Fragment>
            <TableRow onClick={() => setOpen(!open)} className={`${classes.root} ${styles.table_row}`}>
                <TableCell className={styles.arrow_cell}>
                    <IconButton aria-label="expand row" size="small" >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className={styles.table_cell} align="center" component="th" scope="row">
                    {row.manufacturer}
                </TableCell>
                <TableCell className={styles.table_cell} align="center">{row.name}</TableCell>
                <TableCell className={styles.table_cell} align="center">{row.code}</TableCell>
                <TableCell className={styles.table_cell} align="center">{Math.min(...crossesSellersInfo.map((info) => info.price))}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                            <SellersWithFilter sellers={crossesSellersInfo} tableSellersHead={tableSellersHead} tableSellersKeys={tableSellersKeys}/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function CrossesTable({mainTableHeads, crossesInfo, tableSellersKeys, tableSellersHead}) {
    const classes = useStyles();
    const [order, setOrder] = useState('');
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleSort = () => {
        if (order === ''){
            setRows(rows.sort((a, b) => (Math.min(...a.sellers.map((info) => info.price)) < Math.min(...b.sellers.map((info) => info.price))) ? 1 : -1));
            setOrder('asc');
        }
        else if (order === 'asc'){
            setRows(rows.sort((a, b) => (Math.min(...a.sellers.map((info) => info.price)) > Math.min(...b.sellers.map((info) => info.price))) ? 1 : -1));
            setOrder('desc');
        }
        else {
            setOrder('');
            setRows(crossesInfo);
        }
    };
    useEffect(() => {
        setRows(JSON.parse(JSON.stringify(crossesInfo)));
    }, []);
    return (
        <React.Fragment>
            <div className={`d-flex justify-content-center font-weight-bold ${classes.title}`}>Аналоги</div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table aria-label="collapsible table" className={`${styles.table_head}`}>
                        <TableHead >
                            <TableRow className={styles.table_head_row}>
                                <TableCell />
                                {mainTableHeads.map((headRow) => (
                                        <TableCell className={`${styles.head_cell}`} align="center">{headRow}
                                            <div className={`MuiDataGrid-columnSeparator ${styles.head_border}`}>
                                                <svg className={`MuiSvgIcon-root MuiDataGrid-iconSeparator ${styles.border_svg}`} focusable="false"
                                                     viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M11 19V5h2v14z"/>
                                                </svg>
                                            </div>
                                        </TableCell>
                                ))}
                                <Tooltip TransitionComponent={Zoom} title="Кликните для сортировки" arrow>
                                    <TableCell className={styles.ordered_cell} onClick={handleSort} align="center">Минимальная цена
                                        {order === 'asc' ? arrowUp : order === 'desc' ? arrowDown : whiteArrow}</TableCell>
                                </Tooltip>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <Row key={row.name} crossesSellersInfo={row.sellers}
                                     row={row} tableSellersKeys={tableSellersKeys} tableSellersHead={tableSellersHead}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {crossesInfo.length > rowsPerPage ?
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={crossesInfo.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        /> : null
                }
            </Paper>
        </React.Fragment>
    );
}
export default CrossesTable;