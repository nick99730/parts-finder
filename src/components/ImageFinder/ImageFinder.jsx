import React, {useEffect, useState} from 'react';
import styles from './ImageFinder.module.css'
import InputImageArea from "./ImageInputArea";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useValidateImageURL} from "use-validate-image-url";
import Filter from "../Filter";
import ShowResults from "../ShowResults";

function ImageFinder(props) {
    const [imageUrl, setImageUrl] = useState("");
    const [sliderValue, setSliderValue] = useState([0, 1000]);
    const [mainResults, setMainResults] = useState([]);
    const [mainSellers, setMainSellers] = useState([]);
    const [tableSellersKeys, setTableSellersKeys] = useState([]);
    const [tableSellersHead, setTableSellersHead] = useState([]);
    const [resultsObtained, setResultsObtained] = useState(false);
    const [imageInputUrl, setImageInputUrl] = useState("");
    const status = useValidateImageURL(imageUrl);
    const fetchUrlAddress = '';
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
                console.log(parsed_data);

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
            setImageUrl(imageInputUrl)
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
                    <Filter sellers={props.sellers} value={sliderValue} setValue={setSliderValue}/>
                    <InputImageArea fetchImageAddress={fetchImageAddress} setMainResults={setMainResults}
                                    setTableSellersKeys={setTableSellersKeys}
                                    setTableSellersHead={setTableSellersHead}
                                    setMainSellers={setMainSellers}
                                    setResultsObtained={setResultsObtained}/>
                    <div className="my-4 d-flex justify-content-center font-weight-bold">или загрузите по ссылке</div>
                    <InputGroup className={styles.input_url}>
                        <FormControl
                            placeholder="www.example.com"
                            aria-label="www.example.com"
                            aria-describedby="basic-addon2"
                            onChange={(e) => imageUrlInputChange(e)}
                        />
                        <InputGroup.Append>
                            <Button onClick={imageUrlClick} variant="outline-secondary">Поиск</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {imageUrl !== "" ? status === "invalid" ? <div>Неверная ссылка!</div> : null : null}
                </React.Fragment> :
                <ShowResults mainResults={mainResults} mainSellers={mainSellers}
                             tableSellersHead={tableSellersHead}
                             tableSellersKeys={tableSellersKeys}/>
            }
        </div>
    )
}

export default ImageFinder;