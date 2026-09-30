# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## React Three Fiber box

Run `npm start`, open the app in Expo Go, and select the **3D Box** tab.
For a browser, run `npm run web`. Tap/click the cube to change its size and
color; use the button to pause or resume rotation.

- `components/exercises/three/box.tsx`: the mesh, box geometry, material, and animation.
- `app/(tabs)/three.tsx`: the camera, lights, and screen controls.
- `components/exercises/three/scene-canvas.tsx`: native Canvas using Expo GL;
  the `.web.tsx` version uses the browser Canvas.

The example pins React Three Fiber 9.3.0 for this Expo 54 / React Native 0.81
runtime. Newer Fiber releases can call unsupported performance APIs in development.
Metro resolves Three.js to its ES module build to avoid Node-only warning calls.
After changing Metro configuration, restart with `npx expo start --clear`.
Native GL is best tried on a physical device. If using a custom development
build, rebuild it after installing the native dependencies.

If the iOS simulator shows the controls but no cube, try Expo Go on a physical
phone or open `http://localhost:8081/three` while Expo is running. Expo GL can
produce a blank canvas in the iOS simulator; see the
[maintainer discussion](https://github.com/pmndrs/react-three-fiber/discussions/3064).

See the [React Three Fiber docs](https://r3f.docs.pmnd.rs/getting-started/installation).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
