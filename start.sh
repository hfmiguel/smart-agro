#!/bin/sh

rm -rf package-lock.json
rm -rf yarn.lock
rm -rf node_modules
yarn && yarn web


yarn add @babel/plugin-transform-class-properties react-native-vector-icons metro-react-native-babel-preset
