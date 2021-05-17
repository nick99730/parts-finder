import React, {useEffect, useState} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import styles from './ImageFinder.module.css'
import InputImageArea from "./ImageInputArea";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useValidateImageURL} from "use-validate-image-url";
import ShowResults from "../ShowResults";

function ImageFinder({server}) {
    const [mainResults, setMainResults] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [imageStatus, setImageStatus] = useState('vallid');
    const [mainSellers, setMainSellers] = useState([]);
    const [tableSellersKeys, setTableSellersKeys] = useState([]);
    const [tableSellersHead, setTableSellersHead] = useState([]);
    const [tableCrossesHead, setTableCrossesHead] = useState([]);
    const [tableCrossesInfo, setTableCrossesInfo] = useState([]);
    const [resultsObtained, setResultsObtained] = useState(false);
    const [imageInputUrl, setImageInputUrl] = useState("");
    const status = useValidateImageURL(imageInputUrl);
    const testAddr = 'https://ad08e02b-af38-40e6-954b-81a131c62fa3.mock.pstmn.io/image_finder';
    const fetchUrlAddress = server + '/detect';
    const fetchImageAddress = server + '/detect';

    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }));
    const classes = useStyles();
    function fetchUrl(url) {
        fetch(testAddr, {
                method: 'POST',
                body: JSON.stringify({
                    url: url
                }),
                headers: {
                    'Origin': 'Access-Control-Allow-Origin',
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json())
            .then(parsed_data => {
                setMainResults(parsed_data.result.map(({sellers, crosses, ...keepAttr}) => keepAttr));
                setMainSellers(parsed_data.result.map((part) => part.sellers));
                setTableSellersKeys(parsed_data.sellers_keys);
                setTableSellersHead(parsed_data.sellers_head_names);
                setTableCrossesHead(parsed_data.head_names);
                setTableCrossesInfo(parsed_data.result.map((part) => part.crosses));
                setResultsObtained(true);
                setDataLoading(false);
            })
            .catch((error) => {
                    console.log(error);
                }
            )
    }

    function imageUrlInputChange(event) {
        setImageInputUrl(event.target.value);
        setImageStatus('valid');
    }

    function imageUrlClick() {
        setImageStatus(status);
        if (status === "valid") {
            setDataLoading(true);
            fetchUrl(imageInputUrl);
        }
    }

    return (
        <div className={styles.finder_block}>
            <div className={`my-5 font-weight-bold ${styles.main_title}`}>
                Сервис быстрого поиска запчастей и комплектующих для автомобилей
            </div>
            <Backdrop className={classes.backdrop} open={dataLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!resultsObtained ?
                <React.Fragment>
                    <div className="my-4 d-flex justify-content-center font-weight-bold">Поиск по изображению</div>
                    <div className="d-flex ">
                        <InputImageArea fetchImageAddress={fetchImageAddress} setMainResults={setMainResults}
                                        setTableSellersKeys={setTableSellersKeys}
                                        setTableSellersHead={setTableSellersHead}
                                        setTableCrossesInfo={setTableCrossesInfo}
                                        setTableCrossesHead={setTableCrossesHead}
                                        setMainSellers={setMainSellers}
                                        setDataLoading={setDataLoading}
                                        setResultsObtained={setResultsObtained}/>
                        <ol className={`${styles.image_finder_list} ${styles.text_gray_700} ${styles.text_lg} ${styles.text_left} ${styles.uppercase} ${styles.font_bold}`}>
                            <li className="mb-3"><span className={styles.list_numbers}>1</span>Для поиска загрузите изображение с упаковкой запчасти</li>
                            <li className="mb-3"><span className={styles.list_numbers}>2</span>В настройках существует возможность фильтрации предложений по наличию, а также по ценам и магазинам</li>
                            <li className="mb-3"><span className={styles.list_numbers}>3</span>Заказ оформляется на сайте продавца. Информацию о наличии необходимо уточнять по телефону
                                либо на сайте продавца
                            </li>
                        </ol>
                    </div>
                    <div className="my-4 d-flex justify-content-center font-weight-bold">или загрузите по ссылке</div>
                    <InputGroup className={styles.input_url}>
                        <FormControl
                            className={styles.no_shadow_input}
                            placeholder="www.example.com"
                            aria-label="www.example.com"
                            aria-describedby="basic-addon2"
                            onChange={(e) => imageUrlInputChange(e)}
                        />
                        <InputGroup.Append>
                            <Button className={styles.no_shadow_btn} onClick={imageUrlClick} variant="primary">Поиск</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {imageStatus === "invalid" ? <div className={`d-flex justify-content-center ${styles.url_error}`}>Неверная ссылка!</div> : null}
                </React.Fragment> :
                <ShowResults mainResults={mainResults} mainSellers={mainSellers}
                             tableCrossesHead={tableCrossesHead}
                             tableCrossesInfo={tableCrossesInfo}
                             tableSellersHead={tableSellersHead}
                             tableSellersKeys={tableSellersKeys}/>
            }
        </div>
    )
}

export default ImageFinder;