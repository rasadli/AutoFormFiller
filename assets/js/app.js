const personID = "1062193446&quot"
function test() {
    $.get(`https://api.linkedin.com/v2/people/(id:${personID})`, function (data, status) {
        console.log("Data: " + data + "\nStatus: " + status);
    });
}