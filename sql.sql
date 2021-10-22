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
    