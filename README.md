![](https://raw.githubusercontent.com/williamniemiec/universitask/master/docs/img/logo/universitask.png)

<h1 align='center'>UniversiTask</h1>
<p align='center'>Academic Task Manager focused on deadlines.</p>
<p align="center">
	<a href="https://github.com/williamniemiec/universitask/actions/workflows/windows.yml"><img src="https://github.com/williamniemiec/universitask/actions/workflows/windows.yml/badge.svg" alt=""></a>
	<a href="https://github.com/williamniemiec/universitask/actions/workflows/macos.yml"><img src="https://github.com/williamniemiec/universitask/actions/workflows/macos.yml/badge.svg" alt=""></a>
	<a href="https://github.com/williamniemiec/universitask/actions/workflows/ubuntu.yml"><img src="https://github.com/williamniemiec/universitask/actions/workflows/ubuntu.yml/badge.svg" alt=""></a>
	<a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React Native-0.60+-D0008F.svg" alt="React Native compatibility"></a>
	<a href="https://github.com/williamniemiec/universitask/releases"><img src="https://img.shields.io/github/v/release/williamniemiec/universitask" alt="Release"></a>
	<a href="https://github.com/williamniemiec/universitask/blob/master/LICENSE"><img src="https://img.shields.io/github/license/williamniemiec/universitask" alt="License"></a>
</p>
<p align="center">
	<a href='https://play.google.com/store/apps/details?id=com.universitask&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width=200/></a>
</p>



<hr />

## ❇ Introduction
UniversiTask is an academic task manager focused on prioritizing tasks according to their deadlines. The big difference compared to other similar applications is that they focus more on tasks, while at UniversiTask the focus is on deadlines.

## ✔ Requiremens
- [JDK 8+](https://www.oracle.com/java/technologies/downloads/);
- [Python](https://www.python.org/downloads/);
- [NodeJS](https://nodejs.org/en/download/);
- [Android SDK](https://developer.android.com/studio/install);
- [Android SDK Platform](https://developer.android.com/studio/install);
- [Android Virtual Device](https://developer.android.com/studio/install);
- [React Native CLI](https://reactnative.dev/docs/environment-setup).

## ℹ How to run

Type in your terminal:

1. npm install

#### Local - Windows
2. react-native run-android OR react-native run-ios

#### Local - Linux
2. react-native start
3. react-native run-android OR react-native run-ios

#### Expo
2. npm install -g expo-cli
3. expo start

#### Throubleshoot
##### Error

```
error SHA-1 for file /usr/local/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js (/usr/local/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js) is not computed. Run CLI with --verbose flag for more details.
ReferenceError: SHA-1 for file /usr/local/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js (/usr/local/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js) is not computed
```

##### Solution - Linux
> npx react-native start

##### Solution - Windows
> npx react-native run-android

## 🖼 Gallery

<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; flex-wrap: wrap">
<img height=400 src="https://raw.githubusercontent.com/williamniemiec/universitask/master/docs/img/screens/img1.png" alt="image 1" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/universitask/master/docs/img/screens/img2.png" alt="image 2" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/universitask/master/docs/img/screens/img3.png" alt="image 3" />
</div>

## 🚩 Changelog
Details about each version are documented in the [releases section](https://github.com/williamniemiec/universitask/releases).


## 📁 Files

### /
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|__tests__|`Directory`|Test files|
|android|`Directory`|Android source files|
|ios|`Directory`|iOS source files|
|docs |`Directory`|Documentation files|
|src     |`Directory`| Source files|
