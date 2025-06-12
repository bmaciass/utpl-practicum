#!/bin/sh

psql -d postgres://root:root@127.0.0.1:5432/postgres -c "CREATE EXTENSION IF NOT EXISTS uuid-ossp";