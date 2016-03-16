drop table if exists rsvp;
drop table if exists events;
drop table if exists circles;
drop table if exists friends;
drop table if exists users;

create table users(
  user_id serial primary key,
  password_hash text,
  email text
);

create table events(
  event_id serial primary key,
  name text,
  owner text,
  lat numeric,
  lng numeric
);

create table rsvp(
  user_id integer references users,
  event_id integer references events,
  primary key (user_id, event_id)
);

create table friends(
  user_1 integer references users,
  user_2 integer references users,
  primary key (user_1, user_2)
);

create table circles(
  circle_id serial primary key,
  friendship integer references friends,
  tag text
);
