#!/usr/bin/env bash
## Auto inc
##return $i
#
## UUID
##uuidgen
#
## Random number range
#gen_int() {
#    echo shuf -i{$1}-{$2} -n1
#}
#
## Float
#gen_float() {
#    echo "scale=$2; $RANDOM*$1/32767" | bc
#}
#
#
# First names
#shuf -n1 names.txt
#
## Last Names
#shuf -n1 last_names.txt
#
## Countries
#shuf -n1 countries.txt
#
## Zipcode
#shuf -i100000-999999 -n1
#
## Latitude
#  echo $((RANDOM % 180 - 90)).`shuf -i1000000-9999999 -n1`
#
#$ Longitude
#echo $((RANDOM % 360 - 180)).`shuf -i1000000-9999999 -n1`
#
## Street Name, Addr
#Get list of names / addresses
#
## Phone number
#gen_phone() {
#  echo "("`shuf -i100-999 -n1`")-"`shuf -i1000000-9999999 -n1`;
#}
#
## Email
#shuf -n1 emails.txt
#
## IPv4
#gen_ip() {
#  echo $((RANDOM%256)).$((RANDOM%256)).$((RANDOM%256)).$((RANDOM%256))
#}
#
## IPv6
#array=( 1 2 3 4 5 6 7 8 9 0 a b c d e f ) # variable
#rnd_ip_block () {
#  a=${array[$RANDOM%16]}${array[$RANDOM%16]}${array[$RANDOM%16]}${array[$RANDOM%16]};
#  b=${array[$RANDOM%16]}${array[$RANDOM%16]}${array[$RANDOM%16]}${array[$RANDOM%16]};
#  c=${array[$RANDOM%16]}${array[$RANDOM%16]}${array[$RANDOM%16]}${array[$RANDOM%16]};
#  d=${array[$RANDOM%16]}${array[$RANDOM%16]}${array[$RANDOM%16]}${array[$RANDOM%16]};
#  echo $a:$b:$c:$d;
#}
#
## Company
#shuf -n1 companies.txt
#
## URL
#pass
#
## Domain
#pass
#
## Credit Card
#shuf -n1 credit_cards.txt
#
## Generate credit card number
#shuf -i1000000000000000-9999999999999999 -n1
#
## CVV
#shuf -i100-999 -n1
#
## Exp date
#exp() {
# echo `shuf -i1-12 -n1`/`shuf -i2017-2026 -n1`;
#}
#
# Balance
#echo "scale=2; $RANDOM*100000/32767" | bc
## COMP_FLOAT FUNCTION
#comp_float() {
# echo "scale=1; $RANDOM*10/32767" | bc;
#}
#
## Gender
#gen_genderl() {
#  local FLOAT=$(comp_float)
#  if (( $(echo "$FLOAT > $1" |bc -l) )); then
#  echo F;
#  else
#  echo M;
#  fi
#}
#
## Boolean
#gen_bool() {
#  local FLOAT=$(comp_float)
#  if (( $(echo "$FLOAT > $1" |bc -l) )); then
#  echo false;
#  else
#  echo true;
#  fi
#}
#
## NULL
#echo
#
## Color
## RGB
#echo "("$((RANDOM % 255)), $((RANDOM % 255)), $((RANDOM % 255))")"
## RGBA
#pass
## HEX
#pass
##  SHORT_HEX
#pass
## NAME
#shuf -n1 color_names.txt
#
#
headers=('last_names' 'first_names' 'countries')
for i in "${headers[@]}";
    do
    echo $i;
    case $i in
        'last_names')
            echo $(shuf -n1 ./data/countries.txt) ;;
        'first_names')
            echo $(shuf -n1 ./data/last_names.txt) ;;
        'countries')
            echo $(shuf -n1 ./data/names.txt) ;;
    esac
done;
