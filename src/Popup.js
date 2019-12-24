import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Popup = props => {
    const [containerEl] = useState(document.createElement("div"));
    //let externalWindow = null;

    useEffect(() => {
        let externalWindow = window.open("", "", `width=600,height=400,left=200,top=200`);
        externalWindow.document.body.appendChild(containerEl);
        externalWindow.addEventListener("beforeunload", () => {
            props.closePopup();
        });
        console.log("Created Popup Window");
        return function cleanup() {
            console.log("Cleaned up Popup Window");
            externalWindow.close();
            externalWindow = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return ReactDOM.createPortal(props.children, containerEl);
};

export default Popup;
