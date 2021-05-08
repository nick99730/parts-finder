import React, {useCallback} from 'react';
import styles from './ImageInputArea.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faImage} from '@fortawesome/free-solid-svg-icons'
import {faImage} from '@fortawesome/free-regular-svg-icons'
import {useDropzone} from 'react-dropzone';


const image = <div className={styles.image_icon}>
    <FontAwesomeIcon icon={faImage} size="7x"/>
</div>;

function InputImageArea({
                            fetchImageAddress, setMainResults, setResultsObtained,
                            setMainSellers, setTableSellersKeys, setTableSellersHead
                        }) {
    function fetchImage(file) {
        let formData = new FormData();
        formData.append('image', file);
        fetch(fetchImageAddress, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Origin': 'Access-Control-Allow-Origin',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json()).then(parsed_data => {
            setMainResults(parsed_data.result.map(({sellers, crosses, ...keepAttr}) => keepAttr));
            setMainSellers(parsed_data.result.map((part) => part.sellers));
            setTableSellersKeys(parsed_data.sellers_keys);
            setTableSellersHead(parsed_data.sellers_head_names);
            setResultsObtained(true);
            console.log(parsed_data.result.map((part) => part.sellers))
        })
            .catch((error) => {
                    console.log(error)
                }
            )
    }

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length !== 0) {
            fetchImage(acceptedFiles[0]);
        }
    }, []);

    const {fileRejections, acceptedFiles, getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/jpeg,image/png,image/gif', maxFiles: 1, maxSize: 1000000,
    });

    const validation_error = fileRejections.map(({file, errors}) => (
        <div>
            {errors.map(e => (
                <div className={styles.image_drag_error}>Вы можете загружать только изображения в формате .jpeg, .gif
                    или .png!</div>))}
        </div>
    ));

    return (
        <section className="container">
            <div {...getRootProps({className: styles.dropzone})}>
                <input {...getInputProps()}/>
                <div>
                    <p>Перетащите изображение сюда, или щелкните чтобы выбрать</p>
                    {image}
                    <em>(Поддерживаются только .jpeg, .gif или .png изображения, размером не более 10MB!)</em>
                </div>
            </div>
            <aside>
                {validation_error}
            </aside>
        </section>
    );
}

export default InputImageArea;