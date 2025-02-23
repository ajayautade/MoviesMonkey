import http from 'k6/http';

export default function () {
  http.get('http://13.200.13.1:30000/');
}
