# IP Stack - GetInfo

## Run locally

- add `environments/.env.dev.yml` 

```yaml
IP_STACK_ACCESS_KEY: <your access key>
IP_STACK_BASE_URL: http://api.ipstack.com/
```

- `npm install`

- `npm run start.local`

## Deploy

`npm run deploy.dev`

## Usage

[GET] /dev?operation=getInfo (ex: `https://2i68s8ve65.execute-api.us-east-1.amazonaws.com/dev/?operation=getInfo`)


## Improvements

- organize the project in order to make more scalable (ex: split serverless config file in multiple files)

- move handler implementation in a function in order to make it mode testable

- validate params at Api Gateway level

- handling secrets using System Manager Parameter Store

- improve logging

## Assignment

Create a lambda function (meant to deploy to AWS), based in the serverless framework, that:

Processes a GET parameter, called “operation”.
If the “operation” is equal to “ipinfo”, the lambda should return information about the IP of the client, using https://ipstack.com/.


The return of the lambda should be a JSON object containing:
```json
{
	"ip": "user-ip",
	"country": "User-country"
}
```

The rest of the fields returned by ipstack can be ignored. Only the country is relevant for the assignment. In case there’s an error, the JSON object should be:
```json
{
	"error": true,
	"Message": "Description of the error"
}
```
For other HTTP operations the response should be HTTP 501, not implemented.


### Technical requirements
The deliverable should:
- Have a readme.md file with a description of the project
- Be written in Javascript (node runtime for Lambda)
- Handle errors in graceful manner
- Do not hardcode credentials
- Implement logging (via CloudWatch)
- Be testable, and implement functional testing
