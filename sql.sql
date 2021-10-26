#comando para criar o banco: npx sequelize db:create

#Antes de fazer um cadastro de instituiçao. Fazer esses INSERTS:
INSERT INTO `type_institutions` (`type_institution`, `created_at`, `updated_at`) VALUES ('ONG', curdate(), curdate());
INSERT INTO `type_institutions` (`type_institution`, `created_at`, `updated_at`) VALUES ('CANIL', curdate(), curdate());
INSERT INTO `type_institutions` (`type_institution`, `created_at`, `updated_at`) VALUES ('VETERINARIO', curdate(), curdate());
INSERT INTO `type_institutions` (`type_institution`, `created_at`, `updated_at`) VALUES ('PETSHOP', curdate(), curdate());

#Cadastro de tipos de apoio
INSERT INTO `type_supports` (`tipo`, `created_at`, `updated_at`) VALUES ('RAÇÂO', current_timestamp(), current_timestamp());
INSERT INTO `type_supports` (`tipo`, `created_at`, `updated_at`) VALUES ('REMÉDIOS', current_timestamp(), current_timestamp());
INSERT INTO `type_supports` (`tipo`, `created_at`, `updated_at`) VALUES ('COSMÉTICOS', current_timestamp(), current_timestamp());
INSERT INTO `type_supports` (`tipo`, `created_at`, `updated_at`) VALUES ('VOLUNTÁRIO', current_timestamp(), current_timestamp());

#Cadastro de tipos de animais
INSERT INTO `type_animals` (`tipo`, `created_at`, `updated_at`) VALUES ('CACHORRO', current_timestamp(), current_timestamp());
INSERT INTO `type_animals` (`tipo`, `created_at`, `updated_at`) VALUES ('GATO', current_timestamp(), current_timestamp());

#Cadastro de tipos de condições especiais
INSERT INTO `special_conditions` (`condicao`, `created_at`, `updated_at`) VALUES ('VISÃO PARCIAL', current_timestamp(), current_timestamp());
INSERT INTO `special_conditions` (`condicao`, `created_at`, `updated_at`) VALUES ('CEGO', current_timestamp(), current_timestamp());
INSERT INTO `special_conditions` (`condicao`, `created_at`, `updated_at`) VALUES ('ALERGICO', current_timestamp(), current_timestamp());
INSERT INTO `special_conditions` (`condicao`, `created_at`, `updated_at`) VALUES ('DEFICIÊNCIA FÍSICA', current_timestamp(), current_timestamp());

#Cadastro de cargos 
INSERT INTO `positions` (`cargo`, `created_at`, `updated_at`) VALUES ('Fundador', current_timestamp(), current_timestamp());
INSERT INTO `positions` (`cargo`, `created_at`, `updated_at`) VALUES ('Diretor de campanhas', current_timestamp(), current_timestamp());
INSERT INTO `positions` (`cargo`, `created_at`, `updated_at`) VALUES ('Gerente de economia', current_timestamp(), current_timestamp());
INSERT INTO `positions` (`cargo`, `created_at`, `updated_at`) VALUES ('Cuidador', current_timestamp(), current_timestamp());
INSERT INTO `positions` (`cargo`, `created_at`, `updated_at`) VALUES ('Veterinário', current_timestamp(), current_timestamp());
INSERT INTO `positions` (`cargo`, `created_at`, `updated_at`) VALUES ('Faxineiro', current_timestamp(), current_timestamp());

use findpet_db;

create table users (
	id int not null auto_increment primary key,
    cep_id int not null,
    nome varchar(255) not null, 
    senha varchar(80) not null,
    email varchar(50) not null,
    url_foto_perfil text,
    cpf varchar(14) not null,
    logradouro varchar(40) not null,
    numero int not null,
    complemento varchar(100) not null,
    created_at datetime,
    updated_at datetime,
    unique key (id),
    constraint FK_Ceps_Users
    foreign key (cep_id)
    references ceps (id)
    
);

create table institutions (
	id int not null auto_increment primary key,
    type_institution_id int not null,
    nome varchar(255) not null,
	senha varchar(80) not null,
    cnpj varchar(255) not null,
    email varchar(80) not null,
    url_foto_perfil text,
    url_foto_banner text,
    descricao text,
    created_at datetime,
    updated_at datetime,
    unique key (id),
    constraint FK_Typeinstitutions_Institutions
    foreign key (type_institution_id)
    references type_institutions (id)
);

create table address_institutions (
	id int not null auto_increment primary key,
    cep_id int not null,
    institution_id int not null,
    logradouro  varchar(40) not null,
    numero  int not null,
    complemento  varchar(100) not null,
    created_at datetime,
    updated_at datetime,
    unique key (id),
    constraint FK_Cep_Addressinstitutions
	foreign key (cep_id)
    references ceps (id),
    constraint FK_Institutions_Addressinstitutions
    foreign key (institution_id)
    references institutions (id)
);

create table telephone_institutions (
	id int  not null auto_increment primary key,
    numero  varchar(255) not null,
    institution_id int not null,
    created_at datetime,
    updated_at datetime,
    unique key (id),
    constraint FK_Institution_Telephoneinstitutions
    foreign key (institution_id)
    references institutions (id)
    
);

create table telephone_users (
	id int not null auto_increment primary key,
    numero  varchar(255) not null,
	user_id int not null,
    created_at datetime,
    updated_at datetime,
    unique key (id),
    constraint FK_Users_Telephone_users
    foreign key (user_id)
    references users (id)
);

create table type_institutions (
	id int not null auto_increment primary key,
    type_institution  varchar(255) not null,
    created_at datetime,
    updated_at datetime
);

create table ceps (
	id int not null auto_increment primary key,
    cep varchar(255) not null,
    created_at datetime,
    updated_at datetime
);

create table supports (
	id int not null auto_increment primary key,
    institution_id int not null,
    type_support_id int not null,
    valor float,
    idade_minima int,
    horario varchar(255),
    urgencia boolean not null,
    descricao varchar(255) not null,
    created_at datetime,
    updated_at datetime,
    constraint FK_institutions_supports
    foreign key (institution_id)
    references institutions (id),
    constraint FK_typeSupports_supports
    foreign key (type_support_id)
    references type_supports (id)
);
	
create table type_supports (
	id int not null auto_increment primary key,
    tipo varchar(255) not null,
    created_at datetime,
    updated_at datetime
);

create table campaigns (
	id int not null auto_increment primary key,
    institution_id int not null,
    cep_id int not null,
    numero int not null,
    logradouro varchar(255) not null,
    complemento varchar(255) not null,
	url_foto varchar(255) not null,
    titulo varchar(255) not null,
    descricao varchar(255) not null,
    data_inicio date not null,
    data_fim date not null,
    hora_inicio time not null,
    hora_fim time not null,
    created_at datetime,
    updated_at datetime,
    constraint FK_institutions_campaings
    foreign key (institution_id)
    references institutions (id),
    constraint FK_ceps_campaigns
	foreign key (cep_id)
    references ceps (id)
);

create table special_conditions(
	id int not null auto_increment primary key,
    condicao varchar(255) not null,
	created_at datetime,
    updated_at datetime
);

create table type_animals(
	id int not null auto_increment primary key,
    tipo varchar(255) not null,
	created_at datetime,
    updated_at datetime
);

create table animal_special_conditions(
	id int not null auto_increment primary key,
    animal_id int not null,
    special_condition_id int not null,
	created_at datetime,
    updated_at datetime,
    constraint FK_animals_animal_special_conditions
    foreign key (animal_id)
    references animals (id),
    constraint FK_special_condition_animal_special_conditions
    foreign key (special_condition_id)
    references special_conditions (id)
);

create table animals(
	id int not null auto_increment primary key,
    type_animal_id int not null,
    institution_id int not null,
    url_foto_perfil text not null,
    nome varchar(255) not null,
    personalidade varchar(255),
    idade int,
    castrado boolean not null,
    historia varchar(255) not null,
	created_at datetime,
    updated_at datetime,
    constraint FK_type_animals_animals
    foreign key (type_animal_id)
    references type_animals (id),
    constraint FK_institutions_animals
    foreign key (institution_id)
    references institutions (id)
);

create table positions(
	id int not null auto_increment primary key,
    cargo varchar(255) not null,
	created_at datetime,
    updated_at datetime
);

create table employees(
	id int not null auto_increment primary key,
    institution_id int not null,
    position_id int not null,
    cpf varchar(255) not null,
    url_foto_perfil text not null,
    nome varchar(255) not null,
    dia_entrada date not null,
	created_at datetime,
    updated_at datetime,
    constraint FK_institutions_employees
    foreign key (institution_id)
    references institutions (id),
    constraint FK_positions_employees
    foreign key (position_id)
    references positions (id)
);
