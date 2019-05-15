;(function ($) {
    var exitmodals = [];
    var popupsDisplayed = false;
    var delayedPopups = [];
    $(document).ready(function () {
        PlainModal.closeByEscKey = false;
        PlainModal.closeByOverlay = false;
        var modalels = document.querySelectorAll(".modal-content");
        // var modals = [];
        for (i = 0; i < modalels.length; i++) {
            var content = modalels[i];
            var modal = new PlainModal(content);
            var delay = modalels[i].getAttribute("data-delay");
            modal.closeButton = content.querySelector('.close-button');
            if (modalels[i].getAttribute("data-exit") == '1') {
                if (delay > 0) {
                    delayedPopups.push({modal: modal, delay: delay});
                } else {
                    modal.open();
                }
            } else {
                exitmodals.push(modal);
            }
        }
        console.log(delayedPopups);

        for (i in delayedPopups) {
            setTimeout(function (i) {
                console.log(i);
                delayedPopups[i].modal.open();
            }, delayedPopups[i].delay, i);
        }
    });

    if (exitmodals.length > 0) {
        window.onbeforeunload = function () {
            if (!popupsDisplayed) {
                for (i in exitmodals) {
                    exitmodals[i].open();
                }
                popupsDisplayed = true;
                return "random";
            }
        }
    }
})(jQuery);