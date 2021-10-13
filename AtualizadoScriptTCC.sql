create database dbFindPets;

show databases;

use dbFindPets;

#********************************************************************
ALTER TABLE `findpet_db`.`tbladdressinstitutions` 
RENAME TO  `findpet_db`.`addressinstitutions` ;

ALTER TABLE `findpet_db`.`tblinstitutions` 
RENAME TO  `findpet_db`.`institutions` ;

ALTER TABLE `findpet_db`.`telephoneinstitutions`
RENAME TO  `findpet_db`.`telephone_institutions` ;

ALTER TABLE `findpet_db`.`tbltypeinstitutions` 
RENAME TO  `findpet_db`.`typeinstitutions` ;

ALTER TABLE `findpet_db`.`tblcep` 
RENAME TO  `findpet_db`.`cep` ;

SET SQL_SAFE_UPDATES = 0;
delete from institutions;

select * from ceps;

select * from typeinstitutions;

select i.id, 
	ti.type_institution, 
	i.nome, 
	i.senha, 
	i.cnpj, 
	i.email,
    tei.numero,
    ai.logradouro,
    ai.numero,
    ai.complemento,
    c.cep
from institutions i
inner join typeinstitutions ti on ti.id = i.type_institution_id
inner join telephone_institutions tei on tei.institution_id = i.id 
inner join address_institutions ai on ai.institution_id = i.id
inner join ceps c on c.id = ai.cep_id
where i.nome like '%petsho%';

select u.id, 
	u.nome, 
	u.senha, 
	u.cpf, 
	u.email,
    teu.numero,
    u.logradouro,
    u.numero,
    u.complemento,
    c.cep
from users u
inner join telephone_users teu on teu.user_id = u.id 
inner join ceps c on c.id = u.cep_id;

INSERT INTO `institutions` (`id`,`nome`,`email`,`senha`,`cnpj`, `type_institution_id`,`created_at`,`updated_at`) VALUES (0,'ongdobem','teste@gmail.com','123456','887878798', 0,'2021-10-02','2021-10-02');
#*******************************************************************


create table tblDatasDaCampanha(
	idDatasDaCampanha int not null auto_increment primary key,
    DataDeInicio datetime not null,
    DataDeTermino datetime
    );
        
create table tblCampanha(
	idCampanha int not null auto_increment primary key,
    idDatasDaCampanha int not null,
    titulo varchar(100) not null,
    descricao text not null,
    unique key (idCampanha), 
    constraint FK_DatasDaCampanha_Campanha
    foreign key (idDatasDaCampanha)
    references tblDatasDaCampanha (idDatasDaCampanha)
    
);

create table tblTipoDenuncia (
	idTipoDenuncia int not null auto_increment primary key,
    descricao varchar(255) not null
);
        
create table tblDenunciaTipoDenuncia (
	idDenunciaTipoDenuncia int not null auto_increment primary key,
	idDenuncia int not null, 
	idTipoDenuncia int not null,
	unique key (idDenunciaTipoDenuncia),
	constraint FK_Denuncia_DenunciaTipoDenuncia
    foreign key (idDenuncia)
    references tblDenuncia (idDenuncia),
	constraint FK_TipoDenuncia_DenunciaTipoDenuncia
    foreign key (idTipoDenuncia)
    references tblTipoDenuncia (idTipoDenuncia) 
);

create table tblDenuncia (
	idDenuncia int not null auto_increment primary key,
    descricao text not null,
    idInstituicao int not null, 
	idUsuario int not null,
	unique key (idDenuncia),
	constraint FK_Instituicao_Denuncia
    foreign key (idInstituicao)
    references tblInstituicao (idInstituicao),
	constraint FK_Usuario_Denuncia
    foreign key (idUsuario)
    references tblUsuario (idUsuario) 
);

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
    created_at date,
    updated_at date,
    unique key (id),
    constraint FK_Ceps_Users
    foreign key (cep_id)
    references ceps (id)
    
);
        
create table tblUsuarioAnimal (
	idUsuarioAnimal int not null auto_increment primary key,
    idUsuario int not null,
    idAnimal int not null,
    unique key (idUsuarioAnimal),
    constraint FK_Usuario_UsuarioAnimal 
    foreign key (idUsuario)
    references tblUsuario (idUsuario),
    constraint FK_Animal_UsuarioAnimal
    foreign key (idAnimal)
	references tblAnimal (idAnimal)
    
);
	        
create table tblAnimalDesaparecido (
	idAnimalDesaparecido int not null auto_increment primary key,
    idUsuario int not null,
    localVisto varchar(100) not null,
    horaVisto time not null,
    dia date not null,
    descricao text not null,
    nome varchar(100) not null,
    idade int  not null,
    unique key (idAnimalDesaparecido),
    constraint FK_Usuario_AnimalDesaparecido
    foreign key (idUsuario)
    references tblUsuario (idUsuario)
    
);
	
create table tblAnimalDesaparecidoCondicaoEspecial (
	idAnimalDesaparecidoCondicaoEspecial int not null primary key auto_increment,
    idAnimalDesaparecido int not null,
    idCondicaoEspecial int not null,
    unique key (idAnimalDesaparecidoCondicaoEspecial),
    constraint FK_AnimalDesaparecido_AnimalDesaparecidoCondicaoEspecial
    foreign key (idAnimalDesaparecido)
    references tblAnimalDesaparecido (idAnimalDesaparecido),
    constraint FK_CondicaoEspecial_AnimalDesaparecidoCondicaoEspecial
    foreign key (idCondicaoEspecial)
    references tblAnimalDesaparecido (idAnimalDesaparecido)
);
	
create table tblCampanhaInstituicao (
	idCampanhaInstituicao int not null auto_increment primary key,
    idCampanha int not null,
    idInstituicao int not null,
    unique key (idCampanhaInstituicao),
    constraint FK_Campanha_CampanhaInstituicao
    foreign key (idCampanha)
    references tblCampanha (idCampanha),
    constraint FK_Instituicao_CampanhaInstituicao
    foreign key (idInstituicao)
    references tblInstituicao (idInstituicao)
    
);
	
create table institutions (
	id int not null auto_increment primary key,
    type_institution_id int not null,
    nome varchar(255) not null,
	senha varchar(80) not null,
    cnpj varchar(255) not null,
    email varchar(80) not null,
    descricao text,
    created_at date,
    updated_at date,
    unique key (id),
    constraint FK_Typeinstitutions_Institutions
    foreign key (type_institution_id)
    references typeinstitutions (id)
);

create table address_institutions (
	id int not null auto_increment primary key,
    cep_id int not null,
    institution_id int not null,
    logradouro  varchar(40) not null,
    numero  int not null,
    complemento  varchar(100) not null,
    created_at date,
    updated_at date,
    unique key (id),
    constraint FK_Cep_Addressinstitutions
	foreign key (cep_id)
    references cep (id),
    constraint FK_Institutions_Addressinstitutions
    foreign key (institution_id)
    references institutions (id)
);

create table tblUsuarioInstituicao (
	idUsuarioInstituicao int not null auto_increment primary key,
    idUsuario int not null, 
    idInstituicao int not null,
    unique key (idUsuarioInstituicao),
    constraint FK_Usuario_UsuarioInstituicao
    foreign key (idUsuario)
    references tblUsuario (idUsuario),
    constraint FK_Instituicao_UsuarioInstituicao
    foreign key (idInstituicao)
    references tblInstituicao (idInstituicao)
    
);

create table telephone_institutions (
	id int  not null auto_increment primary key,
    numero  varchar(255) not null,
    institution_id int not null,
    created_at date,
    updated_at date,
    unique key (id),
    constraint FK_Institution_Telephoneinstitutions
    foreign key (institution_id)
    references institutions (id)
    
);

create table telephone_users (
	id int not null auto_increment primary key,
    numero  varchar(255) not null,
	user_id int not null,
    created_at date,
    updated_at date,
    unique key (id),
    constraint FK_Users_Telephone_users
    foreign key (user_id)
    references users (id)
);

create table tblTipoAnimal (
	idTipoAnimal int not null auto_increment primary key,
    tipoAnimal  varchar(50) not null
);

create table tblEndereco (
	idEndereco int not null auto_increment primary key,
    idCep int not null,
    idCampanha int not null,
    idInstituicao int not null,
    idUsuario int not null,
    logradouro  varchar(40) not null,
    numero  int not null,
    complemento  varchar(100) not null,
    unique key (idEndereco),
    constraint FK_Cep_Endereco
	foreign key (idCep)
    references tblCep (idCep),
	constraint FK_Campanha_Endereco
	foreign key (idCampanha)
    references tblCampanha (idCampanha),
    constraint FK_Instituicao_Endereco
    foreign key (idInstituicao)
    references tblInstituicao (idInstituicao),
    constraint FK_Usuario_Endereco
    foreign key (idUsuario)
	references tblUsuario (idUsuario)
);
        
create table typeinstitutions (
	id int not null auto_increment primary key,
    type_institution  varchar(255) not null,
    created_at date,
    updated_at date
);
	 
create table tblAvaliacao (
	idAvaliacao int not null auto_increment primary key,
    idInstituicao int not null,
    idUsuario int not null,
    descricao  varchar(255) not null,
    notaAvaliacao  int not null,
    unique key (idAvaliacao),
    constraint FK_Instituicao_Avaliacao
    foreign key (idInstituicao)
    references tblInstituicao (idInstituicao),
    constraint FK_Usuario_Avaliacao
    foreign key (idUsuario)
    references tblUsuario (idUsuario)
);
	
create table tblAnimal (
	idAnimal int not null auto_increment primary key,
    idTipoAnimal int not null,
    nome   varchar(100) not null,
    idade   int not null,
    chipado   bool  not null,
    castrado   bool  not null,
    unique key (idAnimal),
    constraint FK_TipoAnimal_Animal
    foreign key (idTipoAnimal)
    references tblTipoAnimal (idTipoAnimal)
);
	
create table tblServicos (
	idServicos int not null auto_increment primary key,
    idServicosInstituicao int not null, 
    servicosFornecidos   varchar(100) not null,
    unique key (idServicos),
    constraint FK_ServicosInstituicao_Servicos
    foreign key (idServicosInstituicao)
    references tblServicosInstituicao (idServicosInstituicao)
);

create table supports (
	id int not null auto_increment primary key,
    urgency_id int not null,
    institution_id int not null,
    type_support_id int not null,
    valor float,
    idade_minima int,
    horario time,
    descricao varchar(255) not null,
    created_at datetime,
    updated_at datetime,
    constraint FK_urgencies_supports
    foreign key (urgency_id)
    references urgencies (id),
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
    
create table urgencies (
	id int not null auto_increment primary key,
    urgencia varchar(50) not null,
    created_at datetime,
    updated_at datetime
);

create table tblApoio (
	idApoio int not null auto_increment primary key,
    idUrgenciaApoio int not null,
    idInstituicao int not null,
    idAnimal int not null,
    valorDoApoio   float not null,
    formaDeApoio   varchar(100) not null,
    unique key (idApoio),
    constraint FK_UrgenciaApoio_Apoio
	foreign key (idUrgenciaApoio)
    references tblUrgenciaApoio (idUrgenciaApoio),
    constraint FK_Instituicao_Apoio
	foreign key (idInstituicao)
    references tblInstituicao (idInstituicao),
    constraint FK_Animal_Apoio
	foreign key (idAnimal)
    references tblAnimal (idAnimal)
);
	
create table tblUrgenciaApoio (
	idUrgenciaApoio int not null auto_increment primary key,
	nivelDeUrgencia   varchar(20) not null
);
	
create table ceps (
	id int not null auto_increment primary key,
    cep varchar(255) not null,
    created_at date,
    updated_at date
);

create table tblAnimalCondicaoEspecial (
	idAnimalCondicaoEspecial int not null auto_increment primary key,
    idAnimal int not null,
    idCondicaoEspecial int not null, 
    unique key (idAnimalCondicaoEspecial),
    constraint FK_Animal_AnimalCondicaoEspecial
    foreign key (idAnimal)
    references tblAnimal (idAnimal),
    constraint FK_CondicaoEspecial_AnimalCondicaoEspecial
    foreign key (idCondicaoEspecial)
    references tblCondicaoEspecial (idCondicaoEspecial)
    
);
	
create table tblCondicaoEspecial (
	idCondicaoEspecial int not null auto_increment primary key,
    descricao text not null
);
	
create table tblServicosInstituicao (
	idServicosInstituicao int not null auto_increment primary key,
    idInstituicao int not null,
    unique key (idServicosInstituicao),
    constraint FK_Instituicao_ServicosInstituicao
    foreign key (idInstituicao)
    references tblInstituicao (idInstituicao)
);
	
create table tblFuncionario (
	idFuncionario int not null auto_increment primary key,
    idCargoFuncionario int not null,
    cpf varchar(14) not null,
    urlFotoPerfil text  not null,
    descricao varchar(255) not null,
    idade int not null,
    nome varchar(255) not null,
    unique key (idFuncionario),
    constraint FK_CargoFuncionario_Funcionario
    foreign key (idCargoFuncionario)
    references tblCargoFuncionario (idCargoFuncionario)
);
        
create table tblCargoFuncionario (
	idCargoFuncionario int not null auto_increment primary key,
    cargo varchar(50) not null
);
	
create table tblMidia (
	idMidia int not null auto_increment primary key,
    idTipoMidia int not null,
    idInstituicao int not null,
    idAnimal int not null,
    url  text  not null,
    descricao  varchar(255) not null,
    unique key (idMidia),
    constraint FK_TipoMidia_Midia
    foreign key (idTipoMidia)
    references tblTipoMidia (idTipoMidia),
    constraint FK_Instituicao_Midia
    foreign key (idInstituicao)
    references tblInstituicao (idInstituicao),
    constraint FK_Animal_Midia
    foreign key (idAnimal)
    references tblAnimal (idAnimal)
);
	
create table tblTipoMidia (
	idTipoMidia int not null auto_increment primary key,
    descricao  varchar(20) not null
);