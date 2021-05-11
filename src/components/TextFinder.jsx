import React, {useEffect, useState} from 'react';
import styles from './TextFinder.module.css';
import {InputGroup} from "react-bootstrap";
import {Button, FormControl} from "react-bootstrap";
//className={`${"d-flex justify-content-center mt-5"}`}
function TextFinder(props) {
    const [partNumber, setPartNumber] = useState('');
    function handleChange(event) {
        setPartNumber(event.target.value);
    }
    return (
        <div>
            <div className={`d-flex justify-content-center my-5 font-weight-bold ${styles.main_title}`}>Сервис быстрого
                поиска запчастей и комплектующих для автомобилей
            </div>
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
                            <Button className={styles.no_shadow_btn} variant="info">Поиск</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <ol className={`mt-5 ${styles.text_gray_700} ${styles.text_lg} ${styles.text_left} ${styles.uppercase} ${styles.font_bold}`}>
                    <li className="mb-3"><span className={styles.list_numbers}>1</span>Для поиска введите уникальный номер запчасти</li>
                    <li className="mb-3"><span className={styles.list_numbers}>2</span>В настройках существует возможность фильтрации предложений по наличию, а также по уенам и магазинам</li>
                    <li className="mb-3"><span className={styles.list_numbers}>3</span>Заказ оформляется на сайте продавца. Информацию о наличии необходимо уточнять по телефону
                        либо на сайте продавца
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default TextFinder;