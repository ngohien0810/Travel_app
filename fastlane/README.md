fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### build_release

```sh
[bundle exec] fastlane build_release
```



### upload_to_appcenter

```sh
[bundle exec] fastlane upload_to_appcenter
```



### notify_testers

```sh
[bundle exec] fastlane notify_testers
```



----


## iOS

### ios staging_build

```sh
[bundle exec] fastlane ios staging_build
```

IOS build IPA then upload to TestFlight

----


## Android

### android apk

```sh
[bundle exec] fastlane android apk
```

Build local apk

### android staging_build

```sh
[bundle exec] fastlane android staging_build
```

Android build apk and upload

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
