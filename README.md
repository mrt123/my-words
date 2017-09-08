This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## setup
* `npm install -g yarn`

### then
* `yarn install`

## run
* `npm start`
* ensure you have api running on `http://localhost:1337`


## build for production
* have REACT_APP_WORDS_API_HOST env variables present:
** eg: ```export REACT_APP_API_HOST=http://ec2-54-89-222-246.compute-1.amazonaws.com```
* `npm run build`