### Introduction

Selenium is a tool that allows you to automate tasks and actions withing web browsers. It is open source and is very flexible. The selenium web drivers are open source and are available for a variety of web browsers in formats that will run on Windows, Mac, and Linux. Selenium scripts can be written in a variety of languages including Java, Javascript, and Python. As such, it is a very flexible tool that has become a kind of industry standard when it comes to writing automated UI tests for websites. 

What follows are some basic setup steps to run selenium steps written in Javascript locally on a Mac device. 

### Downloading the web driver

In order to run selenium tests, you will first need to download and install a web driver for the specific web browser you are looking to write your tests in. If you are writing tests in Javascript, you can use the `selenium-webdriver` package via `npm`. The webdriver's `npm` page has links to a variety of different web drivers for different browsers and operating systems. 

**Note:** In order for a web driver to work on your system, you **must** have the respective web browser installed. It is also important that your installed web driver is not newer than your installed web browser. 

For example, I have version `78.0.3904.87` of Chrome installed on my Mac (you can verify this at chrome://settings/help). As such, I installed version `78.0.3904.70` of chromedriver **not** the latest version `79.0.3945.16` since that would be newer than my local web browser and would not run. 

### Adding the web driver to PATH

The next step in the process is adding the directory containing your web driver to your `PATH` variable. I downloaded `chromedriver` and stored it at `~/irondb/webdriver/chromedriver`. There are a variety of ways to add this directory to your `PATH`. Here is a simple one using the `.bash_profile` file in your home directory:
1. Open the `.bash_profile` file in your home directory with your preferred editor (eg. `vim ~/.bash_profile`)
2. Append the directory containing your webdriver to the `PATH` variable (eg. `export PATH=$PATH:$HOME/irondb/webdriver`)
3. Save and close the file, then execute the contents of the file using the `source` command (eg. `source .bash_profile`)
4. Verify that the directory was added to your `PATH` variable using the `echo` command (eg. `echo $PATH`)

### Running tests

In order to run tests, you will need to use a `Builder` from the `selenium-webdriver` package and use it to build your driver using the browser you have setup. For example:

```
const {Builder, By, Key, until} = require("selenium-webdriver")
let driver = new Builder().forBrowser("chrome").build()
```

Once that is done you can use the `driver` object to perform actions on the browser. I have added a very basic selenium script in the `__tests__` directory called `selenium-hello-world.test.js`. It is not yet integrated with our testing suite, but you can run it using the `node` command and observe it's behavior. 