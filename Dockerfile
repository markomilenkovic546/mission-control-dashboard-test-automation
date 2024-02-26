# Use an official cypress image as the base image
FROM cypress/browsers:node-18.16.0-chrome-114.0.5735.133-1-ff-114.0.2-edge-114.0.1823.51-1 

# Create a folder where the project will be stored
RUN mkdir /mission-control-app-test-automation

# Set the working directory inside the container
WORKDIR /mission-control-app-test-automation

# Copy files
COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.ts .
COPY ./tsconfig.json .
COPY ./cypress ./cypress
COPY ./.env .


# Install project dependencies, including Cypress
RUN npm install

# Set the default command to run all tests in electron
CMD ["npm", "run", "all-specs"]

# To run specific npm script in docker container you can run following command
# docker run -image-name npm run script-name
# for example: docker run -it mission-control-image npm run e2e-tests:chrome