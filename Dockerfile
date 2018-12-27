FROM node:9.6.1

# set working directory
RUN mkdir app
WORKDIR /app
COPY . /app

RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# start app
CMD ["npm", "start"]