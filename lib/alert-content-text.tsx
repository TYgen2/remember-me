export const authExplainText = () => {
    return `Due to security purpose, this app will use the strongest authentication method that you have set on your device.

Priorities: 
1. Biometric (Fingerprint / FaceID) 
2. Password (PIN) / Pattern

Notes: You need at least 1 authentication method set up on your device to use this app properly. If not, you will be directed to the setting page.`;
};

export const credentialExplainText = () => {
    return `Each credential represent a service with its own email and password.You can add as many as you want.
            \nNote that the service could be overrided if you add a new credential with the same service name. Use the check button to check if the service already exists.
            \nSome service name is not allowed to use due to internal reasons. Please pick another one 🙏🏻`;
}