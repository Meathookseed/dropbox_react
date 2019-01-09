FROM node:9.6.1

# set working directory
RUN mkdir react
WORKDIR /react
COPY . /react

RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

EXPOSE 3000
EXPOSE 35729
# start app
RUN npm run