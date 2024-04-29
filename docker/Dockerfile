FROM node:21

COPY . /code

WORKDIR /code
RUN npm install

EXPOSE 5173

# for deploy
CMD ["npm", "run", "dev"] 
# CMD [ "npm", "run", "dev" ]