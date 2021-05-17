import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons";

const arrow = <FontAwesomeIcon icon={faLongArrowAltLeft} />;

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
    const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
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
            padding: theme.spacing(2),
            margin: 'auto',
        },
    }));

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMobilePanelOpen(open);
    };
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
            <div className="d-flex align-items-center justify-content-center mb-1 font-weight-bold">Посмотреть результаты
                {arrow}
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={toggleDrawer(true)}
                >
                    <MoreVertIcon />
                </IconButton>
            </div>
            <SwipeableDrawer
                anchor="left"
                open={mobilePanelOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <Typography variant="div" className="d-flex justify-content-center mt-3 mb-4 font-weight-bold" >
                        Результаты поиска
                    </Typography>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={tabValue}
                        onChange={handleChangeTab}
                        aria-label="Vertical tabs example"
                    >
                        {mainResults.map((main_result, index) => (
                            <Tab label={main_result.manufacturer + " " + main_result.code} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </div>
            </SwipeableDrawer>
            {mainResults.map((main_result, index) => (
                <TabPanel className={`${tabClasses.tab_panel} ${styles.card_root} `} value={tabValue} index={index}>
                    <div className={`${cardClasses.root}`}>
                        <Paper className={cardClasses.paper}>
                            <div className={`${cardClasses.title}`}>
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