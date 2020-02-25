# MongoDB

First, install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/), and start it:

Linux:

```sh
$ sudo service mongod start
$ mongo
```

IOS:

Run the first command in one terminal to start a server. In the second terminal, run mongo to use the tool.

```sh
$ sudo mongod --config /usr/local/etc/mongod.conf
$ mongo
```

OR

```sh
$ brew services start mongodb-community@4.2
$ mongo
```

Then, within Mongo, run:

```sh
> use kids-save-ocean
```

Then, add some sample data:

```sh
> db.sample.insert({ "name" : "KSO", "Description" : "Awesome team :)"})

```
