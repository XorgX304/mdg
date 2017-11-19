#!/usr/bin/env bash

# Constant type variables.
AC='auto-increment'
UUID='uuid'
RAND_INT='random-int'
RAND_FLOAT='random-float'
FIRST_NAME='first-names'
LAST_NAME='last-names'
ZIPCODE='zipcode'
COUNTRY='country'
LAT='lat'
LONG='long'
STREET='street-name'
ADDRESS='street-addr'
PHONE='phone'
EMAIL='email'
USER='username'
IP='ip'
IPV6='ipv6'
COMPANY='company'
DOMAIN='domain'
URL='url'
MONTH='month'
WEEKDAY='weekday'
DATE='rand-date'
TS='timestamp'
CC_NUMBER='cc-number'
CC_TYPE='cc-type'
EXP='cc-exp'
CVV='cvv'
BALANCE='balance'
BOOL='bool'
GENDER='gender'
NULL='null-val'
COLOR='color'
IPV6_ARRAY=( 1 2 3 4 5 6 7 8 9 0 a b c d e f )


# Type Option Variables
RAND_INT_MIN='rand-int-min'
RAND_INT_MAX='rand-int-max'




# Generate IPv6
generate_ipv6() {
  local a=${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]};
  local b=${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]};
  local c=${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]};
  local d=${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]}${IPV6_ARRAY[$RANDOM%16]};
  echo ${a}:${b}:${c}:${d};
}

# Generate float within range 1-10 with #1 decimal digit.
comparison_float() {
 echo "scale=1; $RANDOM*10/32767" | bc;
}

# Generate boolean. Compares random generated float with float argument and echoes arg $2/$3.
# Can be used for true/false, female/male etc.
generate_boolean() {
  local float=$(comparison_float)
  if (( $(echo "${float} > $1" |bc -l) )); then
  echo $2;
  else
  echo $3;
  fi
}

# Function for generating mock data. Case statement that echoes result depending on passed arg $1
generate_mock_data() {
	case ${1} in
	# Ids & Numbers
		${AC})
			echo ${2} ;;
		${UUID})
			uuidgen ;;
		${RAND_INT})
			#TODO
			;;
		${RAND_FLOAT})
			#TODO
			;;
		# Names & Addresses
		${FIRST_NAME})
			echo $(shuf -n1 ./data/names.txt) ;;
		${LAST_NAME})
			echo $(shuf -n1 ./data/last_names.txt) ;;
		${ZIPCODE})
			echo $(shuf -i100000-999999 -n1) ;;
		${COUNTRY})
			echo $(shuf -n1 countries.txt) ;;
		${LAT})
			echo $((RANDOM % 180 - 90)).$(shuf -i1000000-9999999 -n1) ;;
		${LONG})
			echo $((RANDOM % 360 - 180)).$(shuf -i1000000-9999999 -n1) ;;
		${STREET})
			echo $(shuf -n1 ./data/street_names.txt) ;;
		${ADDRESS})
			echo $(shuf -n1 ./data/addresses.txt) ;;
		${PHONE})
		# Internet
			echo "("$(shuf -i100-999 -n1)")-"$(shuf -i1000000-9999999 -n1) ;;
		${EMAIL})
			echo $(shuf -n1 ./data/emails.txt) ;;
		${USER})
			echo $(shuf -n1 ./data/usernames.txt) ;;
		${IP})
			echo $((RANDOM%256)).$((RANDOM%256)).$((RANDOM%256)).$((RANDOM%256)) ;;
		${IPV6})
			$(generate_ipv6) ;;
		${COMPANY})
			$(shuf -n1 ./data/companies.txt) ;;
		${URL})
			$(shuf -n1 ./data/urls.txt) ;;
		${DOMAIN})
		# Date & Times
			$(shuf -n1 ./data/domains.txt) ;;
		${MONTH})
			$(shuf -n1 ./data/months.txt) ;;
		${WEEKDAY})
			$(shuf -n1 ./data/days.txt) ;;
		# Finance
		${CC_NUMBER})
			$(shuf -i1000000000000000-9999999999999999 -n1) ;;
		${CC_TYPE})
			$(shuf -n1 ./data/credit_cards.txt) ;;
		${CVV})
			$(shuf -i100-999 -n1) ;;
		${EXP})
			echo $(shuf -i1-12 -n1)/$(shuf -i2017-2026 -n1) ;;
		${BALANCE})
			echo "scale=2; $RANDOM*100000/32767" | bc ;;
		# Misc
		${BOOL})
			#TODO
			# $(generate_boolean ${arg} true false)
			;;
		${GENDER})
			#TODO
			# $(generate_boolean ${arg} "F" "M")
			;;
		${NULL})
			;;
		${COLOR})
			#TODO
			# Color function
			;;
	esac
}

# Sample headers
headers=('auto-increment' 'uuid' 'lat' 'long')
for h in "${headers[@]}"; do
	echo -n ${h},
done > file.csv
echo >> file.csv  # New line

RAND="eval $((RANDOM%256))"
for i in {1..2500}; do
	echo ${RAND}
#	for header in "${headers[@]}"; do
#		echo -n $(generate_mock_data ${header} ${i}),
#	done
#	echo
#done >> file.csv
done