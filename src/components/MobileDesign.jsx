import AppBar from '@material-ui/core/AppBar';
import React, {useState} from "react";
import Typography from '@material-ui/core/Typography';
import styles from './MobileDesign.module.css'
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import SellersWithFilter from "./SellersWithFilter";
import Button from "@material-ui/core/Button";
import CrossesTable from "./CrossesTable";

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


function MobileDesign({mainResults, tableSellersHead, tableSellersKeys, getSellersRows, tableCrossesHead, getCrossesRows}) {
    const [showCrosses, setShowCrosses] = useState(false);
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
            fontSize: ".7rem",
            '&:hover': {
                color: "#5181b8",
            },
        },
        paper: {
            boxShadow: '0px 5px 7px 0px rgba(0, 0, 0, .2)',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            padding: theme.spacing(2),
            margin: 'auto',
        },
        manufacturer: {
            marginLeft: 3,
        },
    }));
    const tabClasses = useTabStyles();
    const cardClasses = useCardStyles();
    const [tabValue, setTabValue] = React.useState(0);
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };
    const handleShowCrosses = () => {
        setShowCrosses(!showCrosses);
    };

    return(
        <div className={styles.mobile_panel}>
                    <Typography variant="div" className="d-flex justify-content-center mt-3 mb-4 font-weight-bold" >
                        Результаты поиска:
                    </Typography>
            {mainResults.length > 1 ?
                    <AppBar className={styles.mobile_tabs} position="static" color="default">
                        <Tabs
                            value={tabValue}
                            onChange={handleChangeTab}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="scrollable force tabs example"
                        >
                        {mainResults.map((main_result, index) => (
                            <Tab label={main_result.manufacturer + " " + main_result.code} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                    </AppBar> : null}
            {mainResults.map((main_result, index) => (
                <TabPanel className={`${tabClasses.tab_panel} ${styles.card_root} `} value={tabValue} index={index}>
                    <div className={`${cardClasses.root}`}>
                        <Paper className={cardClasses.paper}>
                            <div className="d-flex justify-content-center">
                                <div className={`${cardClasses.title}`}>
                                    Производитель:
                                </div>
                                <div className={`${cardClasses.title} ${cardClasses.manufacturer}`}>
                                    {main_result.manufacturer}
                                </div>
                            </div>
                            <Typography className="d-flex justify-content-center my-2" variant="h5" component="h2">
                                Название: {main_result.name}
                            </Typography>
                            <Typography className={`${cardClasses.pos} d-flex justify-content-center`} color="textSecondary">
                                Номер: {main_result.code}
                            </Typography>
                            <SellersWithFilter sellers={getSellersRows[index]()} tableSellersHead={tableSellersHead}
                                               tableSellersKeys={tableSellersKeys}/>
                            <Button onClick={handleShowCrosses} className={cardClasses.show_btn} size="small">Показать аналоги</Button>
                        </Paper>
                    </div>
                    {showCrosses ? <CrossesTable tableSellersHead={tableSellersHead}
                                                 tableSellersKeys={tableSellersKeys}
                                                 mainTableHeads={tableCrossesHead}
                                                 crossesInfo={getCrossesRows[index]()}/> : null}
                </TabPanel>
            ))}
        </div>
    )
}

export default MobileDesign;