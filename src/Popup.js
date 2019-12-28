import {
    useState,
    useEffect,
    useRef
} from "react";
import ReactDOM from "react-dom";

const Popup = props => {
    const [containerEl] = useState(document.createElement("div"));
    const [autoScroll, setAutoScroll] = useState(true);
    const externalWindow = useRef();

    useEffect(() => {
        externalWindow.current = window.open("", "", `width=600,height=400,left=600,top=200`);
        externalWindow.current.document.title = props.title;
        externalWindow.current.document.body.appendChild(containerEl);
        externalWindow.current.addEventListener("beforeunload", () => {
            props.closePopup();
        });
        externalWindow.current.addEventListener('scroll', (e) => {
            const el = externalWindow.current.document.body;
            if (el.scrollHeight - el.scrollTop === el.clientHeight) {
                setAutoScroll(true);
            } else {
                setAutoScroll(false);
            }
        }, true);
        externalWindow.current.addEventListener("resize", () => {
            externalWindow.current.document.body.scrollTop = containerEl.scrollHeight;
        });
        externalWindow.current.document.body.scrollTop = containerEl.scrollHeight;
        return function cleanup() {
            externalWindow.current.close();
            //externalWindow.current = null;
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