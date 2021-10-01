-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE tbl_instituicao (
id INT not null auto_increment PRIMARY KEY,
nome VARCHAR(255) not null,
cnpj VARCHAR(255) not null,
email VARCHAR(255) not null,
senha VARCHAR(255) not null,
idTipoEstabelecimento int not null,
unique key(id),
constraint FK_TipoEstabelecimento_Instituicao
foreign key (idTipoEstabelecimento)
references tbl_tipoEstabelecimento (id)
);

CREATE TABLE tbl_endereco (
id INT not null auto_increment PRIMARY KEY,
rua VARCHAR(255) not null,
cep VARCHAR(255) not null,
numero int not null,
complemento VARCHAR(255) not null,
idInstituicao INT not null,
unique key(id),
constraint FK_instituicao_endereco
foreign key (idInstituicao)
references tbl_instituicao (id)
);

CREATE TABLE tbl_telefone (
id INT not null auto_increment PRIMARY KEY,
telefone VARCHAR(255) not null,
idInstituicao INT not null,
unique key(id),
constraint FK_instituicao_telefone
FOREIGN KEY(idInstituicao) 
REFERENCES tbl_instituicao (id)
);

CREATE TABLE tbl_tipoEstabelecimento (
id INT not null auto_increment PRIMARY KEY,
descricao text not null
);

