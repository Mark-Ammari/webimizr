# Webimizr
[![Generic badge](https://img.shields.io/badge/Version-1.0.0-<COLOR>.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/Website-Active-<COLOR>.svg)](https://shields.io/)

> Localized Performance Insights Used to Audit Websites.

Webimizr is a platform used to measure your website's performance and utilize google chrome's lighthouse metrics to perform a full audit on your webpage. This platform provides the user extensive details on web vitals, best practices, accessibility, search engine optimization, and measuring how progressive your web app is (PWA). Users can use this platform to determine areas of improvement of their website.
 
---
## Author

**Mark Ammari** 
* *Repository* - [Github Repo][repository-url] (Repository space)
* *Live Website* [Webimizr][cloud-provider-url] (Demo Website)

## Current Issues

* Using Heroku as a cloud provider will slow down HTTP Requests. 
  * If you encounter errors even if you are typing the correct URL, It is likely due to Heroku and the solution would be to increase DYNOS.

## Showcase

This project was designed to demonstrate:

* Programming Language(s)
  * Typescript
  * Javascript
* Frontend Framework(s)
  * React
  * Next.js
* Backend Framework(s)
  * Node.js (Built-in Next.js)
  * Express.js (Built-in Next.js)
* API Usage(s)
  * Lighthouse API
* Prominent Libraries/Packages
  * axios
  * chrome-launcher - (No longer using since it uses too much of Heroku's CPU.)
  * lighthouse - (No longer using since it uses too much of Heroku's CPU.)
  * puppeteer - (No longer using since it uses too much of Heroku's CPU.)
  * react-redux / redux / redux-toolkit
  * recharts

## Release History

* 2.0.1
    * added SEO logic.
* 2.0.0
    * Used promises to fix request timeout and using googles lighthouse API instead of puppeteer and chrome-launcher.
* 1.0.1
    * Fixed API Endpoint - would not return error to client.
* 1.0.0
    * Released Webimizr to Production.
---

[repository-url]: https://github.com/Mark-Ammari/webimizr
[cloud-provider-url]: https://webimizr.herokuapp.com/