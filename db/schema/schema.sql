drop table if exists rsvp;
drop table if exists events;
drop table if exists circles;
drop table if exists friends;
drop table if exists users;

create table users(
  user_id serial primary key,
  password_hash text,
  email text unique
);

create table events(
  event_id serial primary key,
  name text,
  owner integer,
  lat numeric,
  lng numeric,
  event_date text,
  event_time text,
  description text,
  location text,
  img_url text
);

create table rsvp(
  user_id integer references users,
  event_id integer references events,
  primary key (user_id, event_id)
);

create table friends(
  friend_id serial primary key,
  user_1 integer references users,
  user_2 integer references users
);

create table circles(
  circle_id serial primary key,
  friendship integer references friends,
  tag text
);
