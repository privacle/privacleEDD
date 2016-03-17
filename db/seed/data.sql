insert into users (email, password_hash) values ('steve', 'can not log in');


insert into events(
  name,
  owner,
  event_date,
  event_time,
  description,
  location,
  img_url
)
values(
  'party',
  4,
  '2/2/2016',
  '11:30',
  'awesome party',
  'somewhere',
  'url');

insert into friends (user_1, user_2)values (1, 2)
