const toastElement = document.getElementById('liveToast');

function toastTrigger(title, message) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement);
    let toastTitle = document.getElementById('toastTitle');
    let toastMessage = document.getElementById('toastMessage');
    toastTitle.innerHTML = title;
    toastMessage.innerHTML = message;
    toastBootstrap.show();
}
