const URL_API = "https://61f4662310f0f7001768c90f.mockapi.io/api/airplane";

function getData() {
  return fetch(URL_API)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
export default getData;
