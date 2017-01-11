# anyport

A command line tool to get the available ports.

## Installation

```shell
npm i anyport
```

## Usage

```shell

  Usage: anyport [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    --min [n]      The minimum port number, default: 8000
    --max [n]      The maximum port number, at most 65535
    --num [n]      The number of the available ports, default: 1

```

By default, it will print one available port.

```shell
$ anyport
8000
```

With the `--num` option, you can specify how many ports you want to get. The port numbers are delimited by comma.

```shell
$ anyport --num 10
8000,8001,8002,8003,8004,8005,8006,8007,8008,8009
```

Also, you can specify the range of the generated ports with the `--min` and `--max` options.

```shell
$ anyport --min 9000
9000
$ anyport --min 9000 --max 9005 --num 10
9000,9001,9002,9003,9004,9005
```

## License

MIT.
