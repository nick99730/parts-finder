import React from 'react';
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
        marginTop: '3rem',
    },
    container: {

    },
    title: {
        fontSize: '1rem',
        marginTop: '1rem'
    }
});

function Row(props) {
    const {row, tableSellersKeys, tableSellersHead, index, crossesSellersInfo} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.manufacturer}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.code}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Предложения
                            </Typography>
                            <SellersWithFilter sellers={crossesSellersInfo[index]} tableSellersHead={tableSellersHead} tableSellersKeys={tableSellersKeys}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function CrossesTable({mainTableHeads, crossesInfo, tableSellersKeys, tableSellersHead, crossesSellersInfo}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <div className={`d-flex justify-content-center font-weight-bold ${classes.title}`}>Аналоги</div>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {mainTableHeads.map((headRow) => (
                                    <TableCell align="left">{headRow}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {crossesInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <Row key={row.name} crossesSellersInfo={crossesSellersInfo}
                                 row={row} index={index + page * rowsPerPage} tableSellersKeys={tableSellersKeys} tableSellersHead={tableSellersHead}/>
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
    );
}
export default CrossesTable;