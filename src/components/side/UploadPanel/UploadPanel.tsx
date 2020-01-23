import React, { useRef, useState } from 'react';
import Button from '../../base/Button/Button';
import Loader from '../../base/Loader/Loader';

import { useDispatch } from 'react-redux';
import { uploadImage, clearImage, calculateColors } from '../../../store/app/actions';

import './UploadPanel.scss';
import colorParser from '../../../helpers/ColorsParser';

interface IUploadPanel {
    image: string;
}

const UploadPanel: React.FC<IUploadPanel> = ({ image }) => {
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const loadedImage = useRef<any>(null);
    const fileInput = useRef<any>(null);
    const loaderCanvas = useRef<any>(null);

    const onClearImage = () => {
        dispatch(clearImage());
        setLoading(false);

        const canvas = loaderCanvas.current;
        const context = canvas.getContext('2d');
        const image = loadedImage.current;

        context.clearRect(0, 0, 300, 150);
        image.src = '';
    }

    const onFileOpen = () => {
        fileInput.current.click();
    }

    const onFileOpening = (e: any) => {
        const loader = e.target;
        const reader = new FileReader();

        const canvas = loaderCanvas.current;
        const context = canvas.getContext('2d');
        const image = loadedImage.current;
        const [imageData] = loader.files;

        image.onload = () => {
            context.drawImage(image, 0, 0, 300, 150);

            colorParser.getColors(context).then((colors) => {
                dispatch(uploadImage(context));
                dispatch(calculateColors(colors));
            });
        }
        reader.onloadstart = () => {
            setLoading(true);
        }
        reader.onload = () => {
            setLoading(false);
            image.src = reader.result;
        }

        if (imageData) {
            reader.readAsDataURL(imageData);
        }
    }

    return <section className="upload-panel">
        <div className="upload-panel__top-panel">
            {
                isLoading ?
                    <Loader /> :
                    <Button onClick={!image ? onFileOpen : onClearImage}>
                        {!image ? 'Upload' : 'Clear'}
                    </Button>
            }
        </div>
        <input
            className="upload-panel__loader"
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={onFileOpening}
        />
        <canvas
            className="upload-panel__loader"
            ref={loaderCanvas}
        ></canvas>
        <img
            className={`upload-panel__image${(image) ? " loaded" : ""}`}
            ref={loadedImage}
            alt=""
        />
    </section>
}

export default UploadPanel;
