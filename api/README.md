### MongoDB

First, install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/), and start it:

Linux:

```
$ sudo service mongod start
$ mongo
```

IOS:

Run the first command in one terminal to start a server. In the second terminal, run mongo to use the tool.

```
$ sudo mongod --config /usr/local/etc/mongod.conf
$ mongo
```

OR

```
$ brew services start mongodb-community@4.2
$ mongo
```

Then, within Mongo, run:

```
> use kids-save-ocean
```

Then, add some sample data:

```
> db.sample.insert({ "name" : "KSO", "Description" : "Awesome team :)"})

```
