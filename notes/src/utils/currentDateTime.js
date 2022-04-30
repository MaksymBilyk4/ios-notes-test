export default function createCurrentDateTime() {
    const dateNow = new Date();
    const day = dateNow.toLocaleDateString("en-US", {day: "numeric"});
    const month = dateNow.toLocaleDateString("en-US", {month: "long"});
    const year = dateNow.getFullYear();
    const time = dateNow.toLocaleTimeString().slice(0,-3);

    return `${day} ${month} ${year}, ${time}`;
}


