Dolly
===================

![Travis](https://api.travis-ci.org/Wildhoney/Dolly.png)
&nbsp;
![npm](https://badge.fury.io/js/node-dolly.png)

* **npm:** `npm install node-dolly -g`

![Dolly Screenshot](http://i.imgur.com/2F9Kraw.png)

---

Getting Started
-------------------

Dolly allows you to easily clone **all** of your repositories in one fell swoop. After installing Dolly globally with `npm install node-dolly -g` you will have the `dolly` command in your `$PATH`.

First you can try to run `dolly` without any parameters, and it *should* tell you that it requires a username &ndash; your GitHub username, or in the spirit of open-source, somebody else's GitHub username.

Therefore run the command `dolly Wildhoney` to clone all my repositories &ndash; substituting Wildhoney if you really must.

By default `Dolly` will attempt to clone the repositories via the `ssh_url` property in the API response &ndash; however there may be cases where you wish to use a different URL &ndash; by specifying the `--property` parameter you can choose another property to use for the cloning: `dolly Wildhoney --property clone_url`.