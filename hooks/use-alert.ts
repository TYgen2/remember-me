import { useState } from "react";

const useAlert = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ title: "", content: "" });

    return { alertOpen, setAlertOpen, alertMessage, setAlertMessage };
};

export default useAlert;