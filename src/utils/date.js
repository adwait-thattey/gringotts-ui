export default (date) => {
    const newDate = new Date(date);
    return `
        ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}
        \u00A0\u00A0\u00A0${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}
    `
}