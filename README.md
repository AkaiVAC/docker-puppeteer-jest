# docker-puppeteer-jest
Setup to enable End-to-End testing for Node applications in Docker containers. Jest and Puppeteer are used to do the testing. This setup is primarily for use in CI workflows.

## Configuration

The `utils` folder contains the configuration required for setting up Jest and Puppeteer.

## Running the Tests

1. Navigate into the project folder and install all dependencies.

```
npm install
```

2. Make sure that Docker Desktop is running. Use the following command to run all tests in the project.

```
docker build -t docker-puppeteer-jest .
```


All credit goes to [@ZanonNicola](https://twitter.com/ZanonNicola/) and his blog article found [here](https://www.inextenso.dev/how-to-use-puppeteer-with-docker-to-test-uploading-a-file-to-a-web-form)
