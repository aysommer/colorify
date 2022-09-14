import React, {
    ChangeEvent,
    useCallback,
    useContext,
    useRef,
    useState
} from 'react';
import Button from '../../base/Button/Button';
import Loader from '../../base/Loader/Loader';
import ColorParser from '../../../utils/ColorParser';
import { AppContext } from '../../../store';

import './UploadPanel.css';

const UploadPanel: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);

    const loadedImage = useRef<any>(null);
    const fileInput = useRef<any>(null);
    const loaderCanvas = useRef<HTMLCanvasElement>(null);

    const onClearImage = () => {
        dispatch({ type: 'CLEAR_IMAGE', payload: undefined });
        setLoading(false);

        const canvas = loaderCanvas.current;
        const context = canvas?.getContext('2d');
        const image = loadedImage.current;

        context?.clearRect(0, 0, 300, 150);
        image.src = '';
    }

    const onFileOpen = useCallback(() => {
        fileInput.current.click();
    }, []);

    const onFileOpening = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const canvas = loaderCanvas.current;
        const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
        const image = loadedImage.current;
        const [imageData] = e.target.files || [];

        image.onload = () => {
            context?.drawImage(image, 0, 0, 300, 150);

            ColorParser.getColors(context).then((colors) => {
                dispatch({ type: 'UPLOAD_IMAGE', payload: image });
                dispatch({ type: 'CALCULATE_COLORS', payload: colors });
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
