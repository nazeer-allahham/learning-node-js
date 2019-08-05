function viewSelectedAttachments(event, selector, inputSelector, inputName) {
    const files = event.target.files;
    $(selector).text();
    for (let i = 0; i < files.length; i++) {
        const element = files[i];
        $(selector).append(`<li class="list-group-item list-group-item-action">
        ${ element.name}
    </li>`);

        $(inputSelector).append(`<input type="hidden" name="${inputName}" value="${element.name}">`)
    }
}