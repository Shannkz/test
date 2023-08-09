const userAction = async () => {
  const response = await fetch('https://httpbin.org/get');
  const myJson = await response.text(); //extract JSON from the http response
  // do something with myJson

  console.log(myJson);
  placeJson(myJson);
}

function placeJson(json) {
  document.getElementById("ax").innerHTML=json;
}