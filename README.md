# How to run the application

> git clone <url>
> yarn

# Run on web

> yarn dev:web
> Open the Local url shown in the terminal
> Any email and password will work

# Run on mobile

> yarn build:dev
> npx cap sync  -- builds both android and ios
> npx cap sync android/ios  -- builds for specific platform
> npx cap open android/ios