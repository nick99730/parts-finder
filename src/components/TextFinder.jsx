import React, {useState} from 'react';
import styles from './TextFinder.module.css';
import {InputGroup} from "react-bootstrap";
import {Button, FormControl} from "react-bootstrap";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ShowResults from "./ShowResults";

function TextFinder({server}) {
    const [partNumber, setPartNumber] = useState('');
    const [dataLoading, setDataLoading] = useState(false);
    const [mainResults, setMainResults] = useState([]);
    const [resultsObtained, setResultsObtained] = useState(false);
    const [mainSellers, setMainSellers] = useState([]);
    const [tableSellersKeys, setTableSellersKeys] = useState([]);
    const [tableSellersHead, setTableSellersHead] = useState([]);
    const [tableCrossesHead, setTableCrossesHead] = useState([]);
    const [tableCrossesInfo, setTableCrossesInfo] = useState([]);
    const [crossesSellersInfo, setCrossesSellersInfo] = useState([]);
    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }));
    const classes = useStyles();

    function handleChange(event) {
        setPartNumber(event.target.value);
    }
    function sendNumber() {
        setDataLoading(true);
        fetchPartNumber();
    }
    function fetchPartNumber() {
        fetch(server + '/part?code=' + partNumber, {
                method: 'GET',
                headers: {
                    'Origin': 'Access-Control-Allow-Origin',
                }
            }
        ).then(response => response.json())
            .then(parsed_data => {
                setMainResults(parsed_data.result.map(({sellers, crosses, ...keepAttr}) => keepAttr));
                setMainSellers(parsed_data.result.map((part) => part.sellers));
                setTableSellersKeys(parsed_data.sellers_keys);
                setTableSellersHead(parsed_data.sellers_head_names);
                setTableCrossesHead(parsed_data.head_names);
                setCrossesSellersInfo(parsed_data.result.map((part) => part.crosses.map((cross) => cross.sellers)));
                setTableCrossesInfo(parsed_data.result.map((part) => part.crosses));
                setDataLoading(false);
                setResultsObtained(true);
            })
            .catch((error) => {
                    console.log(error);
                }
            )
    }
    return (
        <div>
            <div className={`text-center my-5 font-weight-bold ${styles.main_title}`}>Сервис быстрого
                поиска запчастей и комплектующих для автомобилей
            </div>
            <Backdrop className={classes.backdrop} open={dataLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!resultsObtained ?
                <React.Fragment>
                    <div className="d-flex justify-content-center mt-5 mb-3 font-weight-bold">Поиск по номеру запчасти</div>
                    <div className={`${styles.input_div}`}>
                        <div className={`d-flex justify-content-center ${styles.form_div}`}>
                            <InputGroup className={styles.input_code}>
                                <FormControl
                                    className={styles.no_shadow_input}
                                    placeholder="Номер запчасти"
                                    aria-label="Номер запчасти"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => handleChange(e)}
                                />
                                <InputGroup.Append>
                                    <Button onClick={sendNumber} className={`${styles.no_shadow_btn} ${styles.search_btn}`} variant="info">Поиск</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                        <ol className={`mt-5 ${styles.text_finder_list} ${styles.text_gray_700} ${styles.text_lg} ${styles.text_left} ${styles.uppercase} ${styles.font_bold}`}>
                            <li className="mb-3"><span className={styles.list_numbers}>1</span>Для поиска введите уникальный номер запчасти</li>
                            <li className="mb-3"><span className={styles.list_numbers}>2</span>В настройках существует возможность фильтрации предложений по наличию, а также по ценам и магазинам</li>
                            <li className="mb-3"><span className={styles.list_numbers}>3</span>Заказ оформляется на сайте продавца. Информацию о наличии необходимо уточнять по телефону
                                либо на сайте продавца
                            </li>
                        </ol>
                    </div>
                </React.Fragment> :
                <ShowResults mainResults={mainResults} mainSellers={mainSellers}
                    tableCrossesHead={tableCrossesHead}
                    tableCrossesInfo={tableCrossesInfo}
                    crossesSellersInfo={crossesSellersInfo}
                    tableSellersHead={tableSellersHead}
                    tableSellersKeys={tableSellersKeys}
                />
            }
        </div>
    )
}

export default TextFinder;