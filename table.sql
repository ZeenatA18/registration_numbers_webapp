CREATE TABLE town_key(
    id SERIAL NOT NULL PRIMARY,
    towns VARCHAR(10) NOT NULL,
    code VARCHAR(10) NOT NULL
);

CREATE TABLE registration_no(
    id SERIAL NOT NULL PRIMARY KEY,
    regNo VARCHAR(10) NOT NULL,
    town_id integer not null,
    foreign key (town_id) references town_key(id)
);

insert into town_key (towns,code) values('Cape Town','CA');
insert into town_key (towns,code) values('Bellville','CY');
insert into town_key (towns,code) values('Paarl','CJ');

insert into town_key (towns,code) values('All','CA, CY, CJ');