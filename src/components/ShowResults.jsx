import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SellersTable from "./SellersTable";
import {grey} from "@material-ui/core/colors";

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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

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
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab_panel: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

const useCardStyles = makeStyles({
    root: {
        minWidth: '40rem',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        display: 'inline'
    },
    pos: {
        marginBottom: 12,
    },
    show_btn: {
        backgroundColor: "rgba(0, 0, 0, 0.04)"
    }
});

function ShowResults({mainResults, mainSellers, tableSellersKeys, tableSellersHead}) {
    const tabClasses = useTabStyles();
    const cardClasses = useCardStyles();
    const [value, setValue] = React.useState(0);
    const createInvoiceData = (name, site, in_stock, price) => {
        return {name, site, in_stock, price};
    };

    const getSellersRows = mainSellers.map((product) => (
        () => product.map((row) => (createInvoiceData(row[tableSellersKeys[0]],
            row[tableSellersKeys[1]], row[tableSellersKeys[2]], row[tableSellersKeys[3]])))
    ));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <div className={tabClasses.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={tabClasses.tabs}
                >
                    {mainResults.map((main_result, index) => (
                        <Tab label={main_result.manufacturer + " " + main_result.code} {...a11yProps(index)} />
                    ))}
                </Tabs>
                {mainResults.map((main_result, index) => (
                    <TabPanel className={tabClasses.tab_panel} value={value} index={index}>
                        <div className="d-flex justify-content-center mb-3 font-weight-bold">Результаты поиска:</div>
                        <Card className={cardClasses.root}>
                            <CardContent>
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
                            </CardContent>
                            <CardActions>
                                <Button className={cardClasses.show_btn} size="small">Показать аналоги</Button>
                            </CardActions>
                            <SellersTable tableHeads={tableSellersHead} bodyKeys={tableSellersKeys}
                                          getRowsFunc={getSellersRows[index]}/>
                        </Card>
                    </TabPanel>
                ))}
            </div>
        </React.Fragment>
    );
}

export default ShowResults;