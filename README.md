COMMAND TO CREATE TRANSACTIONS TABLE:
create table transactions(id int auto_increment not null, dlno varchar(50), start varchar(50), end varchar(50), timestamp datetime, primary key(id, dlno, timestamp));

COMMAND TO CREATE COSTS TABLE:
create table costs(start varchar(50), end varchar(50), cost float, primary key(start, end));

