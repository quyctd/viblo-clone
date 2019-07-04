Project FG Blog
===
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)


Table of Contents
=================

* [Project FG Blog](#project-fg-blog)
* [Table of Contents](#table-of-contents)
* [Introduction](#introduction)
* [tags: Python 3.x Django 2.x Angular 7 Django Rest Framework 3.x Ngx-simplemde 1.0.0](#tags-python-3x-django-2x-angular-7-django-rest-framework-3x-ngx-simplemde-100)
* [Structure](#structure)
* [Installation](#installation)
* [Run Project](#run-project)
* [Features](#features)

## Introduction

Một trang web Technical Blog tương tự như Viblo Asia. Sử dụng Angular 7 và Django. 

###### tags: `Python 3.x` `Django 2.x` `Angular 7` `Django Rest Framework 3.x` `Ngx-simplemde 1.0.0`

Structure
---

```zsh
 Root Project:

  # The first project
  fg-blog-API: Backend
    Cung cấp API cho phía frontend
    Sử dụng: Django + Django Rest Framework

  # The second project
  fg-blog-angular-app: Frontend
    Giao diện + logic frontend
    Gọi đến các API trong fg-blog-API
    Sử dụng: Angular 7
    
  # Gitignore
  Git ignore file
  
  # README.md
  Readme file
```


Installation
---
**Clone project**
```bash
git clone https://github.com/quyctd/FG_blog.git
```

**Backend**: Required python 3.x
```bash
cd fg-blog-API/
pip install -r requirements/developments.txt
```

**Frontend**:
 1. Install node js

```bash
brew update
brew install node
```

 2. Install dependency modules
```bash
cd fg-blog-angular-app/
npm install
```

Run Project
---
**Run server**
```bash
cd fg-blog-API/
python manage.py runserver
```

**Run angular app**
```bash
cd fg-blog-angular-app/
ng serve
```

## Features

* Authentication
    * Login
    * Register
    * Social login (Google, Facebook)
    * Logout

* Posts
    * List newest post
    * Read post
    * Create post
    * Edit post
    * Delete post
    * Upvote/Downvote post
    * Table of content of Post
    * Share post
    * Clips post

* Comment
    * Comment in post
    * Reply comment
    * Edit comment
    * Delete comment
    * Share comment
    * Upvote/Downvote comment



> This document is still in development.
