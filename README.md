# Counterstake demo client

This is a quick demo of [Counterstake SDK](https://github.com/byteball/counterstake-sdk) in a node.js app. The demo script sends some coins from Ethereum to Obyte through [Counterstake Bridge](https://counterstake.org) and has them immediately converted to other coins via [Oswap.io](https://oswap.io).

## Run
```sh
git clone https://github.com/byteball/counterstake-demo-client
cd counterstake-demo-client
npm install
```
Copy `.env.sample` to `.env` and edit.
```sh
node run.js
```

## Learn
See the source code of [run.js](run.js) to learn how to use Counterstake SDK in your node.js apps.

