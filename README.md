# docker-parse-server

## What is Parse Server?
As you might now [Parse](https://parse.com) decided to wind down their services beginning January 28, 2016, effective
on January 29th, 2017.

To make things easier for the community, they published an [open source version](https://github.com/ParsePlatform/parse-server/)
of their actual servers which can be run and maintained locally.

If you are willing to continue to use Parse API’s in your applications, you will need to run that Parse Server on your
own.

You can reach the repository of the Parse Server from here: https://github.com/ParsePlatform/parse-server

## Requirements

Parse Server requires a [MongoDB](http://mongodb.org) instance to run, versions 2.6 to 3.0.
Since the DB is the most important part of the infrastructure, this image doesn't provide one by default, instead
allowing you to choose whether you want to use a hosted service, a local setup, or sticking to Docker (where
you can use Docker networking, the ambassador pattern, linked containers, etc).

You would need to provide a connection string to this image.

Notice that Parse requires a bit of configuration tweaks described in their
[Database Guide](https://parse.com/docs/server/guide#database), and if you're running their migration tool they
require admin access.

Here's an example on how to run a simple MongoDB container with persistent storage:

```shell
$ docker volume create myappdata
$ docker run -v myappdata:/data/db --restart=always --name parse-data -p 27017:27017 mongo:3.0 --setParameter failIndexKeyTooLong=false
```

Adding authentication and enabling SSL outside of the scope of this documentation as they're not required, but you
should certainly consider it as a best-practice.

## Configuration

Parse Server requires configuration to run which is passed through environment variables in this image.
Here's a brief description of those:

* **PARSE_MONGODB_URI**: A MongoDB [connection string](https://docs.mongodb.org/manual/reference/connection-string/) in
the form `mongodb://[username:password@]host1[:port1][/[database]]`
* **PARSE_APP_ID**: Application App Identifier
* **PARSE_MASTER_KEY**: Master Key
* **PARSE_FILE_KEY**: *(Optional)* For migrated apps, the file key to access Parse's storage.
* Client keys: *(Optional)* Their values are self-explanatory.
  - PARSE_CLIENT_KEY
  - PARSE_JAVASCRIPT_KEY
  - PARSE_REST_API_KEY
  - PARSE_DOTNET_KEY

From the Parse Server documentation: *The client keys used with Parse are no longer
necessary with parse-server. If you wish to still require them, perhaps to be able to refuse access to older clients,
you can set the keys at initialization time. Setting any of these keys will require all requests to provide one of the
configured keys.*

## Ports

This image exposes port 8080 which is running the Express server.

## Cloud Code

You can mount your cloud code as a volume in `/usr/src/app/parse/cloud`.

## Running

It's recommended that you check everything's working as intended first:

```shell
docker run --rm -it \
  -e PARSE_MONGODB_URI='<MONGODB URI>' \
  -e PARSE_APP_ID='<MY_APP_ID>' \
  -e PARSE_MASTER_KEY='<MY_MASTER_KEY>' \
  -e PARSE_FILE_KEY='<MY_FILE_KEY>' \
  -d -p 8080:8080 instainer/parse-server
```

And then run it in a more resilient way:

```
docker run -d \
  -e PARSE_MONGODB_URI='<MONGODB URI>' \
  -e PARSE_APP_ID='<MY_APP_ID>' \
  -e PARSE_MASTER_KEY='<MY_MASTER_KEY>' \
  -e PARSE_FILE_KEY='<MY_FILE_KEY>' \
  -e NODE_ENV=production
  -d -p 8080:8080 instainer/parse-server
```

## License

View [license information](https://github.com/ParsePlatform/parse-server/blob/master/LICENSE)
for the software contained in this image.

## Supported Docker versions

This image is officially supported on Docker version 1.9.1.

Please see the [Docker installation documentation](https://docs.docker.com/installation/) for details on how to upgrade
your Docker daemon.

## User Feedback

### Issues
If you have any problems with or questions about this image, please make contact through a
[GitHub issue](https://github.com/instainer/parse-server-docker/issues).

## Contributing
You are invited to contribute new features, fixes, or updates, large or small; we are always thrilled to receive pull
requests, and do our best to process them as fast as we can.

Before you start to code, we recommend discussing your plans through a GitHub issue, especially for more ambitious
contributions. This gives other contributors a chance to point you in the right direction, give you feedback on your
design, and help you find out if someone else is working on the same thing.
