let baseURL = "";

if (window && window._env_ && window._env_.REACT_APP_GW_URL) {
  baseURL = window._env_.REACT_APP_GW_URL;
} else {
  baseURL = "http://django-test-lb-1263148841.eu-central-1.elb.amazonaws.com:8080";
}
export default baseURL;

