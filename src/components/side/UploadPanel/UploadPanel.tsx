import React, {
    ChangeEvent,
    useCallback,
    useContext,
    useRef,
    useState
} from 'react';
import Button from '../../base/Button/Button';
import Loader from '../../base/Loader/Loader';
import { AppContext } from '../../../store';

import './UploadPanel.css';

const colorWorker = new window.Worker('src/ColorWorker.js');

const UploadPanel: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    const loadedImage = useRef<HTMLImageElement>(null);
    const fileInput = useRef<HTMLInputElement>(null);
    const loaderCanvas = useRef<HTMLCanvasElement>(null);

    const onClearImage = () => {
        dispatch({ type: 'CLEAR_IMAGE', payload: undefined });
        setLoading(false);

        const canvas = loaderCanvas.current as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        const image = loadedImage.current as HTMLImageElement;

        context.clearRect(0, 0, 300, 150);
        image.src = '';
    }

    const onFileOpen = useCallback(() => {
        fileInput.current?.click();
    }, []);

    const onFileOpening = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const canvas = loaderCanvas.current as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        const image = loadedImage.current as HTMLImageElement;
        const [imageData] = event.target.files || [];

        image.onload = () => {
            context.drawImage(image, 0, 0, 300, 150);

            colorWorker.postMessage(context.getImageData(0, 0, 300, 150));
            colorWorker.onmessage = ({ data }) => {
                dispatch({ type: 'UPLOAD_IMAGE', payload: image });
                dispatch({ type: 'CALCULATE_COLORS', payload: data });
            }
        }
        reader.onloadstart = () => {
            setLoading(true);
        }
        reader.onload = () => {
            setLoading(false);
            image.src = reader.result as string;
        }

        if (imageData) {
            reader.readAsDataURL(imageData);
        }
    }, [dispatch]);

    return (
        <section className="upload-panel">
            <div className="upload-panel__top-panel">
                {
                    (isLoading) ? (
                        <Loader />
                    ) : (
                        <Button
                            onClick={(!state.image) ? onFileOpen : onClearImage}>
                            {!state.image ? 'Upload' : 'Clear'}
                        </Button>
                    )
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
                className={`upload-panel__image${(state.image) ? " loaded" : ""}`}
                ref={loadedImage}
                alt=""
            />
        </section>
    )
}

export default UploadPanel;
