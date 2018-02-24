# CRM System

## Development
1. Add `src/app/config.js` with the following content
```Javascript
export default {
  apiUrl: 'http://localhost:8000/api/v1',
  debugModeEnabled: true,
};
```
2. Run `docker-compose up`
3. Visit `http://localhost:1234`
