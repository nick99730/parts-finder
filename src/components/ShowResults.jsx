import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SellersWithFilter from "./SellersWithFilter";
import CrossesTable from "./CrossesTable";
import MobileDesign from "./MobileDesign";
import styles from './ShowResults.module.css';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useTabStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab_panel: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

const useCardStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontSize: 14,
        display: 'inline'
    },
    pos: {
        marginBottom: 12,
    },
    show_btn: {
        color: "#55677d",
        backgroundColor: "#e5ebf1",
        '&:hover': {
            color: "#5181b8",
        },
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        minWidth: '65rem',
    },
}));

function ShowResults({mainResults, mainSellers, tableSellersKeys, tableSellersHead,
                         tableCrossesHead, tableCrossesInfo}) {
    const tabClasses = useTabStyles();
    const cardClasses = useCardStyles();
    const [tabValue, setTabValue] = React.useState(0);
    const [showCrosses, setShowCrosses] = useState(false);

    const createSellersData = (name, site, in_stock, price) => {
        return {name, site, in_stock, price};
    };

    const createCrossesData = (manufacturer, name, code, sellers) => {
        return {manufacturer, name, code, sellers};
    };

    const getCrossesRows = tableCrossesInfo.map((cross) => (
        () => cross.map((row) => (createCrossesData(row.manufacturer,
            row.name, row.code, row.sellers)))
    ));

    const getSellersRows = mainSellers.map((product) => (
        () => product.map((row) => (createSellersData(row[tableSellersKeys[0]],
            row[tableSellersKeys[1]], row[tableSellersKeys[2]], row[tableSellersKeys[3]])))
    ));

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleShowCrosses = () => {
        setShowCrosses(!showCrosses);
    };

    return (
        <React.Fragment>
            <MobileDesign mainResults={mainResults} tableSellersKeys={tableSellersKeys}
                          tableSellersHead={tableSellersHead} getSellersRows={getSellersRows}
                          getCrossesRows={getCrossesRows}
                          tableCrossesHead={tableCrossesHead}/>
            <div className={`${tabClasses.root} ${styles.full_panel}`}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleChangeTab}
                    aria-label="Vertical tabs example"
                    className={tabClasses.tabs}
                >
                    {mainResults.map((main_result, index) => (
                        <Tab label={main_result.manufacturer + " " + main_result.code} {...a11yProps(index)} />
                    ))}
                </Tabs>
                {mainResults.map((main_result, index) => (
                    <TabPanel className={tabClasses.tab_panel} value={tabValue} index={index}>
                        <div className="d-flex justify-content-center mb-3 font-weight-bold">Результаты поиска:</div>
                        <div className={cardClasses.root}>
                            <Paper className={cardClasses.paper}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <div className={`${cardClasses.title} mr-2`}>
                                                    Производитель:
                                                </div>
                                                <div className={cardClasses.title}>
                                                    {main_result.manufacturer}
                                                </div>
                                                <Typography variant="h5" component="h2">
                                                    Название: {main_result.name}
                                                </Typography>
                                                <Typography className={cardClasses.pos} color="textSecondary">
                                                    Номер: {main_result.code}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button onClick={handleShowCrosses} className={cardClasses.show_btn} size="small">Показать аналоги</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={7} item>
                                            <SellersWithFilter sellers={getSellersRows[index]()} tableSellersHead={tableSellersHead} tableSellersKeys={tableSellersKeys}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                        {showCrosses ? <CrossesTable tableSellersHead={tableSellersHead}
                                                     tableSellersKeys={tableSellersKeys}
                                                     mainTableHeads={tableCrossesHead}
                                                     crossesInfo={getCrossesRows[index]()}/> : null}
                    </TabPanel>
                ))}
            </div>
        </React.Fragment>
    );
}

export default ShowResults;