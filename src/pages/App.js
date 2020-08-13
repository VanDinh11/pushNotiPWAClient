import React, { useEffect, useState } from 'react';
import '../index.scss';
import RouterConfig from './../router/RouterConfig';
import {
    isPushNotificationSupported,
    askUserPermission,
    registerServiceWorker,
    createNotificationSubscription,
    getUserSubscription,
    sendNotification
} from "./../serviceWorker/actionPushNotification";

const pushNotificationSupported = isPushNotificationSupported();

function App() {
    const [userConsent, setUserConsent] = useState(Notification.permission);
    const [userSubscription, setUserSubscription] = useState(null);
    const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState();
    const [error, setError] = useState(null);
    useEffect(() => {
        if (pushNotificationSupported) {
            setError(false);
            // navigator.serviceWorker.getRegistrations().then(registrations => {
            //     console.log(registrations);
            // });
            registerServiceWorker().then(() => {
                askUserPermission().then(consent => {
                    setUserConsent(consent);
                    if (consent !== "granted") {
                        setError({
                            name: "Consent denied",
                            message: "You denied the consent to receive notifications",
                            code: 0
                        });
                    }
                    else {
                        if(userSubscription === null) {
                            createNotificationSubscription()
                            .then(function (subscription) {
                                console.log(subscription);
                                setUserSubscription(subscription);
                                // send subscrition to server
                                const data = { subscription };
                                fetch('save-subscription', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                })
                                    .then(res => { return res.json() })
                                    .then(json => {
                                        console.log(json);
                                        sendNotification();
                                    })
                            })
                            .catch(err => {
                                console.error("Couldn't create the notification subscription", err, "name:", err.name, "message:", err.message, "code:", err.code);
                                setError(err);
                            });
                        }
                    }
                });
            });
        }
    }, []);

    useEffect(() => {
        setError(false);
        const getExixtingSubscription = async () => {
            const existingSubscription = await getUserSubscription();
            setUserSubscription(existingSubscription);
        };
        getExixtingSubscription();
    }, []);

    return (
        <div className="web-archive">
            <RouterConfig />
        </div>
    );
}

export default App;
