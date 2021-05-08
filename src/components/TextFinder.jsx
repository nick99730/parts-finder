import React, {useEffect, useState} from 'react';
import styles from './TextFinder.module.css';
import {Button, FormControl, InputGroup} from "react-bootstrap";

//className={`${"d-flex justify-content-center mt-5"}`}
function TextFinder(props) {
    return (
        <div>
            <div className={`d-flex justify-content-center my-5 font-weight-bold ${styles.main_title}`}>Сервис быстрого
                поиска запчастей и комплектующих для автомобилей
            </div>
            <div className="d-flex justify-content-center mt-5 mb-3 font-weight-bold">Поиск по номеру запчасти</div>
            <div className={`${styles.input_div}`}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Введите уникальный номер запчасти"
                        aria-label="Part number"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Поиск</Button>
                    </InputGroup.Append>
                </InputGroup>
                <ul>
                    <li>Для поиска введите уникальный номер запчасти</li>
                    <li>В настройках существует возможность фильтрации товаров по наличию ...</li>
                    <li>Заказ оформляется на сайте продавца. Информацию о наличии необходимо уточнять по телефону
                        либо на сайте продавца
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TextFinder;