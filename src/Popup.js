import {
    useEffect,
    useRef
} from "react";

function PopupCenter(url, title, w, h) {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) newWindow.focus();
    return newWindow;
}

const Popup = props => {
    const externalWindow = useRef();

    useEffect(() => {
        externalWindow.current = PopupCenter(props.url, props.title, 600, 600);
        externalWindow.current.onbeforeunload = () => {
            props.closePopup();
        }
        return function cleanup() {
            externalWindow.current.close();
            externalWindow.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        externalWindow.current.postMessage({ source: "app", props: JSON.parse(JSON.stringify(props)) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.chatThreadChannel])

    return (null);
};

export default Popup;