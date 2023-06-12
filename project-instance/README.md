# Make InfluxDB v2 support InfluxQL

## Get id of bucket
```
influx bucket list --name mybucket | awk 'FNR == 2 {print $1}'
```

## Create a v1 authorization
```
influx v1 auth create \
  --read-bucket 00xX00o0X001 \
  --write-bucket 00xX00o0X001 \
  --username example-user
```

## Create a DBRP mapping
```
influx v1 dbrp create \
  --db mybucket-db \
  --rp mybucket-rp \
  --bucket-id 00xX00o0X001 \
  --default
```