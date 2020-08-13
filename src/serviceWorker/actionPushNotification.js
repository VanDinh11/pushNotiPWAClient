const pushServerPublicKey = 'BL1ymBeGQugE9sfkgJ15MOFiUKMWE841byALrDKzx7aPbXTy1eUyV18crsB6_YVcwpuoy5kTQKacDsLTtQ_GAB4';

function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
}

async function askUserPermission() {
    return await Notification.requestPermission();
}

function registerServiceWorker() {
    return navigator.serviceWorker.register("/serviceWorker.js");
}

function sendNotification() {
    const img = "/images/iceberg.jpg";
    const text = "Hello world!";
    const title = "Welcome to Web Archive";
    const options = {
        body: text,
        icon: "/images/logo/app.png",
        vibrate: [200, 100, 200],
        tag: "post-1",
        image: img,
        badge: "https://spyna.it/icons/android-icon-192x192.png",
        actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
    };
    navigator.serviceWorker.ready.then(function (serviceWorker) {
        serviceWorker.showNotification(title, options);
    });
}

async function createNotificationSubscription() {
    //wait for service worker installation to be ready
    const serviceWorker = await navigator.serviceWorker.ready;
    // subscribe and return the subscription
    return await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: pushServerPublicKey
    });
}

function getUserSubscription() {
    //wait for service worker installation to be ready, and then
    return navigator.serviceWorker.ready
        .then(function (serviceWorker) {
            return serviceWorker.pushManager.getSubscription();
        })
        .then(function (pushSubscription) {
            return pushSubscription;
        });
}

export {
    isPushNotificationSupported,
    askUserPermission,
    registerServiceWorker,
    sendNotification,
    createNotificationSubscription,
    getUserSubscription
};