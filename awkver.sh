#!/usr/bin/env bash

# AWK / PYTHON
AC='auto-increment' # V
UUID='uuid' # V
RAND_INT='random-int' # V
RAND_FLOAT='random-float' # implement digit limit
ZIPCODE='zipcode' # V
LAT='lat' # V
LONG='long' # V
PHONE='phone' # V
IP='ip' # V
IPV6='ipv6'
DATE='rand-date'
TS='timestamp' # V
CC_NUMBER='cc-number' # V
EXP='cc-exp' # V
CVV='cvv' # V
BALANCE='balance' # V
BOOL='bool'
GENDER='gender'
NULL='null-val'

# File data from CACHE/REDIS
FIRST_NAME='first-names'
LAST_NAME='last-names'
COUNTRY='country'
STREET='street-name'
ADDRESS='street-addr'
EMAIL='email'
USER='username'
COMPANY='company'
DOMAIN='domain'
URL='url'
MONTH='month'
CC_TYPE='cc-type'
WEEKDAY='weekday'
COLOR='color'

IPV6_ARRAY=( 1 2 3 4 5 6 7 8 9 0 a b c d e f )

generate_ipv6() {
  local a=${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]};
  local b=${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]};
  local c=${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]};
  local d=${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]};
  echo ${a}:${b}:${c}:${d};
}

python -c 'import uuid; print("\n".join([str(uuid.uuid4()).upper() for x in range(5000)]))' |
   awk -v min=10 -v max=10000 -v fmin=10 -v fmax=50 '{
      ipv6=generate_ipv6;
      myfloat=fmin+rand()*(fmax-fmin+1);
      myint=int(min+rand()*(max-min+1));
      lat=-90+180*rand();
      long=-180+360*rand();
      ts=int(1000000000+rand()*(9999999999-1000000000+1));
      zip=int(100000+rand()*(999999-100000+1));
      phone="("int(100+rand()*(999-100+1))")-"int(1000000+rand()*(9999999-1000000+1));
      ip=int(256*rand()) "." int(256*rand()) "." int(256*rand()) "." int(256*rand());
      ccnumber=int(100000000000000+rand()*(9999999999999999-100000000000000+1));
      cvv=int(100+rand()*(999-100+1));
      balance=int(10+rand()*(99999-10+1)) "$";
      expiry=int(1+rand()*(12-1+1))"/"int(2017+rand()*(2026-2017+1));
      print NR,$0,myfloat,myint,lat,long,ts,zip,phone,ip,ccnumber,cvv,balance,expiry
  }' OFS=,
