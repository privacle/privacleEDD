drop table if exists invitations cascade;
drop table if exists permissions cascade;
drop table if exists events cascade;
drop table if exists circles cascade;
drop table if exists friends cascade;
drop table if exists users cascade;

create table users(
  user_id serial primary key,
  password_hash text,
  email text unique,
  first_name text,
  last_name text,
  bio text,
  photo text
);

create table events(
  event_id serial primary key,
  name text,
  owner integer references users,
  lat numeric,
  lng numeric,
  event_date text,
  event_time text,
  description text,
  location text,
  img_url text,
  saved boolean not null default false
);

create table permissions(
  permission_id serial primary key,
  event integer references events,
  tag text
);

create table invitations(
  user_id integer references users,
  event_id integer references events,
  accepted boolean not null default false,
  saved boolean not null default false,
  primary key (user_id, event_id)
);

create table friends(
  friend_id serial primary key,
  user_1 integer references users on delete cascade,
  user_2 integer references users on delete cascade
);

create table circles(
  circle_id serial primary key,
  friendship integer references friends,
  tag text
);
