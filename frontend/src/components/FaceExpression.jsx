import { useContext, useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/faceExpressionUtil";
import { context } from "../Context";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);
    const initializedRef = useRef(false);

    const { setExpression } = useContext(context);
    const [cameraError, setCameraError] = useState(null);

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        init({ landmarkerRef, videoRef, streamRef, setCameraError });

        return () => {
            landmarkerRef.current?.close();
            streamRef.current?.getTracks().forEach(track => track.stop());
        };
    }, []);

    async function handleClick() {
        const result = detect({ landmarkerRef, videoRef, setExpression });

        if (!result) {
            console.warn("No face detected");
            return;
        }

        onClick(result);
    }


    return (
        <>
            <div className="scanner-preview">
                <div
                    className="camera-feed"
                // style={{
                //     backgroundImage:
                //         "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBEXtTBwWuqbSBU2-_BvR4L5DRMa0g0MSx_edyrsfjp8TnMdpeN6kV_S8uKpC_GSb0v7qLdN3gcyf3Ywo93lOXQIrmkRm6oOPe57RtT9d6UsEWeZ8IIJcEN1n6_J94IntGBM16Csjvf5MWJIn7RMuRsfiziofLLZWH_2wt1flx9EOY2Ei7kLCYdYztmoVb5SBAEmjzPgy7sqoVu3EbXXBSHOou3q2Ah0dew9bdDSZPWJJ17A4aZWZ1t2_ggocm-RrQsFp-waVienrg)"
                // }}
                >
                    <div className="video">
                        <video
                            ref={videoRef}
                            muted
                            autoPlay
                            playsInline
                        />
                    </div>
                </div>

                <div className="face-frame">
                    <div className="detecting">Detecting...</div>
                </div>

                <div className="scanner-status">
                    <p>ANALYZING FACIAL EXPRESSIONS</p>
                </div>


                {/* <h2>{cameraError ? cameraError : expression}</h2> */}
                {/* <button disabled={!!cameraError} onClick={handleClick} >Detect expression</button> */}
            </div>

            <div className="scanner-actions">
                <button className="recalibrate"
                    onClick={handleClick}
                >
                    <span className="material-symbols-outlined">rebase_edit</span>
                    {cameraError ? "cameraError" : 'Recalibrate'}
                </button>

                <p className="scan-info">
                    AI scanning active. Update frequency: 5s
                </p>
            </div>
        </>
    );
}