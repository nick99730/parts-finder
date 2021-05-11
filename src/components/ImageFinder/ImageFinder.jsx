import React, {useEffect, useState} from 'react';
import styles from './ImageFinder.module.css'
import InputImageArea from "./ImageInputArea";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useValidateImageURL} from "use-validate-image-url";
import ShowResults from "../ShowResults";

function ImageFinder(props) {
    const [imageUrl, setImageUrl] = useState("");
    const [mainResults, setMainResults] = useState([]);
    const [mainSellers, setMainSellers] = useState([]);
    const [tableSellersKeys, setTableSellersKeys] = useState([]);
    const [tableSellersHead, setTableSellersHead] = useState([]);
    const [tableCrossesHead, setTableCrossesHead] = useState([]);
    const [tableCrossesInfo, setTableCrossesInfo] = useState([]);
    const [crossesSellersInfo, setCrossesSellersInfo] = useState([]);
    const [resultsObtained, setResultsObtained] = useState(false);
    const [imageInputUrl, setImageInputUrl] = useState("");
    const status = useValidateImageURL(imageUrl);
    const fetchUrlAddress = 'https://617fb314-a409-42e4-91eb-d3f6381b5383.mock.pstmn.io/image_finder';
    const fetchImageAddress = 'https://617fb314-a409-42e4-91eb-d3f6381b5383.mock.pstmn.io/image_finder';

    function fetchUrl(url) {
        fetch(fetchUrlAddress, {
                method: 'POST',
                body: JSON.stringify({
                    url: url
                })
            }
        ).then(response => response.json())
            .then(parsed_data => {
                setMainResults(parsed_data.result.map(({sellers, crosses, ...keepAttr}) => keepAttr));
                setMainSellers(parsed_data.result.map((part) => part.sellers));
                setTableSellersKeys(parsed_data.sellers_keys);
                setTableSellersHead(parsed_data.sellers_head_names);
                setTableCrossesHead(parsed_data.head_names);
                setCrossesSellersInfo(parsed_data.result.map((part) => part.crosses.map((cross) => cross.sellers)));
                setTableCrossesInfo(parsed_data.result.map((part) => part.crosses.map(({sellers, ...keepAttr}) => keepAttr)));
                setResultsObtained(true);
            })
            .catch((error) => {
                    console.log(error);
                }
            )
    }

    function imageUrlInputChange(event) {
        setImageInputUrl(event.target.value);
    }

    function imageUrlClick(event) {
        if (status === "valid") {
            setImageUrl(imageInputUrl);
            fetchUrl(imageInputUrl);
        }
    }

    return (
        <div className={styles.finder_block}>
            <div className={`d-flex justify-content-center my-5 font-weight-bold ${styles.main_title}`}>Сервис быстрого
                поиска запчастей и комплектующих для автомобилей
            </div>
            {!resultsObtained ?
                <React.Fragment>
                    <div className="my-4 d-flex justify-content-center font-weight-bold">Поиск по изображению</div>
                    <InputImageArea fetchImageAddress={fetchImageAddress} setMainResults={setMainResults}
                                    setTableSellersKeys={setTableSellersKeys}
                                    setTableSellersHead={setTableSellersHead}
                                    setTableCrossesInfo={setTableCrossesInfo}
                                    setTableCrossesHead={setTableCrossesHead}
                                    setCrossesSellersInfo={setCrossesSellersInfo}
                                    setMainSellers={setMainSellers}
                                    setResultsObtained={setResultsObtained}/>
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
                    {imageUrl !== "" ? status === "invalid" ? <div>Неверная ссылка!</div> : null : null}
                </React.Fragment> :
                <ShowResults mainResults={mainResults} mainSellers={mainSellers}
                             tableCrossesHead={tableCrossesHead}
                             tableCrossesInfo={tableCrossesInfo}
                             crossesSellersInfo={crossesSellersInfo}
                             tableSellersHead={tableSellersHead}
                             tableSellersKeys={tableSellersKeys}/>
            }
        </div>
    )
}

export default ImageFinder;