# Open all files in the current directory in vim splits

```
vim -o $(ls -1)
```

# Run local script on remote host 

```
ssh foo < bar.sh
```

# Basic parallel tasks

```
foo &
bar &
baz &
wait
```

# Pretend-database 

```
db=$(mktemp -d)
trap "rm -rf $db/" EXIT INT HUP TERM

# Writing
echo "1" > $db/foo
echo "2" > $db/bar

# Reading
foo=$(cat $db/foo)
bar=$(cat $db/bar)
...
```

# One-line basic HTTP GET

```
printf 'GET / HTTP/1.1\r\nHost: example.com\r\n\r\n' | nc example.com 80
```
