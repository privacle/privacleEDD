drop table if exists rsvp;
drop table if exists events;
drop table if exists circles;
drop table if exists friends;
drop table if exists users;

create table users(
  user_id serial primary key

);

create table events(
  event_id serial primary key

);

create table rsvp(
  user_id references users,
  event_id references events,
  rsvp_id primary key (user_id, event_id)
);

create table friends(
  user_1 references users,
  user_2 references users,
  friend_id primary key (user_1, user_2)
);

create table circles(
  circle_id serial primary key,
  friendship references friends,
  tag text
);
