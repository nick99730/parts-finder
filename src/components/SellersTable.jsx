import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {makeStyles} from '@material-ui/core/styles';
import {Form} from "react-bootstrap";

import {withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    table: {
        maxWidth: 650,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    tableHeadCell: {
        fontWeight: "400!important",
        color: "gray",
        fontSize: ".85rem!important"
    },
    totalTableCell: {
        color: "black",
        fontWeight: 700,
    }

});

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

function SellersTable({tableHeads, bodyKeys, getRowsFunc}) {
    const classes = useStyles();
    return (
        <Table className={`${classes.table} tbl mb-3`} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {tableHeads.map((headRow) => (
                        <TableCell align="left" className={classes.tableHeadCell}>{headRow}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {getRowsFunc().map((row) => (
                    <TableRow key={row[bodyKeys[0]]}>
                        {bodyKeys.map((key) => (key === 'in_stock' ?
                                <TableCell className="first_row">
                                    {row[key] ?
                                        <GreenCheckbox disabled checked={true}/> :
                                        <Checkbox
                                            disabled
                                            checked={true}
                                            indeterminate
                                        />
                                    }
                                </TableCell>
                                : <TableCell className="first_row">
                                    {row[key]}
                                </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SellersTable;