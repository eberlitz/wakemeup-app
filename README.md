# WakeMeUp App

App to wake up the user when he arrives at some specific geographic location. Basically, to allow users to sleep while commuting.

# Dependencies

- Node v7+ (I`m using v8.4.0)
- VSCode

# Install project packages

1. `npm i -g ionic cordova`
1. `npm i`

# Run in dev mode

1. `ionic serve`

# Run in android

1. Connect your android in developer debug mode
2. `ionic cordova run android`

# Publicação

1. Ajustar no `config.xml` os atributos version, android-version;
2. Rodar `npm run build --prod --release`;

## Android

1. Rodar `ionic cordova build android --prod --release`;
2. `open platforms/android/build/outputs/apk/`
