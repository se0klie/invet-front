import { endpoints } from "../endpoints";
import Cookies from "js-cookie";

export function openSocket(function_name, options = {}) {
    const {
        onCardRegistration,
        onEmailVerification,
        onError,
        onClose,
        onOpen,
    } = options;

    const ws = new WebSocket("wss://backendinvet.com/ws/notifications/");
    // session token out for email ver
    ws.onopen = () => {
        const payload = {
            session_token: Cookies.get("authToken"),
            function: function_name,
        };
        ws.send(JSON.stringify(payload));
        if (onOpen) onOpen(ws);
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log( 'FUNCITON NAME',function_name, onEmailVerification)
        if (function_name === "card_registration") {
            if (data?.function !== "card_registration_callback") {
                ws.close();
                return;
            }
            if (data?.data?.url) {
                window.open(data.data.url, "_blank", "noopener,noreferrer");
            } else if (data?.id) {
                onCardRegistration?.(data.id);
                ws.close();
            } else if (!data?.success) {
                console.error("Error de Pagomedios:", data);
                // onError?.(data, ws);
                ws.close();
            }
        } 
        
        else if (function_name === "email_verification") {
            if (data?.function !== "email_verification_callback") {
                ws.close();
                return;
            }
            if (data?.success) {
                onEmailVerification?.(data, ws);
                ws.close();
            } else {
                console.error("Error en la verificación de email:", data);
                // onError?.(data, ws);
                ws.close();
            }
        }
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        // onError?.(error, ws);
    };

    ws.onclose = (e) => {
        console.warn("WebSocket closed:", e.code, e.reason, e);
        onClose?.(e, ws);
    };

    return ws;
}
