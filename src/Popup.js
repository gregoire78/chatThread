import {
    useState,
    useEffect,
    useRef
} from "react";
import ReactDOM from "react-dom";

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
    const [containerEl] = useState(document.createElement("div"));
    const [autoScroll, setAutoScroll] = useState(true);
    const externalWindow = useRef();

    useEffect(() => {
        //externalWindow.current = window.open("", props.title, `width=600,height=400,left=600,top=200`);
        externalWindow.current = PopupCenter("", props.title, 600, 600);
        externalWindow.current.document.title = props.title;
        externalWindow.current.document.body.style.background = "#18181b";
        externalWindow.current.document.body.style.color = "#efeff1";
        externalWindow.current.document.body.appendChild(containerEl);
        externalWindow.current.onunload = externalWindow.current.onbeforeunload = () => {
            props.closePopup();
        }
        /*externalWindow.current.addEventListener("beforeunload", () => {
            props.closePopup();
        });*/
        const scroll = (e) => {
            if (externalWindow.current) {
                const el = externalWindow.current.document.body;
                //console.log(el.scrollTop, el.scrollHeight - el.clientHeight)
                if (el.scrollTop === el.scrollHeight - el.clientHeight) {
                    setAutoScroll(true);
                } else {
                    setAutoScroll(false);
                }
            }
        }
        externalWindow.current.addEventListener('wheel', scroll, true);
        externalWindow.current.addEventListener('touchmove', scroll, true);
        externalWindow.current.addEventListener('touchend', scroll, true);
        /*externalWindow.current.addEventListener('scroll', (e) => {
            if (externalWindow.current) {
                const el = externalWindow.current.document.body;
                if (el.scrollHeight - el.scrollTop === el.clientHeight && !autoScroll) {
                    setAutoScroll(true);
                }
            }
        }, true);*/
        externalWindow.current.addEventListener("resize", () => {
            externalWindow.current.document.body.scrollTop = containerEl.scrollHeight;
        });
        externalWindow.current.document.body.scrollTop = containerEl.scrollHeight;
        return function cleanup() {
            externalWindow.current.close();
            externalWindow.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (autoScroll)
            externalWindow.current.document.body.scrollTop = containerEl.scrollHeight;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children])
    return ReactDOM.createPortal(props.children, containerEl);
};

export default Popup;