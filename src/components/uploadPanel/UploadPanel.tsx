import { observer } from 'mobx-react';
import React, {
    ChangeEvent,
    useCallback,
    useRef,
    useState
} from 'react';
import { Button, Loader } from '../base';
import store from '../../store';

import './UploadPanel.css';

const colorWorker = new Worker(new URL('../../color-worker.ts', import.meta.url));

const UploadPanel: React.FC = observer(() => {
    const [isLoading, setLoading] = useState(false);

    const loadedImage = useRef<HTMLImageElement>(null);
    const fileInput = useRef<HTMLInputElement>(null);
    const loaderCanvas = useRef<HTMLCanvasElement>(null);

    const onClearImage = () => {
        store.clear();
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
                store.setImage(image);
                store.setColors(data);
                setLoading(false);
            }
        }
        reader.onloadstart = () => {
            setLoading(true);
        }
        reader.onload = () => {
            image.src = reader.result as string;
        }

        if (imageData) {
            reader.readAsDataURL(imageData);
        }
    }, []);

    return (
        <section className="upload-panel">
            <div className="upload-panel__top-panel">
                {
                    (isLoading) ? (
                        <Loader />
                    ) : (
                        <Button
                            onClick={(!store.image) ? onFileOpen : onClearImage}>
                            {(!store.image) ? 'Upload' : 'Clear'}
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
                className={`upload-panel__image${(store.image) ? " loaded" : ""}`}
                ref={loadedImage}
                alt=""
            />
        </section>
    )
});

export default UploadPanel;
