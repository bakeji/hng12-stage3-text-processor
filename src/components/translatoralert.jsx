import { useState } from "react";

export default function TranslatorAlert() {
    const [visible, setVisible] = useState(true);

    if ( !visible) return null;

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-1/2 bg-red-500 text-white text-center p-3 shadow-md z-50 flex justify-between items-center rounded-lg">
            <span className="flex-1">Translator API is not supported</span>
            <button className="ml-4 cursor-pointer text-white " onClick={() => setVisible(false)}>✖</button>
        </div>
    );
}
